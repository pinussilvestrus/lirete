import React from 'react';
import {browserHistory} from 'react-router';
import Server from '../helpers/server';

export default {
  plot: (table) => {
    return Server.plotTable(table)
      .then(result => {
        console.log(result);
        if (result.graph) return Promise.resolve(result.graph);
        Promise.reject("No image was rendered!");
      })
      .catch(error => {
        console.log(error);
        location.reload();
      });
  }
};
