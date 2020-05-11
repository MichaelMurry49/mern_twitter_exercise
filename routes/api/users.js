const bcrypt = require('bcryptjs');
const express = require("express");
const User = require('../../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/key_prod');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const passport = require("passport");


router.get("/test", (req, res) => {
    res.json({ msg: "This is the user route" });
})

router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid) return res.status(400).json(errors);
    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                return res.status(400).json({email: "A user has already registered with this address"})
            } else {
                const newUser = new User({
                    handle: req.body.handle,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
                
            }
        })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
            id: req.user.id,
            handle: req.user.handle,
            email: req.user.email
        });
    })
// router.get('/current', (req, res) => {
//     res.json({
//         msg: "current route"
//     })
// })

router.post('/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);
    // if(!isValid) return res.status(400).json(errors);
    if (!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;
    // console.log("test")
    // console.log(email);
    // console.log({email});
    // console.log({email: req.body.email})
    // // console.log(User.all)
    // // console.log(User.first)
    // console.log(User)
    // console.log(User.findOne({email}))
    
    User.findOne({ email })
        .then(user => {
            // console.log("checking")
            if(!user){
                return res.status(404).json({email: "This user does not exist."})
            }
            // console.log("exists")
        
            bcrypt.compare(password, user.password )
                .then(isMatch => {
                    if(isMatch){
                        const payload = {
                            id: user.id,
                            // handle: user.handle,
                            email: user.email
                            // password: user.password
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            }
                        )
                    } else {
                        return res.status(400).json({password: "Inncorrect password"});
                    }
                }) 
        }) 
    
    // console.log("not a loop")
})
module.exports = router;