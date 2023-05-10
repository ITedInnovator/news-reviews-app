const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const { getArticleById } = require("./controllers/articles.controllers");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.all("*",(req, res, next) => {
        res.status(404).send({msg: "Not Found"});
})

app.use((err, req, res, next) => {
    console.log(err);
})


module.exports = app;