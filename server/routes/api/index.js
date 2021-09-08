const router = require('express').Router()
const mongoose = require('mongoose')
const { request, signup, login, getUserData, approveUser } = require('./controllers/auth')
const { getAllReport, getSingleReport, addReport, deleteReport, getUserReport } = require('./controllers/reports')
const { url } = require('./url/url') 
const User = require('./models/user')

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('connection successfull'))
.catch((err) => console.error(err))

router.get('/', (req, res) => {
    res.send("HELLO!! WE ARE LIVE")
})

router.get('/users', (req, res) => {
    User.find({ approved: false })
    .then((users) => res.json({users}))
    .catch((err) => res.status(500).json({err}))
})
// Request for auth
router.post('/auth/request', request)

//Signup - can be accessed by only an admin
router.post('/auth/signup', signup)

//login user
router.post('/auth/login', login)

// Get reports
router.get('/reports', getAllReport)

// Get user reports
router.get('/user/:id/reports/', getUserReport)

// Get single reports
router.get('/reports/:id', getSingleReport)

//Add report
router.post('/report/add', addReport)

//delete Report
router.delete('/report/delete', deleteReport)

//Get User Information
router.get('/user', getUserData)

//Approve user
router.put('/user/approve', approveUser)

module.exports = router