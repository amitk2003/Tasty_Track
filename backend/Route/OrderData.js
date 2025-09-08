
import express from 'express';
const router = express.Router();
import Order_schema from '../models/Orders.js';

router.post('/OrderData', async (req, res) => {
    const { email, order_data, order_date } = req.body;

    // Validate required fields
    if (!email || !order_data || !order_date) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    // Add order date to the beginning of order data
    order_data.unshift({ Order_date: order_date });

    try {
        let existingOrder = await Order_schema.findOne({ email: email });
        console.log(existingOrder);

        if (!existingOrder) {
            // Create a new order if email does not exist
            await Order_schema.create({
                email: email,
                order_data: [order_data],
            });
            return res.status(201).json({ success: true, message: "Order created successfully" });
        } else {
            // Update existing order by pushing new data
            await Order_schema.findOneAndUpdate(
                { email: email },
                { $push: { order_data:{$each : [order_data],$position:0} } }
            );
            return res.status(200).json({ success: true, message: "Order updated successfully" });
        }
    } catch (error) {
        console.error("Order processing error:", error.message);
        res.status(500).send({ error: "server error", message: error.message });
    }
});
router.post('/myOrderHistory', async(req,res)=>{
    try{
        let mydata=await Order_schema.findOne({'email':req.body.email});
        if(!mydata){
            return res.status(404).json({message:"No order found"});
        }
            // Sort order_data by Order_date in descending order (recent first)
        const sortedOrders = mydata.order_data.sort((a, b) => {
            return new Date(b.Order_date) - new Date(a.Order_date);
        });
                res.json({ orderHis: { ...mydata._doc, order_data: sortedOrders } });

    }catch(error){
        console.error("Error fetching order history:", error);
        res.status(500).json({ error: "Server error", message: error.message });
    }
})
















export default router;
