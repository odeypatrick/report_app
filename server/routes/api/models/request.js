const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Request", requestSchema);