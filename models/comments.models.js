const db = require("../db/connection");
const { checkValueExistsOnTable } = require("../db/seeds/utils");
const { selectArticle } = require("./articles.models");

exports.selectCommentsByArticleId = (article_id) => {
    const sql = `SELECT * FROM comments WHERE article_id = $1 
    ORDER BY created_at DESC;`;

    return selectArticle(article_id).then((article) => {
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

    const articleSql = `SELECT * FROM articles WHERE article_id = $1`;

    return db.query(articleSql, [article_id]).then( ({rows}) => {
        if(rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Article does not exist"});
        }

        return rows;

    }).then((rows) => {
        return db.query(sql, [body, article_id, username]);
    });

    
    
    }