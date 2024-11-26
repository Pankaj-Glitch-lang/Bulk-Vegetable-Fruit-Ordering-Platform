const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
    },
    price_per_unit: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        required: true
    }

})

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports =ProductModel

