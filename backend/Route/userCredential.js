import express from 'express';
import User from '../models/User.js'; // Correct import with 'User'
import { body, validationResult } from 'express-validator';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();
import authToken from './AuthToken.js';
// const jwtsecret="rbgu4t76@#$%^&*()_)(*&^%$123vbnmkli87655";
const jwtsecret=process.env.jwtsecret;
const UserRoute = express.Router();

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
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the user already exists
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

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
        return res.status(400).json({ errors: errors.array() });
    }

    try {
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