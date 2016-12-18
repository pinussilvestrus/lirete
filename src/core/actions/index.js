import React from 'react';
import {browserHistory} from 'react-router';
import Server from '../helpers/server';

export default {
  plot: (table) => {
    Server.plotTable(table)
      .then(result => {
        console.log(result);
        location.reload(); // todo: No reload, just rerending the image
      })
      .catch(error => {
        console.log(error);
        location.reload();
      });
  }
};
