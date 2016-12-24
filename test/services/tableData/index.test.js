'use strict';

const assert = require('assert');
const app = require('../../../app');

describe('tableData service', function() {
  it('registered the tableData service', () => {
    assert.ok(app.service('api/tabledata'));
  });
});
