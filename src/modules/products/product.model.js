// Product model schema/structure

export const ProductCategories = {
    MEDICINE: 'Medicine',
    EQUIPMENT: 'Equipment',
    SUPPLEMENT: 'Supplement',
    PERSONAL_CARE: 'Personal Care'
};

export const productSchema = {
    name: String,
    image: String,
    category: String,
    company: String,
    description: String,
    price: Number,
    quantity: Number,
    seller: {
        name: String,
        email: String
    }
};

export default { ProductCategories, productSchema };
