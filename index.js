require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
        const paymentCollection = db.collection("payments");
        const orderListCollection = db.collection("orderList");

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

        // use verify admin after verify token
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            const isAdmin = user?.role === 'Admin';
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        }

        // use verify seller after verify token
        const verifySeller = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            const isAdmin = user?.role === 'Seller';
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
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
        app.get('/users/role/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            try {
                const result = await userCollection.findOne(query);
                if (result) {
                    res.send({ role: result?.role });
                } else {
                    res.status(404).send({ message: "User not found", role: null });
                }
            } catch (error) {
                res.status(500).send({ message: "Server error", role: null });
            }
        })

        // total user
        app.get('/users/:email', verifyToken, verifyAdmin, async (req, res) => {
            const email = req.params.email;
            const query = { email: { $ne: email } }
            const result = await userCollection.find(query).toArray();
            res.send(result);
        })

        app.delete('/user/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

        app.patch('/users/role/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            const query = { _id: new ObjectId(id) }
            if (["Customer", "Seller", "Admin"].includes(user?.role)) {
                const updatedDoc = { $set: { role: user.role } };
                const result = await userCollection.updateOne(query, updatedDoc);
                return res.send(result);
            }
        })

        // total users
        app.get('/total/users', verifyToken, verifyAdmin, async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result)
        })

        // profile data 
        app.get('/userdata/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        // profile update 
        app.patch('/users/profile/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const updatedDoc = {
                $set: {
                    name: user?.name,
                    image: user?.image
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        // products related api
        app.post('/products', verifyToken, verifySeller, async (req, res) => {
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
            const search = req.query.search;
            const sort = req.query.sort;
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            let options = {};
            let query = {}
            const skip = (page - 1) * size;
            if (search) {
                query = {
                    $or: [
                        { name: { $regex: String(search), $options: 'i' } },
                        { company: { $regex: String(search), $options: 'i' } }
                    ]
                };
            }

            if (sort) {
                options = {
                    sort: {
                        price: parseInt(sort === 'asc' ? 1 : -1)
                    }
                }
            }

            const result = await productCollection.find(query, options)
                .skip(page * size)
                .limit(size)
                .toArray();
            res.send(result);
        })

        // for product categories
        app.get('/products/categories', async (req, res) => {
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

        // seller products
        app.get('/seller/products/:email', verifyToken, verifySeller, async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const email = req.params.email;
            let query = {}
            if (email) {
                query = { 'seller.email': email }
            }
            const result = await productCollection.find(query)
                .skip(page * size)
                .limit(size)
                .toArray();
            res.send(result);
        })

        // Admin products
        app.get('/admin/products', verifyToken, verifyAdmin, async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const result = await productCollection.find()
                .skip(page * size)
                .limit(size)
                .toArray();
            res.send(result);
        })

        // seller specific products deleted 
        app.delete('/seller/product/:id', verifyToken, verifySeller, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.send(result);
        })

        // Admin specific products deleted 
        app.delete('/admin/product/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.send(result);
        })

        // seller specific update product
        app.patch('/seller/product/:id', verifyToken, verifySeller, async (req, res) => {
            const id = req.params.id;
            const product = req.body;
            const { name, image, category, company, description, price, quantity } = product;
            const filter = { _id: new ObjectId(id) }
            const updatedDoc = {
                $set: {
                    name: name,
                    image: image,
                    category: category,
                    company: company,
                    description: description,
                    price: price,
                    quantity: quantity
                }
            }
            const result = await productCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        // Admin specific update product
        app.patch('/admin/product/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const product = req.body;
            // console.log(product)
            const { name, image, category, company, description, price, quantity } = product;
            const filter = { _id: new ObjectId(id) }
            const updatedDoc = {
                $set: {
                    name: name,
                    image: image,
                    category: category,
                    company: company,
                    description: description,
                    price: price,
                    quantity: quantity
                }
            }
            const result = await productCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        // seller specific products 
        app.get('/seller/product/:id', verifyToken, verifySeller, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productCollection.findOne(query);
            res.send(result);
        })
        app.get('/admin/product/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productCollection.findOne(query);
            res.send(result);
        })

        app.get('/productsCount', async (req, res) => {
            const count = await productCollection.estimatedDocumentCount();
            res.send({ count });
        })

        // serller order count
        app.get('/sellerProductCount/:email', async (req, res) => {
            const email = req.params.email;
            let query = {};
            if (email) {
                query = { 'seller.email': email }
            }
            const count = await productCollection.countDocuments(query);
            res.send({ count });
        })

        // Manage Banner from admin side
        app.post('/banners', verifyToken, verifyAdmin, async (req, res) => {
            const banner = req.body;
            const result = await bannerCollection.insertOne(banner);
            res.send(result);
        })

        app.get('/banners', async (req, res) => {
            const result = await bannerCollection.find().toArray();
            res.send(result);
        })

        app.delete('/banner/:id', verifyToken, verifyAdmin, async (req, res) => {
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

        // orderList related api
        app.post('/ordersList', verifyToken, async (req, res) => {
            const order = req.body;
            const result = await orderListCollection.insertOne(order);
            res.send(result);
        })

        // orderList related api
        app.get('/ordersList', verifyToken, verifyAdmin, async (req, res) => {
            const order = req.body;
            const result = await orderListCollection.find().toArray();
            res.send(result);
        })

        // customer order 
        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            let query = {};
            if (email) {
                query = { 'customer.email': email };
            }
            const result = await orderCollection.find(query).toArray();
            res.send(result);
        })

        // order from seller
        app.get('/seller/orders/:email', verifyToken, verifySeller, async (req, res) => {
            const email = req.params.email;
            const query = { seller: email };
            const result = await orderCollection.find(query).toArray();
            res.send(result);
        })

        // customer order delete
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
                    "customer.name": medicine?.name,
                    quantity: medicine?.quantity,
                    address: medicine?.address,
                    phone: medicine?.phone
                }
            }
            const result = await orderCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        // decrement quantity
        app.patch('/descrement/quantity/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const {toatalQuantity, status} = req.body;
            const filter = {_id: new ObjectId(id)}
            let updatedDoc = {};
            if(status === 'decrease'){
                updatedDoc = {
                    $inc: { quantity: -toatalQuantity }
                }
            }
            else{
                updatedDoc = {
                    $inc: { quantity: toatalQuantity }
                }
            }
            const result = await productCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })
        // seller order count
        app.get('/ordersCount/:email', async (req, res) => {
            const email = req.params.email;
            const query = { seller: email }
            const count = await orderCollection.countDocuments(query);
            res.send({ count });
        })

        // specific seller order
        app.get('/seller/order/:email', verifyToken, verifySeller, async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const email = req.params.email;
            let query = {}
            if (email) {
                query = { seller: email }
            }
            const result = await orderCollection.find(query)
                .skip(page * size)
                .limit(size)
                .toArray();
            res.send(result);
        })

        // stripe releated api
        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;
            const amount = parseInt(price * 100);
            // console.log(amount, 'amonunt inside the intent');

            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd",
                payment_method_types: ['card'],
            });
            res.send({
                clientSecret: paymentIntent.client_secret
            })
        })

        // save to database payment history
        app.post('/payments', async (req, res) => {
            const payment = req.body;
            // console.log(payment);
            const paymentResult = await paymentCollection.insertOne(payment);
            const query = {
                _id: {
                    $in: payment.orderId.map(id => new ObjectId(id))
                }
            }
            const deleteResult = await orderCollection.deleteMany(query);
            res.send({ paymentResult, deleteResult })
        })

        // get from payment history
        app.get('/payments/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            let query = {};
            if (email) {
                query = { email: req.params.email }
            }
            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }
            const result = await paymentCollection.find(query).toArray();
            res.send(result);
        })

        // total payments admin
        app.get('/total/payments', verifyToken, verifyAdmin, async (req, res) => {
            const result = await paymentCollection.find().toArray();
            res.send(result);
        })

        // total payments seller
        app.get('/total/payments/seller', verifyToken, verifySeller, async (req, res) => {
            const result = await paymentCollection.find().toArray();
            res.send(result);
        })

        // AdminChart
        app.get('/admin/chart', verifyToken, verifyAdmin, async (req, res) => {
            const chartData = await orderCollection.aggregate([
                { $sort: { _id: -1 } },
                {
                    $addFields: {
                        _id: {
                            $dateToString: {
                                format: '%Y-%m-%d',
                                date: { $toDate: '$_id' },
                            },
                        },
                        quantity: { $sum: '$quantity' },
                        price: { $sum: '$price' },
                        order: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        date: '$_id',
                        quantity: 1,
                        order: 1,
                        price: 1,
                    }
                },
            ]).toArray();
            res.send(chartData);
        })

        // SellerChart
        app.get('/seller/chart/:email', verifyToken, verifySeller, async (req, res) => {
            const email = req.params.email;
            const query = { seller: email };
            const chartData = await orderCollection.aggregate([
                {
                    $match: query,
                },
                { $sort: { _id: -1 } },
                {
                    $addFields: {
                        _id: {
                            $dateToString: {
                                format: '%Y-%m-%d',
                                date: { $toDate: '$_id' },
                            },
                        },
                        quantity: { $sum: '$quantity' },
                        price: { $sum: '$price' },
                        order: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        date: '$_id',
                        quantity: 1,
                        order: 1,
                        price: 1,
                    }
                },
            ]).toArray();
            res.send(chartData);
        })

        // seller payment history
        app.get('/seller/paymenthistory/:email', verifyToken, verifySeller, async (req, res) => {
            const { email } = req.params;
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

