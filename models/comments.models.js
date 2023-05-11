const db = require("../db/connection");

exports.selectCommentsByArticleId = (article_id) => {
    const sql = `SELECT * FROM comments WHERE article_id = $1 
    ORDER BY created_at DESC;`;

    return db.query(sql, [article_id]).then( ({rows}) => {
        return rows;
    });
}