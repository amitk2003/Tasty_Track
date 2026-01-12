import stripe from 'stripe';
import dotenv from 'dotenv'
dotenv.config();
const stripe_client=stripe(process.env.STRIPE_SECRET_KEY);
import express  from 'express'
const router =express.Router()
router.post('/make-payment',async(req,res)=>{
    
})