'use strict';

const service = require('feathers-sequelize');
const tableData = require('./tableData-model');
const hooks = require('./hooks');
const logger = require('winston-color');

module.exports = function(){
  const app = this;

  const options = {
    Model: tableData(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/tabledata', service(options));

  // Get our initialize service to that we can bind hooks
  const tableDataService = app.service('/api/tabledata');

  app.get('/api/tabledata', (req, res) => {
    tableDataService.find({}).then((result) => {
      return res.send(result);
    });
  });

  app.post('/api/tabledata', (req, res) => {
    tableDataService.create(req.body).then((result) => {
      logger.info(`Created new tableData entry with id ${result.id}`);
      return res.send(result);
    }).catch((err) => {
      logger.error(`Error creating new tableData entry, stacktrace: ${err.message}`);
      return res.status(500).send(err);
    });
  });

  // Set up our before hooks
  tableDataService.before = hooks.before;

  // Set up our after hooks
  tableDataService.after = hooks.after;
};
