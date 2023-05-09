const { selectAll } = require("../models/topics.models");

exports.getTopics = (req, res) => {
    selectAll().then((result) => {
    
        res.status(200).send({topics: result.rows});

    })
}