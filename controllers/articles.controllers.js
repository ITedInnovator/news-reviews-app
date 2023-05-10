const { selectArticle } = require("../models/articles.models");

exports.getArticleById = ( req, res ) => {
    const { article_id } = req.params;
    selectArticle(article_id).then( ({ rows }) => {
        const article = rows[0];
        res.status(200).send({ article });
    })
    
}