let http = require('http'),
  fs = require('fs'),
  port = process.env['PORT'] || 8080,
  director = require('director'),
  static = require('node-static');

/**
 * Display the main page.
 */
let showMain = function () {
  fs.readFile('./web/index.html', (err, html) => {
    this.res.writeHeader(200, { 'Content-Type': 'text/html' });
    this.res.write(html);
    this.res.end();
  });
};

let verifyEmail = function (email) {
  this.res.writeHeader(200, { 'Content-Type': 'application/json' });
  this.res.write(
    JSON.stringify({
      trusted: true
    })
  );
  this.res.end();
};

// Create the static file
let file = new static.Server(__dirname + '/web/', {
  cache: 0,
  headers: {
    'Cache-Control': 'no-cache, must-revalidate'
  }
});

// Specify the routes.
let routes = {
  '/': { get: showMain },
  '/verification': { get: verifyEmail }
};

// Create the router
let router = new director.http.Router(routes);

// Create the server
let server = http.createServer(function (req, res) {
  router.dispatch(req, res, function (err) {
    if (err) {
      file.serve(req, res);
    }
  });
});

// Listen on the specific port
server.listen(port);

console.log('Server ready to accept requests on port %d', port);
