import React from 'react';
import {browserHistory} from 'react-router';
import Server from '../helpers/server';

export default {
  plot: ({}) => {
    Server.plotTable()
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
