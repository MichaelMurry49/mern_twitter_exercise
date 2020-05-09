const express = require("express");
const app = express();

//mongodb://admin:ylmtik49@mern-ztbu0.mongodb.net/test?retryWrites=true&w=majority

app.get("/", (req, res) => {
    res.send("Hello World");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)})
