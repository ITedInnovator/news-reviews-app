const db = require("../db/connection");

exports.selectArticle = (article_id) => {
    
    const sql = `SELECT * FROM articles WHERE article_id = $1;`;
    return db.query(sql, [article_id]).then(({rows}) => {
        const article = rows[0];

        if(!article) return Promise.reject({status: 404, msg: 'There is not an article at this ID sorry!'});

        return article;
    })
}

exports.selectAll = () => {
    const sql = `SELECT articles.article_id, articles.author, articles.title, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments) AS comment_count 
    FROM articles JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC;`;

    return db.query(sql).then( ({ rows }) => {
        if(rows.length != 0){
            return rows;
        }
    })

}