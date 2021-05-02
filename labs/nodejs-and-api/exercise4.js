const http = require("http");
const URL = require('url').URL;


const items = ["bread", "milk", "cum", "eggs"];


http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const parameters = url.searchParams;

    let itemNum = parameters.get("itemNum");
    let msg = "";
    if (itemNum) {
        msg = `You selected item ${itemNum}: ${items[itemNum]}`;
    } else {
        msg = "Nothing selected";
    }

    // Write the response
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.end(msg);
}).listen(8081);


console.log("Server running at http://127.0.0.1:8081");