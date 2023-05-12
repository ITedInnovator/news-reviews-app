
exports.postNewComment = ( req, res, next) => {
    const { username, body } = req.body;
    res.status(200).send({"username": username, "body": body});
}