import mongoose from "mongoose";

let Schema = mongoose.Schema;

let orderSchema = new Schema({
    user: String,
    status: String,
    orderItems: [
        {
            product: String,
            quantity: Number,
            itemPrice: Number
        }
    ],
    totalPrice: Number,
    totalQuantity: Number,
    order: String,
    orderAddress: {
        name: String,
        email: String,
        lastName: String,
        addressline1: String,
        addressline2: String,
        city: String,
        postalCode: String,
        country: String
    }
});

export default mongoose.model('Order', orderSchema);