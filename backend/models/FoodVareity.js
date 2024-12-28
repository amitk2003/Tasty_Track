import mongoose from 'mongoose'
const {Schema}=mongoose;
const foodItemSchema= new Schema(
    {
        title:{
            type:String,
            required:true,
        },
        categoryName:{
            type:String,
            required:true,
        },
        img:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:false,
        },
        options:{
            type:Array,
            required:true,
        },
    }

);
const FoodVareity=mongoose.model('foodItems', foodItemSchema);
export default FoodVareity;