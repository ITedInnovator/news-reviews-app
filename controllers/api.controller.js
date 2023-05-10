const { retrieveDocsFile } = require("../models/api.model");

 exports.getApiDocs = (req, res, next) => {
    retrieveDocsFile().then((result) => {
        
        res.status(200).send(JSON.parse(result));
    })
    
 }