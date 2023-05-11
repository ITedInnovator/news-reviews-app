const db = require("../db/connection");

exports.selectCommentsByArticleId = (article_id) => {
    const sql = `SELECT * FROM comments;`;

    return db.query(sql).then( ({rows}) => {
        return rows;
    });
}