let mongoose = require('mongoose');

let menuItemSchema = new mongoose.Schema({
    name: String,
    url: String
});
export default mongoose.model('MenuItem', menuItemSchema);