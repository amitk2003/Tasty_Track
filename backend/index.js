import cors from 'cors';
import express from 'express';
import connectDB from './db.js';
import UserRoute from './Route/AccessRoute.js';
import DisplayRoute from './Route/DisplayRoute.js';
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
  'http://localhost:3000',               // for local React app
  'https://tasty-track-a4a7.vercel.app/', // another Vercel app URL
//   'https://tasty-track-six.vercel.app/',  // Vercel production app (if needed)
];

// Use CORS to allow cross-origin requests
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests without origin (e.g., mobile or direct server-to-server requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send("Hello world");
});

// Routes
app.use('/api', UserRoute);
app.use('/api', DisplayRoute);
app.use('/api/foodTypes', Searchrouter);
app.use('/api', router);

// Specific route for food types (GET /api/foodTypes)
app.post('/api/foodTypes', (req, res) => {
  // Handle the request and send the response
  res.json({ message: "foodTypes data sent successfully" });
});

// Fixed route for /api/foodTypes/search
app.get('/api/foodTypes/search', async (req, res) => {
  res.json({ message: "Food items are successfully accessible" });
});

// Server listen
app.listen(port, () => {
  console.log(`Food delivery app is running on port ${port}`);
});
