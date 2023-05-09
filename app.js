const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/topics", ((req, res) => {
    res.status(200);
    res.send();
}))

module.exports = app;