const fs = require("fs/promises");
exports.retrieveDocsFile = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`, "utf8").then((data) => {
        
        return data

    })
}