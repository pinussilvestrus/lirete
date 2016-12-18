'use strict';
const PythonShell = require('python-shell');
const logger = require('winston-color');

const fs = require('fs');
module.exports = function () {
  const app = this;

  /** writing whole data to temp-file for better debugging/printing later on **/
  const writeTableToFile = (tableHead, tableBody) => {
    var  stream = fs.createWriteStream("temp/table.txt");
    stream.once('open', function(fd) {
      // writing header
      tableHead.forEach(h => {
        stream.write(h);
        stream.write(" ");
      });

      stream.write("\n");

      // writing body row by row
      tableBody.forEach(row => {
        row.forEach(v => {
          stream.write(v.toString());
          stream.write(" ");
        });
        stream.write("\n");
      });
      stream.end();
      logger.info("Create datatable file in temp/table.txt");
    });
  };

  app.post('/api/plotter', (req, res) => {
    if (!req.body.header || !req.body.body) return res.status(400).json({message: "Bad Request"});

    writeTableToFile(req.body.header, req.body.body);

    PythonShell.run('services/py/linregwithtxt.py', function (err) {
      if (err) throw err;
      logger.info('Python script for plotting finished');
      return res.status(200).json({message: "Successfully plotted graph"});
    });
  });
};
