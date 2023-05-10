const fs = require("fs/promises");

exports.getApiDocs = (req, res, next) => {
    fs.readFile(`${__dirname}/../endpoints.json`, "utf8").then((result) => {
        
        res.status(200).send(JSON.parse(result));
    })
    
}