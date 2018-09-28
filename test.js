'use strong';

const getZonetab = require('.');
const test = require('tape');

test('getZonetab()', t => {
  t.plan(6);

  t.strictEqual(getZonetab.name, 'getZonetab', 'should have a function name.');

  getZonetab().then(data => {
    t.strictEqual(
      typeof data === 'string',
      true,
      'should be fulfilled with a string.'
    );

    t.strictEqual(
      data.indexOf('# tz zone descriptions (deprecated version)'),
      0,
      'should be fulfilled with a zone.tab data.'
    );
  }).catch(t.fail);

  getZonetab({encoding: null}).then(data => {
    t.strictEqual(
      Buffer.isBuffer(data),
      true,
      'should be fulfilled with a buffer when `encoding` option is null.'
    );
  }).catch(t.fail);

  getZonetab({baseUrl: 'https://example.org'}).then(t.fail, err => {
    t.strictEqual(
      err.message,
      '404 Not Found',
      'should fail when it cannot get zone.tab file.'
    );
  }).catch(t.fail);

  getZonetab({}, {}).then(t.fail, err => {
    t.strictEqual(
      err.toString(),
      'RangeError: Expected 0 or 1 argument (<Object>), but got 2 arguments.',
      'should fail when it takes too many arguments.'
    );
  }).catch(t.fail);
});
