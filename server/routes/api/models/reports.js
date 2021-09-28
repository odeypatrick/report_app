const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    projectData: Object,
    approved: Boolean,
    rejected: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Report", reportSchema);

