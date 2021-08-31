let mongoose = require('mongoose');

let menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    displayNameEN: String,
    displayNamePL: String,
    url: String
});
export default mongoose.model('MenuItem', menuItemSchema);