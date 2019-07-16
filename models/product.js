const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const SchemaTypes = mongoose.SchemaTypes;

const ProductSchema = new Schema({
    name: {type: String, text: true},
    image: String,
    thumbnail: String,
    shortDescription: { type: String, text: true },
    categoryId: { type: String, ref: 'Category',},
    salePrice: Number,
    originalPrice: Number,
    images: [String],
    thumbnails: [String],

});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
