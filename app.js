const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys_prod").mongoURI;
const bodyParser = require('body-parser');
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const passport = require('passport')
// const key = require('./config/key_dev')
const path = require('path');


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));
app.use(passport.initialize());
require("./config/passport")(passport)
app.use(bodyParser.urlencoded({
    extended: false
}));



app.use(bodyParser.json());

// app.get("/", (req, res) => {
//     // debugger;
//     res.send("Hello World");
// });

app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)})
