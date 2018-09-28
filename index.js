/*!
 * get-zonetab | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/get-zonetab
*/
'use strict';

const fettuccine = require('fettuccine');
const decompressTargz = require('decompress-targz');

function isZoneTab({path}) {
  return path === 'zone.tab';
}

module.exports = async function getZonetab(...args) {
  const argLen = args.length;

  if (argLen > 1) {
    throw new RangeError(`Expected 0 or 1 argument (<Object>), but got ${argLen} arguments.`);
  }

  const [options] = args;

  const response = await fettuccine('time-zones/repository/tzdata-latest.tar.gz', {
    baseUrl: 'https://www.iana.org/',
    ...options,
    encoding: null
  });

  if (response.statusCode < 200 || 299 < response.statusCode) {
    throw new Error(`${response.statusCode} ${response.statusMessage}`);
  }

  const data = (await decompressTargz()(response.body)).find(isZoneTab).data;
  const encoding = ({encoding: 'utf8', ...options}).encoding;

  if (encoding !== null) {
    return data.toString(encoding);
  }

  return data;
};
