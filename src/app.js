import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import Home from './core/components/Home';

const mount = document.getElementById('application');

ReactDOM.render(<Router history={createBrowserHistory()}>
  <Route path="/" component={Home}>
  </Route>
</Router>, mount);
