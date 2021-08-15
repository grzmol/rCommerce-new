import mongoose from "mongoose";

let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: String,
    shortDesc: String,
    longDesc: String,
    price: Number
});

export default mongoose.model('Product', productSchema);