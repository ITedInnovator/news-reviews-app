const db = require("../db/connection");

exports.selectAll = () => {
    return db.query("SELECT * FROM topics;");
}