const { selectCommentsByArticleId, createNewComment } = require("../models/comments.models");

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
    const { article_id } = req.params;

    createNewComment(article_id, username, body).then((rows) => {
        const comment = rows[0];
        res.status(200).send({comment});
    }).catch(err => {
        next(err);
    })
    
}