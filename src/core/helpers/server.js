import { browserHistory } from 'react-router';
import rp from 'request-promise';

class Server {
	constructor() {
	}

  plotTable(table) {
    let options = {
      uri: 'http://localhost:3001/api/plotter',
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
