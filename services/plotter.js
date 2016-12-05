'use strict';
const PythonShell = require('python-shell');
const logger = require('winston');
module.exports = function () {
  const app = this;

  app.post('/api/plotter', (req, res) => {
    PythonShell.run('services/py/linregwithtxt.py', function (err) {
      if (err) throw err;
      logger.info('Python script finished');
      res.send("Ok");
    });
  });
};
