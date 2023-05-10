const { selectArticle } = require("../models/articles.models");

exports.getArticleById = ( req, res, next ) => {
    const { article_id } = req.params;
    selectArticle(article_id).then( ({ rows }) => {
        const article = rows[0];
        if(!article){
            return Promise.reject({status: 404, msg: 'There is not an article at this ID sorry!'});
        } else{
            res.status(200).send({ article });
        }
        
    }).catch(err => {
        next(err);
    })
    
}