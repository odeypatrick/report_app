const User = require('../models/user')
const Request = require('../models/request')
const jwt = require('jsonwebtoken')

exports.request = (req, res) => {
    const { email, phone } = req.body
    Request.findOne({ email: req.body.email }, (err, user) => {
        //check for server errors
        if(err) {
            return res.status(500).json({ success: false, messgae: "Somethign went wrong" })
        }

        // verify if email already exist
        if(user) {
            console.log("taken email")
            return res.status(401).json({ success: false, message: "Email Already Taken" })
        }
            //if every thing is fine. then create user
            Request.create({
                email,
                phone
            })
            .then(newUser => {
                return res.status(201).json({ success: true, message: "User signup successfull" + newUser })
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ success: false, message: "User signup Not successfull"})
            })
    })
}

exports.signup = (req, res) => {
    const { email, phone } = req.body;
    if ((!req.body.email) || (!req.body.password)) {
        res.json({success: false, msg: 'Enter all fields'})
    }
    else {
        User.findOne({ email: req.body.email }, (err, user) => {
            //check for server errors
            if(err) {
                return res.status(500).json({ success: false, message: "Something went wrong" })
            }
    
            // verify if email already exist
            if(user) {
                return res.status(401).json({ success: false, message: "Email Already Taken" })
            }
                //if every thing is fine. then create user
                var newUser = User(req.body);
                newUser.save(function (err, newUser) {
                    if (err) {
                        res.json({success: false, msg: 'Failed to save'})
                    }
                    else {
                        res.json({success: true, msg: 'Successfully saved'})
                    }
                })
        })
    }
}

exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
            if (err) {
                return res.status(500).send({success: false, msg: 'Something went wrong'})
            }
            if (!user) {
                res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
            }
            else {
                if(user.approved) {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.sign({ userId: user._id }, 'secretkey');
                            res.status(200).json({success: true, token: token, isAdmin: user.isAdmin})
                        }
                        else {
                            return res.status(403).send({success: false, msg: 'Authentication failed, wrong password'})
                        }
                    })
                }
                else {
                    return res.status(403).send({success: false, msg: 'Authentication failed, You have not been approved yet'})
                }
            }
    }
    )
}

exports.getUserData = (req, res) => {
    let token = req.headers.token; // token
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if(err) return res.status(401).json({
            title: 'unauthorized'
        })

        //token is valid
        User.findOne({ _id: decoded.userId }, (err, user) => {
            const { _id, email, phone } = user;
            if(err) return res.status(404).json({ err })
            return res.status(200).json({
                title: 'User gotten',
                user: {
                    _id,
                    email,
                    phone
                }
            })
        })
    })
}

exports.approveUser = (req, res) => {
    User.findOneAndUpdate({ email: req.body.email }, { $set: 
        { 
            approved: true, 
        }
    })
    .then(user => {
        res.status(201).json({ user })
    })
    .catch(err => res.status(500).json({ err }))
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(200).json({ msg: "User deleted" })
    })
    .catch(err => res.status(500).json({err}))
}