import mongoose from 'mongoose'
const {Schema}=mongoose;
const OrderSchema =new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true
    },
}) ;
const Order_schema=mongoose.model("order data: ",OrderSchema);
export default Order_schema;   