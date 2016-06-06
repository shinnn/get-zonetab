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

module.exports = function getZonetab(options) {
  return fettuccine('time-zones/repository/tzdata-latest.tar.gz', Object.assign({
    baseUrl: 'https://www.iana.org/'
  }, options, {
    encoding: null
  }))
  .then(decompressResponseBody)
  .then(function extractZoneTabData(files) {
    const data = files.find(isZoneTab).data;
    options = Object.assign({encoding: 'utf8'}, options);

    if (options.encoding !== null) {
      return data.toString(options.encoding);
    }

    return data;
  });
};
