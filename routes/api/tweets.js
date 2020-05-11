const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateTweetInput = require("../../validation/tweets");
const Tweet = require("../../models/Tweet")

router.get("/test", (req, res) => {
    res.json({msg: "This is the tweet route"});
})

router.get("/", (req, res) => {
    Tweet
        .find()
        .sort({date: -1})
        .then(tweets => res.json(tweets))
        .catch(err => res.status(400).json())
})

router.get("/user/:user_id", (req, res) => {
    Tweet
        .find({user: req.params.user_id})
        .then(tweets => res.json(tweets))
        .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
    Tweet
        // .findById(req.params.id)
        .find({_id: req.params.id})
        .then(tweet => res.json(tweet))
        .catch(err => res.status(400).json())
})

router.post("/",
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
        const {isValid, errors} = validateTweetInput(req.body);

        if(!isValid) return res.status(400).json(errors);
        console.log(req);
        console.log(req.body);
        console.log(req.id);
        console.log(req.user._id);
        console.log(req.user.id)
        const newTweet = new Tweet({
            // id: req.id,
            user: req.user.id,
            text: req.body.text
        })

        newTweet
            .save()
            .then(tweet => res.json(tweet));
    }
)

module.exports = router;
