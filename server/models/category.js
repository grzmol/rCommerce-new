import mongoose from "mongoose";

let Schema = mongoose.Schema;

let categorySchema = new Schema({
    name: String,
    displayNameEN: String,
    displayNamePL: String,
    desc: String
});

export default mongoose.model('Category', categorySchema);