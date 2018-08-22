const express      = require('express');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const config       = require('../config.json');
const debug        = require('debug')(config.name + ':Web');
const http         = require('http');

const index  = require('./routes/index');
const editor = require('./routes/editor');
const app   = express();

let proxy = require('http-proxy').createProxyServer();
let server = http.createServer(app);

// view engine setup
app.set('views', dir('views'));
app.set('view engine', 'ejs');

app.use(favicon(dir('../assets/logo.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(dir('../Client/public')));
app.use(express.static(dir('public')));

// Proxy socket.io requests to main web server to the game server
app.all('/socket.io/*', (req, res) => {
  proxy.web(req, res, {target: 'http://localhost:' + config.game});
});

// Proxy websockets
server.on('upgrade', function (req, res) {
  proxy.ws(req, res, {target: 'http://localhost:' + config.game});
});

app.use('/', index);
app.use('/editor', editor);
app.use('/scenes', express.static(dir('../scenes')));
app.use('/maps', express.static(dir('../maps')));
app.use('/img', express.static(dir('../assets/images')));
app.use('/sprites', express.static(dir('../assets/sprites')));
app.use('/animations', express.static(dir('../assets/animations')));
app.use('/tilesheets', express.static(dir('../assets/tilesheets')));
app.use('/fonts', express.static(dir('../assets/fonts')));
app.use('/apple-touch-icon.png', express.static(dir('../assets/reverselogo.png')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

let port = normalizePort(process.env.PORT || config.port);
app.set('port', port);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
app.set('server', server);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

function dir(path) {
  path = path.split('/');
  return require('path').join(__dirname, ...path);
}

module.exports = app;
