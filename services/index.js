'use strict';
const plotter = require('./plotter');

module.exports = function () {
  const app = this;

  app.get("/api/system_info", (req, res, next) => {
    return res.sendStatus(200);
  });

  app.configure(plotter);
};
