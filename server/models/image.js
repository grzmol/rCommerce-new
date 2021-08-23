let mongoose = require('mongoose');

let imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: String
});
export default mongoose.model('Image', imageSchema);