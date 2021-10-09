const Report = require('../models/reports')
const User = require('../models/user')

exports.getAllReport = (req, res) => {
    Report.find({}).exec()
    .then(reports => {
        return res.status(200).json({ reports })
    })
    .catch(err => {
        return res.status(500).json({ err })
    })
}

// get report belonging to a particular user
exports.getUserReport = (req, res) => {
    Report.find({ user: req.params.id }).exec()
    .then(reports => {
        return res.status(200).json({ reports })
    })
    .catch(err => {
        return res.status(500).json({ err })
    })
}

exports.getTotalReport = (req, res) => {
    Report.find({ user: req.params.id }).exec()
    .then(reports => {
        const totalReport = reports.length;
        const approved = reports.filter(report => report.approved === true).length
        const unapproved = reports.filter(report => report.approved === false).length
        return res.status(200).json({ 
            totalReport,
            approved,
            unapproved
        })
    })
    .catch(err => {
        return res.status(500).json({ err })
    })
}

// Get single Report
exports.getSingleReport = (req, res) => {
    Report.findById(req.params.id).exec()
    .then(reports => {
        return res.status(200).json({ reports })
    })
    .catch(err => {
        return res.status(500).json({ err })
    })
}


// Add Reports
exports.addReport = (req, res) => {
    Report.create(req.body)
    .then(report => {
        User.findOneAndUpdate(
            { _id: req.body.user }, 
            { $push: { reports: report } },
        ).then(() => {
            return res.status(200).json({ msg: "Report added successfully" })
        })
    })
    .catch(err => {
        return res.status(500).json({ sucess: false, message: "Server error" })
    })
}

exports.deleteReport = (req, res) => {[
    Report.findByIdAndDelete(req.params.id)
    .then(res => {
        res.status(200).json({ res })
    })
    .catch(err => {
        res.status(500).json({err})
    })
]}