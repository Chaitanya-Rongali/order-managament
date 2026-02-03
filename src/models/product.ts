import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true,
        validate: {
            validator: (value: number) => value > 0,
            message: "price must be greater than Zero"
        },
    },
    StockQuantity: {
        type: Number,
        required: true,
        minimum: [0, 'Stock can not be negative']
    }
});
export const Product = mongoose.model('product', productSchema);
