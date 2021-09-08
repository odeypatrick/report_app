const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    projectTitle: String,
    reviewed: Boolean,
    rejected: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

