import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required: true,
    },
    order_status:{
        type:String,
        enum:{
            values:['active','cancel'],
            message:'{VALUE} is not supported'
        },
         required:true,
    },
    order_quantity:{
        type:Number,
        minimum: [0, 'Order can not be negative']
    }
})
export const order=mongoose.model('order',orderSchema)