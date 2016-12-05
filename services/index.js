'use strict';
const plotter = require('./plotter');

module.exports = function () {
  const app = this;
  
  app.configure(plotter);
};
