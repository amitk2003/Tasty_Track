// Google OAuth sign-up route
import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js'; // Correct import with 'User'
import { body, validationResult } from 'express-validator';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();
import authToken from './AuthToken.js';
// const jwtsecret="rbgu4t76@#$%^&*()_)(*&^%$123vbnmkli87655";
<<<<<<< HEAD
const jwtsecret=process.env.SECRET_KEY;
const UserRoute = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
console.log('User model:', !!User);
// UserRoute.post('/sign-up/google', async (req, res) => {
//     const { token } = req.body;
//     if (!token) {
//         return res.status(400).json({ success: false, error: 'No token provided' });
//     }
//     try {
//         // Verify Google token
//         const ticket = await googleClient.verifyIdToken({
//             idToken: token,
//             audience: process.env.GOOGLE_CLIENT_ID,
//         });
//         const payload = ticket.getPayload();
//         const email = payload.email;
//         let existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: 'User already exists' });
//         }
//         // Create the user
//         const user = await User.create({
//             name: payload.name || email,
//             email,
//             password: '', // No password for Google users
//             Geolocation: '',
//         });
//         // Generate JWT
//         const jwtPayload = {
//             id: user._id,
//             email: user.email,
//             role: user.role
//         };
//         const authToken = jwt.sign(jwtPayload, jwtsecret, { expiresIn: '30d' });
//         return res.json({ success: true, authToken, email: user.email, role: user.role, id: user._id });
//     } catch (error) {
//         console.error('Google sign-up error:', error);
//         return res.status(401).json({ success: false, error: 'Invalid Google token' });
//     }
// });

// // Google OAuth login route
// UserRoute.post('/sign-in/google', async (req, res) => {
//     const { token } = req.body;
//     if (!token) {
//         return res.status(400).json({ success: false, error: 'No token provided' });
//     }
//     try {
//         // Verify Google token
//         const ticket = await googleClient.verifyIdToken({
//             idToken: token,
//             audience: process.env.GOOGLE_CLIENT_ID,
//         });
//         const payload = ticket.getPayload();
//         const email = payload.email;
//         let user = await User.findOne({ email });
//         if (!user) {
//             // Create user if not exists
//             user = await User.create({
//                 name: payload.name || email,
//                 email,
//                 password: '', // No password for Google users
//                 Geolocation: '',
//             });
//         }
//         // Generate JWT
//         const jwtPayload = {
//             id: user._id,
//             email: user.email,
//             role: user.role
//         };
//         const authToken = jwt.sign(jwtPayload, jwtsecret, { expiresIn: '30d' });
//         return res.json({ success: true, authToken, email: user.email, role: user.role, id: user._id });
//     } catch (error) {
//         console.error('Google login error:', error);
//         return res.status(401).json({ success: false, error: 'Invalid Google token' });
//     }
// })


// SIGN-UP ROUTE
UserRoute.post("/sign-up", [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Invalid email address')
        .isEmail()
        .normalizeEmail(),
    body('password', 'Incorrect Password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long')
        .matches(/^[A-Za-z0-9@#$%^&+=]*$/)
        .withMessage('Password must contain only letters, numbers, or special characters like @, #, $, %, ^, &, +, ='),
    body('Geolocation', 'Geolocation is required').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
=======
const jwtsecret=process.env.jwtsecret;
const UserRoute = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
UserRoute.post('/sign-up/google', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ success: false, error: 'No token provided' });
    }
    try {
        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload.email;
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        // Create the user
        const user = await User.create({
            name: payload.name || email,
            email,
            password: '', // No password for Google users
            Geolocation: '',
        });
        // Generate JWT
        const jwtPayload = {
            id: user._id,
            email: user.email,
            role: user.role
        };
        const authToken = jwt.sign(jwtPayload, jwtsecret, { expiresIn: '30d' });
        return res.json({ success: true, authToken, email: user.email, role: user.role, id: user._id });
    } catch (error) {
        console.error('Google sign-up error:', error);
        return res.status(401).json({ success: false, error: 'Invalid Google token' });
    }
});

// Google OAuth login route
UserRoute.post('/sign-in/google', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ success: false, error: 'No token provided' });
    }
    try {
        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload.email;
        let user = await User.findOne({ email });
        if (!user) {
            // Create user if not exists
            user = await User.create({
                name: payload.name || email,
                email,
                password: '', // No password for Google users
                Geolocation: '',
            });
        }
        // Generate JWT
        const jwtPayload = {
            id: user._id,
            email: user.email,
            role: user.role
        };
        const authToken = jwt.sign(jwtPayload, jwtsecret, { expiresIn: '30d' });
        return res.json({ success: true, authToken, email: user.email, role: user.role, id: user._id });
    } catch (error) {
        console.error('Google login error:', error);
        return res.status(401).json({ success: false, error: 'Invalid Google token' });
    }
});

// Route to create a new user
UserRoute.post("/sign-up", [
    body('email','invalid email address').isEmail().withMessage('please enter a valid email address').normalizeEmail(),

    body('password', 'Incorrect Password')
  .isLength({ min: 8 }) // Password should be at least 8 characters long
    .withMessage('Password must be at least 8 characters long')
    .matches(/^[A-Za-z0-9@#$%^&+=]*$/)
    .withMessage('Password must contain only letters, numbers, or special characters like @, #, $, %, ^, &, +, =')

], async (req, res) => {
    // Validate the requestbody
    const errors = validationResult(req);
    console.log( errors); // Debug
>>>>>>> e7fe165e83a180116e28f905b17ee634fca09d98
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
<<<<<<< HEAD
        // Check if user already exists
=======
        // Check if the user already exists
>>>>>>> e7fe165e83a180116e28f905b17ee634fca09d98
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

<<<<<<< HEAD
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        // Create user
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
            Geolocation: req.body.Geolocation
        });

        // Generate JWT
        const jwtPayload = { id: user._id, email: user.email };
        const authToken = jwt.sign(jwtPayload, jwtsecret, { expiresIn: '30d' });

        res.json({ success: true, authToken });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
// SIGN-IN ROUTE
UserRoute.post("/sign-in", [
    body('email', 'Invalid email address')
        .isEmail()
        .normalizeEmail(),
    body('password', 'Incorrect Password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long')
        .matches(/^[A-Za-z0-9@#$%^&+=]*$/)
        .withMessage('Password must contain only letters, numbers, or special characters like @, #, $, %, ^, &, +, =')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
=======
        // Hash the password
        const salt = await bcrypt.genSalt(10); // Using 10 salt rounds for better performance
        const securePassword = await bcrypt.hash(req.body.password, salt);

        // Create the user
        await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email,
            Geolocation: req.body.Geolocation // Ensure this is optional if not always provided
        });

        res.json({ success: true });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, error: 'Error creating user' });
    }
});

UserRoute.post("/sign-in", [
    body('email', 'Invalid email address').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
    body('password', 'Incorrect Password')
    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
    .matches(/^[A-Za-z0-9@#$%^&+=]*$/).withMessage('Password must contain only letters, numbers, or special characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()); // Log the validation errors
>>>>>>> e7fe165e83a180116e28f905b17ee634fca09d98
        return res.status(400).json({ errors: errors.array() });
    }

    try {
<<<<<<< HEAD
        // Find user
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Enter valid credential" });
        }

        // Compare password
        const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success: false, error: "Enter valid credential" });
        }

        // Generate JWT
        const jwtPayload = { id: user._id, email: user.email };
        const authToken = jwt.sign(jwtPayload, jwtsecret, { expiresIn: '30d' });

        res.json({ success: true, authToken });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// UserRoute.post(
//   '/sign-in',
//   [
//     body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
//     body('password')
//       .isLength({ min: 6 })
//       .withMessage('Password must be at least 6 characters'),
//     // Optional: allow extra fields without crashing
//     body('name').optional(),
//     body('Geolocation').optional(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success: false, errors: errors.array() });
//     }

//     try {
//       const { email, password } = req.body;

//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({
//           success: false,
//           error: 'Invalid credentials',
//         });
//       }

//       const passwordMatch = await bcrypt.compare(password, user.password);
//       if (!passwordMatch) {
//         return res.status(400).json({
//           success: false,
//           error: 'Invalid credentials',
//         });
//       }

//       const token = jwt.sign(
//         { id: user._id, email: user.email },
//         jwtsecret,
//         { expiresIn: '30d' }
//       );

//       return res.json({
//         success: true,
//         authToken: token,
//         // Optional: return minimal user info
//         user: { id: user._id, email: user.email, name: user.name },
//       });
//     } catch (err) {
//       console.error('SIGN-IN ERROR:', err);
//       return res.status(500).json({
//         success: false,
//         error: 'Internal server error',
//         // For development only – remove in production!
//         // message: err.message,
//       });
//     }
//   }
// );
=======
        let email = req.body.email;
        let UserCredentials = await User.findOne({ email });
        console.log('UserCredentials:', UserCredentials); // Debug

        if (!UserCredentials) {
            return res.status(400).json({ errors: "Try to login with correct email ID" });
        }

        // Compare passwords using bcrypt
        const passwordMatch = await bcrypt.compare(req.body.password, UserCredentials.password);
        console.log('Password Match:', passwordMatch); // Debug

        if (!passwordMatch) {
            return res.status(400).json({ errors: "Try to login with correct password" });
        }
        const payload={
            id:UserCredentials._id,
            email:UserCredentials.email,
            role:UserCredentials.role

        }
        // JWT sign
        const record = { user: { id: UserCredentials.id } };
        const authToken = jwt.sign(payload, jwtsecret,{expiresIn:"30d"});
        console.log('Generated Token:', authToken); // Debug

        return res.json({ success: true, authToken: authToken, role:UserCredentials.role,id: UserCredentials._id });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, error: 'Error during login' });
    }
});
>>>>>>> e7fe165e83a180116e28f905b17ee634fca09d98
// use of auth token to get user data
UserRoute.get("/get-userInfo",authToken,async(req,res)=>{
    try {
const { id }=req.headers;
// we dont want to display password auth so we will use .select('-password')
const data =await User.findById(id).select('-password');
return res.status(200).json(data);


    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
});
UserRoute.put("/update-Email",authToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const {email}=req.body;
        await User.findByIdAndUpdate(id,{email:email});
        return res.status(200).json({message:"email updated successfully"});

    }catch(error){
        res.status(500).json({message:"internal server error"})
    }
})
export default UserRoute;