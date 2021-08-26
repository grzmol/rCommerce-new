let mongoose = require('mongoose');

let imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: String,
    type: String,
    product: String
});
export default mongoose.model('Image', imageSchema);