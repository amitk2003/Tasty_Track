import mongoose from 'mongoose';
// const url = 'mongodb+srv://amitk22:4aHv6cuyb2L4L4iR@cluster0.qwymx.mongodb.net/food_delivery_data?retryWrites=true&w=majority&appName=Cluster0';
const Mongo_Url=process.env.MONGO_URI;
console.log('Mongo_Url:', Mongo_Url); 
const connectDB = async () => {
    try {
        await mongoose.connect(Mongo_Url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');

        // // Fetch 'food_items' collection
        const fetchedItemsCollection = await mongoose.connection.db.collection('food_types');
        const foodItems = await fetchedItemsCollection.find({}).toArray();  // No callback needed
        console.log("Food Items fetched:", foodItems);

        // // Fetch 'food_category' collection
        const fetchedCategoryCollection = await mongoose.connection.db.collection('food_category');
        const foodCategory = await fetchedCategoryCollection.find({}).toArray();
        console.log("Food Categories fetched:", foodCategory);
            global.food_types=foodItems;
            global.food_category=foodCategory;
    } catch (error) {
        console.error('Error connecting to MongoDB or fetching data:', error);
        process.exit(1);  // Exit the process if connection fails
    }
};

export default connectDB;
