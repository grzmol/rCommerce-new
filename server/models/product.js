import mongoose from "mongoose";

let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: String,
    productCode: String,
    desc: String,
    price: Number,
    category: String,
    image: String
});

export default mongoose.model('Product', productSchema);