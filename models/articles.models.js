const db = require("../db/connection");

exports.selectArticle = (article_id) => {
    
    const sql = `SELECT * FROM articles WHERE article_id = $1;`;
    return db.query(sql, [article_id]).then(({rows}) => {
        const article = rows[0];

        if(!article) return Promise.reject({status: 404, msg: 'There is not an article at this ID sorry!'});

        return article;
    })
}