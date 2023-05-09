const { selectAll } = require("../models/topics.models");

exports.getTopics = (req, res, next) => {
    selectAll().then((result) => {
        if(result.rows === 0) return Promise.reject({ status: 404, msg: "Not Found"});

        res.status(200).send({topics: result.rows});

    }).catch((err) => {
        next(err);
    });
}