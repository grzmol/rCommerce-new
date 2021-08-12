import mongoose from "mongoose";

let Schema = mongoose.Schema;

let noteSchema = new Schema({
    note: String,
    owner: String
});

export default mongoose.model('Note', noteSchema);