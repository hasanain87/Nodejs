const http = require('http');

const port = 8888;

const app = http.createServer((request, response) => {
    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('Hello World!!!');
    } else if (request.url === '/json') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ hello: 'world' }));
    }
});

app.listen(port, 'localhost');

// you need to run the  node server which is  "node server.js"  
// then go and type localhost:8888 (port number)in the  browser url