/*!
 * get-zonetab | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/get-zonetab
*/
'use strict';

const fettuccine = require('fettuccine');
const decompressTargz = require('decompress-targz');

function decompressResponseBody(response) {
  if (response.statusCode < 200 || 299 < response.statusCode) {
    return Promise.reject(new Error(`${response.statusCode} ${response.statusMessage}`));
  }

  return decompressTargz()(response.body);
}

function isZoneTab(file) {
  return file.path === 'zone.tab';
}

module.exports = function getZonetab(...args) {
  const argLen = args.length;

  if (argLen > 1) {
    return Promise.reject(new RangeError(`Expected 0 or 1 argument (<Object>), but got ${argLen} arguments.`));
  }

  const options = args[0];

  return fettuccine('time-zones/repository/tzdata-latest.tar.gz', Object.assign({
    baseUrl: 'https://www.iana.org/'
  }, options, {
    encoding: null
  }))
  .then(decompressResponseBody)
  .then(function extractZoneTabData(files) {
    const data = files.find(isZoneTab).data;
    const encoding = Object.assign({encoding: 'utf8'}, options).encoding;

    if (encoding !== null) {
      return data.toString(encoding);
    }

    return data;
  });
};
