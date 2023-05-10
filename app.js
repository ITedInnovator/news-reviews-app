const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const { getApiDocs } = require("./controllers/api.controller");
const app = express();

app.use(express.json());

app.get("/api", getApiDocs)

app.get("/api/topics", getTopics);

app.all("*",(req, res, next) => {
        res.status(404).send({msg: "Not Found"});
})

app.use((err, req, res, next) => {
    console.log(err);
})

module.exports = app;