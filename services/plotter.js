'use strict';
const PythonShell = require('python-shell');
const logger = require('winston-color');
const randomstring = require("randomstring");
const FythonService = require('feathers-python');

const fs = require('fs');
module.exports = function () {
  const app = this;

  /** writing whole data to temp-file for better debugging/printing later on **/
  const writeTableToFile = (fileName, tableHead, tableBody) => {

    var  stream = fs.createWriteStream(`dist/temp/${fileName}.txt`);
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

  // Todo: enter this in own module
  let pythonService = new FythonService({scriptPath: "services/py/linregwithtxt.py"});

  app.post('/api/plotter', (req, res) => {
    if (!req.body.header || !req.body.body) return res.status(400).json({message: "Bad Request"});

    let txtfileName = randomstring.generate({
      length: 12,
      charset: 'alphabetic'
    });
    writeTableToFile(txtfileName, req.body.header, req.body.body);

    let pngfileName = randomstring.generate({
      length: 12,
      charset: 'alphabetic'
    });

    let options = {
      args: [pngfileName, txtfileName]
    };

    pythonService.create({
      param1: pngfileName,
      param2: txtfileName
    }).then(result => {
      logger.info('Python script for plotting finished');
      return res.status(200).json({
        graph: `temp/${pngfileName}.png`,
        table: `temp/${txtfileName}.txt`,
        message: "Successfully plotted graph"
      });
    }).catch(err => {
      logger.error(err);
      return res.status(406).send({error: err});
    });
  });
};
