const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const { getArticleById, getArticles } = require("./controllers/articles.controllers");
const { getApiDocs } = require("./controllers/api.controller");
const { getCommentsByArticleId } = require("./controllers/comments.controllers");
const app = express();

app.use(express.json());

app.get("/api", getApiDocs)

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.all("*",(req, res, next) => {
        res.status(404).send({msg: "Not Found"});
})

app.use((err, req, res, next) => {
    if(err.code === '22P02') res.status(400).send({msg: 'Incorrect type for an ID' })
    else next(err);
})

app.use((err, req, res , next ) => {
    if(err.status && err.msg){
        res.status(err.status).send({status: err.status, msg: err.msg});
    } 
    else next(err);
})

app.use((err, req, res, next) => {
    if(res.status === 500) res.status(500).send({msg: 'An error has occurred on our end, please contact technical support'})
})

module.exports = app;