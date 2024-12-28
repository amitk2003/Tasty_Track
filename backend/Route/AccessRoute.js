import express from 'express';
import User from '../models/User.js'; // Correct import with 'User'
import { body, validationResult } from 'express-validator';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const jwtsecret="rbgu4t76@#$%^&*()_)(*&^%$123vbnmkli87655";
const UserRoute = express.Router();

// Route to create a new user
UserRoute.post("/createUser", [
    body('email','invalid email address').isEmail().withMessage('please enter a valid email address').normalizeEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password')
  .isLength({ min: 8 }) // Password should be at least 8 characters long
    .withMessage('Password must be at least 8 characters long')
    .matches(/^[A-Za-z0-9@#$%^&+=]*$/)
    .withMessage('Password must contain only letters, numbers, or special characters like @, #, $, %, ^, &, +, =')

], async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
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

UserRoute.post("/LoginUser", [
    body('email', 'Invalid email address').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
    body('password', 'Incorrect Password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
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

        // JWT sign
        const record = { user: { id: UserCredentials.id } };
        const authToken = jwt.sign(record, jwtsecret);
        console.log('Generated Token:', authToken); // Debug

        return res.json({ success: true, authToken: authToken });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, error: 'Error during login' });
    }
});
export default UserRoute;