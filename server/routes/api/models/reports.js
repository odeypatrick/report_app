const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    projectData: Object,
    approved: {
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Report", reportSchema);

