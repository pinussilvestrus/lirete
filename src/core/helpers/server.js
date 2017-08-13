import { browserHistory } from 'react-router';
import rp from 'request-promise';
import Config from '../helpers/config';

class Server {
	constructor() {
	}

  plotTable(table) {
    let options = {
      uri: `${Config.server}/api/plotter`,
      method: 'POST',
      headers: {
        'User-Agent': 'Request-Promise'
      },
      body: {
        header: table.header,
        body: table.body
      },
      json: true
    };

    console.log(options.body);

    return rp(options)
      .then(function (result) {
        return Promise.resolve(result);
      })
      .catch(function (err) {
        return Promise.reject(err);
      });
  }
}

export default new Server();
