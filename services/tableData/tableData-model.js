'use strict';

// tableData-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const tableData = sequelize.define('tableData', {
    header: {
      type: Sequelize.JSON,
      allowNull: false
    },
    body: {
      type: Sequelize.JSON,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  tableData.sync();

  return tableData;
};
