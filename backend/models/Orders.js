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
<<<<<<< HEAD
const Order_schema=mongoose.model("Order_schema",OrderSchema);
=======
const Order_schema=mongoose.model("order data: ",OrderSchema);
>>>>>>> e7fe165e83a180116e28f905b17ee634fca09d98
export default Order_schema;   