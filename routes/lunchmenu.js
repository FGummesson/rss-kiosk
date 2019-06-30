let express = require('express');
let router = express.Router();

const NodeCache = require("node-cache");
const itemCache = new NodeCache({stdTTL: 1200});


function itemToObj(item) {
    return {
        title: item.title,
        content: item.content,
        link: item.link,
        pubDate: item.pubDate
    };
}

async function getRssItem() {
    let item = itemCache.get('item');
    if (item === undefined) {
        let RssService = require('../service/rss-service');
        item = await RssService.parseStream(process.env.RSS_URL);

        console.log("Cache miss! Fetching new RSS item from source");
        console.log("fetched item is ", item);
        itemCache.set('item', item);
    } else {
        console.log("Cache hit! Returning cached RSS item");
    }
    return item;

}

router.get('/', function (req, res, next) {
    getRssItem().then(d => {
        let item = d.items.pop();
        res.json(itemToObj(item))
    }).catch(e => {
            console.log(e);
            res.status(500).json({error: "Cannot fetch RSS feed."})
        }
    );
});

module.exports = router;