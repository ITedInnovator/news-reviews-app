const db = require("../db/connection");
const { checkValueExistsOnTable } = require("../db/seeds/utils");
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

exports.createNewComment = (article_id, username, body) => {
    const sql = `INSERT INTO comments ( 
        body, article_id, author
    ) 
    VALUES (
        $1, $2, $3
    ) RETURNING *;`

    if(!article_id || !username || !body) return Promise.reject({status: 400, msg: "Bad request properties insufficient"});

    // selectArticle(article_id).then((result) => {
        return db.query(sql, [body, article_id, username]).then( ({ rows }) => {
            return rows;
        })
    // });

    
    
    }