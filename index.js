require('dotenv').config()
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w0iow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const db = client.db('mediHub-store');
        const userCollection = db.collection('users');
        const productCollection = db.collection('products');
        const orderCollection = db.collection('orders');
        const bannerCollection = db.collection('banners');

        const verifyToken = (req, res, next) => {
            // console.log('inside verify token', req.headers.authorization);
            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'unauthorized access' });
            }
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'unauthorized access' });
                }
                req.decoded = decoded;
                next();
            })
        }

        // Generate jwt api
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
            res.send({ token });
        })

        // users related api
        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user?.email };
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null })
            }
            else {
                const result = await userCollection.insertOne({
                    ...user, timestamp: Date.now(),
                    role: 'Customer'
                });
                res.send(result);
            }
        });

        // user role 
        app.get('/users/role/:email', async(req, res) => {
            const email = req.params.email;
            const query = {email: email}
            const result = await userCollection.findOne(query);
            res.send({role: result?.role});
        })

        // total user
        app.get('/users',verifyToken, async(req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        })

        app.delete('/user/:id', verifyToken, async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

        app.patch('/users/role/:id', verifyToken, async(req, res ) => {
            const id = req.params.id;
            const user = req.body;
            const query = {_id: new ObjectId(id)}
            if (["Customer", "Seller", "Admin"].includes(user?.role)) {
                const updatedDoc = { $set: { role: user.role } };
                const result = await userCollection.updateOne(query, updatedDoc);
                return res.send(result);
            }
        })

        // products related api
        app.post('/products', verifyToken, async (req, res) => {
            const products = req.body;
            const result = await productCollection.insertOne(products);
            res.send(result);
        })

        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productCollection.findOne(query);
            res.send(result);
        })

        app.get('/products', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const categories = req.query.category;
            let query = {}
            if (categories) {
                query = { category: categories }
            }
            const result = await productCollection.find(query)
                .skip(page * size)
                .limit(size)
                .toArray();
            res.send(result);
        })

        app.get('/productsCount', async (req, res) => {
            const count = await productCollection.estimatedDocumentCount();
            res.send({ count });
        })

        // Manage Banner from admin side
        app.post('/banners', verifyToken, async (req, res) => {
            const banner = req.body;
            const result = await bannerCollection.insertOne(banner);
            res.send(result);
        })

        app.get('/banners', verifyToken, async (req, res) => {
            const result = await bannerCollection.find().toArray();
            res.send(result);
        })

        app.delete('/banner/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await bannerCollection.deleteOne(query);
            res.send(result);
        })

        // order related api
        app.post('/orders', verifyToken, async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })

        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            const query = { 'customer.email': email };
            const result = await orderCollection.find(query).toArray();
            res.send(result);
        })

        app.delete('/order/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        })

        app.get('/order/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await orderCollection.findOne(query);
            res.send(result);
        })
        // name, quantity, address, phone
        app.patch('/order/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const medicine = req.body;
            const filter = { _id: new ObjectId(id) }
            const updatedDoc = {
                $set: {
                    name: medicine?.name,
                    quantity: medicine?.quantity,
                    address: medicine?.address,
                    phone: medicine?.phone
                }
            }
            const result = await orderCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("MediHub aplication is Runing");
})
app.listen(port, () => {
    console.log("MediHub aplication is Runing", port);
})
