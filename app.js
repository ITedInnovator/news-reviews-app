const express = require("express");
const cors = require("cors");
const { getTopics } = require("./controllers/topics.controllers");
const { getArticleById, getArticles, updateArticleVotes } = require("./controllers/articles.controllers");
const { getApiDocs } = require("./controllers/api.controller");
const { getCommentsByArticleId, postNewComment } = require("./controllers/comments.controllers");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api", getApiDocs)

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postNewComment);

app.patch("/api/articles/:article_id", updateArticleVotes);

app.all("*",(req, res, next) => {
        res.status(404).send({msg: "Not Found"});
})

app.use((err, req, res, next) => {
    if(err.code === '22P02') res.status(400).send({msg: 'Incorrect type for an ID' })
    else next(err);
})

app.use((err, req, res, next) => {
    if(err.code === '23503') res.status(404).send({msg: "Resource does not exist"});
    else next(err);
})

app.use((err, req, res, next) => {
     if(err.code === '23502') res.status(400).send({msg: "Bad request properties insufficient"})
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