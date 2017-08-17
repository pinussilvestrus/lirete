const port = process.env.PORT || 3100;
const feathers = require('feathers');
const serveStatic = require('feathers').static;
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');
const logger = require('winston-color');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const configuration = require('feathers-configuration');
const services = require('./services/');
const Sequelize = require('sequelize');

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

app.options('*', cors());
app.use(cors());

app.use(cookieParser());
app.use(serveStatic(path.join(__dirname, 'public')));

// sqlite db
const sequelize = new Sequelize('sequelize', '', '', {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db', 'db.sqlite'),
  logging: false
});
app.set('sequelize', sequelize);

// backend
app.configure(services);

// frontend
app.use(serveStatic(__dirname + '/dist'));
app.get('/', function (request, response){
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});


// start the server
const server = app.listen(app.get('port'));
server.on('listening', () => {
    logger.log('info', `lirete server started on http://${app.get('host')}:${app.get('port')}`);
});

module.exports = app;
