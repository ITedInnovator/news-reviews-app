const { selectArticle, selectAll } = require("../models/articles.models");

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