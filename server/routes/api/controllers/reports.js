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

// Search Reports
    exports.searchReport = () => {
        const query = req.body.q;
        const search = query.toLowerCase()

        Report.find({ 
            $or: [{ projectData: { $regex: new RegExp(search) } }, { category: { $regex: new RegExp(search) } },{ vendorName: { $regex: new RegExp(search) } }] 
        })
        .then(products => {
            return res.status(200).json({ products })
        })
        .catch(err => {
            console.log(err)
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


// delete Report
exports.deleteReport = (req, res) => {
    Report.findByIdAndDelete(req.params.id)
    .then(res => {
        res.status(200).json({ res })
    })
    .catch(err => {
        res.status(500).json({err})
    })
}

// Approving Report
exports.approveReport = (req, res) => {
    Report.findByIdAndUpdate(req.params.id, 
    {
        $set: {
            approved: true
        }
    })
    .then(report => res.status(200).json({ success: true, msg: "Report approved successfully", report }))
    .catch(err => res.status(500).json({ success: false, msg: "Report Not Approved", err }))
} 

// Dissaprove
exports.disapproveReport = (req, res) => {
    Report.findByIdAndUpdate(req.params.id, 
    {
        $set: {
            approved: false
        }
    })
    .then(report => res.status(200).json({ success: true, msg: "Report Disapproved successfully", report }))
    .catch(err => res.status(500).json({ success: false, msg: "Report Not Dispproved", err }))
} 

// Edit Report
exports.editReport = (req, res) => {
    Report.findByIdAndUpdate(req.params.id, {
        $set: {
            projectData: req.body
        }
    })
    .then(report => res.status(200).json({ success: true, msg: "Report edited successfully", report }))
    .catch(err => res.status(500).json({ success: false, msg: "Report Not Edited", err }))
}