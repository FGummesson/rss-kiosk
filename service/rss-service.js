let Parser = require('rss-parser');
let parser = new Parser();

async function parseStream(url) {
    return parser.parseURL(url);
}

module.exports.parseStream = parseStream;
