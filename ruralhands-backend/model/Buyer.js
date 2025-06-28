const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: 'buyer',
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    
    });

const Buyer = mongoose.model('Buyer', buyerSchema);
module.exports = Buyer;

