import cors from 'cors';
import express from 'express';
import connectDB from './db.js';
import UserRoute from './Route/userCredential.js';
import food_router from './Route/food_route.js';
import Searchrouter from './Route/Searchrouter.js';
import bodyParser from 'body-parser';
import router from './Route/OrderData.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Database connection
connectDB();

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://tasty-track-a4a7.vercel.app',  // Remove trailing slash
  'https://tasty-track-lyea.vercel.app'   // Add backend URL to allowed origins
];

// Enhanced CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is allowed
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,  // Allow credentials (cookies, authorization headers)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Added OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
}));
app.options('*',cors());
// these aare error handling manually
// Additional headers middleware
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }
//   next();
// });

// Rest of your existing configuration
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.use('/api', UserRoute);
app.use('/api', food_router);
app.use('/api/foodTypes', Searchrouter);
app.use('/api', router);

app.post('/api/foodTypes', (req, res) => {
  res.json({ message: "foodTypes data sent successfully" });
});

app.get('/api/foodTypes/search', async (req, res) => {
  res.json({ message: "Food items are successfully accessible" });
});

app.listen(port, () => {
  console.log(`Food delivery app is running on port ${port}`);
});