import mongoose from "mongoose";

let Schema = mongoose.Schema;

let cartSchema = new Schema({
    user: String,
    cartItems: [
        {
            product: String,
            quantity: Number,
            itemPrice: Number,
            itemTotalPrice: Number
        }
    ],
    totalPrice: Number,
    totalQuantity: Number,
    isActive: Boolean,
    order: String
});

export default mongoose.model('Cart', cartSchema);