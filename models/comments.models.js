const db = require("../db/connection");
const { selectArticle } = require("./articles.models");

exports.selectCommentsByArticleId = (article_id) => {
    const sql = `SELECT * FROM comments WHERE article_id = $1 
    ORDER BY created_at DESC;`;

    return selectArticle(article_id).then(({rows}) => {
            return db.query(sql, [article_id]).then( ({rows}) => {
        
        return rows;
    });
    }
    )    
    
        
    }