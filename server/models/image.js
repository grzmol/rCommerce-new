import mongoose from "mongoose";

let Schema = mongoose.Schema;

let imageSchema = new Schema({
    name: String,
    desc: String,
    imgBase64: String,
    type: String,
    productCode: String
});

export default mongoose.model('Image', imageSchema);