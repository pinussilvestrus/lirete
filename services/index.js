'use strict';
const plotter = require('./plotter');
const tableData = require('./tableData');

module.exports = function () {
  const app = this;

  app.get("/api/system_info", (req, res, next) => {
    return res.sendStatus(200);
  });

  app.configure(tableData);
  app.configure(plotter);
};
