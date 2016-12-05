const port = process.env.PORT || 3100;
const feathers = require('feathers');
const serveStatic = require('feathers').static;
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('winston');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const configuration = require('feathers-configuration');
const services = require('./services/');

var app = feathers();

app.configure(configuration(path.join(__dirname, '..')));

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';


app.logger = logger;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use(serveStatic(path.join(__dirname, 'public')));

// backend
app.configure(services);

// frontend
/**app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
})**/

// start the server
const server = app.listen(app.get('port'));
server.on('listening', () => {
    logger.log('info', `lirete server started on http://${app.get('host')}:${app.get('port')}`);
});

module.exports = app;
