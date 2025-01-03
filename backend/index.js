import cors from 'cors';
import express from 'express';
import connectDB from './db.js';
import UserRoute from './Route/AccessRoute.js';
import DisplayRoute from './Route/DisplayRoute.js';
import Searchrouter from './Route/Searchrouter.js';
import bodyParser from 'body-parser';
import router from './Route/OrderData.js'
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT||5000;
dotenv.config();
connectDB();

// Use CORS to allow cross-origin requests
app.use(cors({
    origin: 'https://tasty-track-six.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.get('/', (req, res) => {
    res.send("Hello world");
});
app.use('/api',UserRoute);
app.use('/api',DisplayRoute);
app.use('/api/foodTypes',Searchrouter);
app.use('/api',router)
app.post('/api/foodTypes', (req, res) => {
    // Handle the request and send the response
    res.json({ message: "foodTypes data sent successfully" });
});
app.get('/api/foodTypes/search') , async (req,res) =>{
    res.json({ message: "Food items is successfully accesible" });

}

app.listen(port, () => {
    console.log(`Food delivery app is running: ${port}`);
});
