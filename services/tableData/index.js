'use strict';

const service = require('feathers-sequelize');
const tableData = require('./tableData-model');
const hooks = require('./hooks');

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

  // Set up our before hooks
  tableDataService.before = hooks.before;

  // Set up our after hooks
  tableDataService.after = hooks.after;
};
