'use strict';
const PythonShell = require('python-shell');
const logger = require('winston');
module.exports = function () {
  const app = this;

  app.post('/api/plotter', (req, res) => {
    if (!req.body.header || !req.body.body) return res.status(400).json({message: "Bad Request"});

    PythonShell.run('services/py/linregwithtxt.py', function (err) {
      if (err) throw err;
      logger.info('Python script finished');
      return res.status(200).json({message: "Successfully plotted graph"});
    });
  });
};
