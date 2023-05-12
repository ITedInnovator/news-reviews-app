const { selectCommentsByArticleId } = require("../models/comments.models");

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    selectCommentsByArticleId(article_id).then((comments) => {
        res.status(200).send({comments});
    }).catch(err => {
        next(err);
    })
    
}

exports.postNewComment = ( req, res, next) => {
    const { username, body } = req.body;
    res.status(200).send({"username": username, "body": body});
}