import mongoose from "mongoose";

let Schema = mongoose.Schema;

let eventSchema = new Schema({
    title: String,
    start: Date,
    end: Date,
    frequency: Number,
    expirationtime: Date,
    owner: String,
    content: String,
});

export default mongoose.model('Event', eventSchema);
