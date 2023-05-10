const db = require("../db/connection");

exports.selectArticle = (article_id) => {
    const sql = `SELECT * FROM articles WHERE article_id = $1;`;

    return db.query(sql, [article_id]);
}