let http = require('http'),
  fs = require('fs'),
  port = process.env['PORT'] || 8090,
  director = require('director'),
  static = require('node-static');

/**
 * Display the main page.
 */
let showMain = function () {
  fs.readFile('./index.html', (err, html) => {
    this.res.writeHeader(200, { 'Content-Type': 'text/html' });
    this.res.write(html);
    this.res.end();
  });
};

/**
 * Check if the email adress is already in database.
 * @TODO: connection to the database is not yet implemented.
 * @param {string} email - the email to test.
 */
let checkIfEmailAlreadyExists = function (email) {
  this.res.writeHeader(200, { 'Content-Type': 'application/json' });
  this.res.write(
    JSON.stringify({
      presentInDatabase: false,
      msg: 'This email has not already been used'
    })
  );
  this.res.end();
};

/**
 * Generate two integers from 0 to 10.
 */
let generateCapcha = function () {
  const op1 = Math.round(Math.random() * 10),
    op2 = Math.round(Math.random() * 10);

  this.res.writeHeader(200, { 'Content-Type': 'application/json' });
  this.res.write(JSON.stringify({ op1: op1, op2: op2 }));
  this.res.end();
};

// Create the static file
let file = new static.Server(__dirname + '/', {
  cache: 0,
  headers: {
    'Cache-Control': 'no-cache, must-revalidate'
  }
});

// Specify the routes.
let routes = {
  '/': { get: showMain },
  '/email': { get: checkIfEmailAlreadyExists },
  '/capcha': { get: generateCapcha }
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
