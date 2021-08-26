import mongoose from "mongoose";

let Schema = mongoose.Schema;

let categorySchema = new Schema({
    name: String,
    displayName: String,
    desc: String
});

export default mongoose.model('Category', categorySchema);