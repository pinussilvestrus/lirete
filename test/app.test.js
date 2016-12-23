'use strict';

const assert = require("assert");
const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const logger = require('winston-color');

describe('React application tests', function () {
  before(function (done) {
    this.server = app.listen(3031);
    logger.level = 'error';
    this.server.once('listening', () => done());
  });

  after(function (done) {
    this.server.close(done);
  });

  it('starts and shows the index page', function () {
    return new Promise((resolve, reject) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          resolve();
        });
    });
  });
});
