const { selectArticle, selectAll, updateArticle } = require("../models/articles.models");

exports.getArticleById = ( req, res, next ) => {
    const { article_id } = req.params;
    selectArticle(article_id).then( (article) => {
        
        
        res.status(200).send({ article });
        
    }).catch(err => {
        next(err);
    })
    
}

exports.getArticles = (req, res, next ) => {
    selectAll().then((articles) => {
    res.status(200).send({articles});

    })
}

exports.updateArticleVotes = (req, res, next) => {

    const { params, body } = req;
    const { article_id } = params;
    const { inc_votes } = body;

    updateArticle(article_id, inc_votes).then( ({ rows }) => {
        const article = rows[0];
        res.status(200).send({
        article
     })
    }).catch(err => {
        next(err);
     })
    
}