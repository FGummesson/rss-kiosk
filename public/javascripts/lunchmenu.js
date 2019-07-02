function fetchLunchmenu() {
    console.log("fetching lunchmenu");
    fetch('/lunchmenu')
        .then(res => res.json())
        .then(data => {
            console.log(data.title);
            $('#title').empty().text(data.title);
            $('#content').empty().append(modifyContent(data.content));
            $('#pubDate').empty().html(new Date(data.pubDate).toLocaleString());
        })
        .catch(error => {
            $('#content').empty().html(error.error);
        })
}

function modifyContent(content) {
    return content;
}


fetchLunchmenu();
setInterval(fetchLunchmenu, 300000);