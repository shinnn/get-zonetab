# get-zonetab

[![NPM version](https://img.shields.io/npm/v/get-zonetab.svg)](https://www.npmjs.com/package/get-zonetab)
[![Build Status](https://travis-ci.org/shinnn/get-zonetab.svg?branch=master)](https://travis-ci.org/shinnn/get-zonetab)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/get-zonetab.svg)](https://coveralls.io/github/shinnn/is-gist-starred?branch=master)
[![Dependency Status](https://david-dm.org/shinnn/get-zonetab.svg)](https://david-dm.org/shinnn/get-zonetab)
[![devDependency Status](https://david-dm.org/shinnn/get-zonetab/dev-status.svg)](https://david-dm.org/shinnn/get-zonetab#info=devDependencies)

A [Node](https://nodejs.org/) module to get the latest [`zone.tab`](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) file form [IANA Time Zone Database](https://www.iana.org/time-zones)

```javascript
const getZonetab = require('get-zonetab');

getZonetab().then(string => {
  string; //=> '# tz zone descriptions (deprecated version)\n ...'
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install get-zonetab
```

## API

```javascript
const getZonetab = require('get-zonetab');
```

### getZonetab([*options*])

*options*: `Object`  
Return: [`Promise`](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor) instance

It gets and extracts `zone.tab` file form <https://www.iana.org/time-zones> and returns a promise for a string of file contents.

#### Options

All options except for `encoding` will be directly used as [`Request` options](https://github.com/request/request#requestoptions-callback).

##### options.encoding

Type: `String` or `null`  
Default: `utf8`

Determine the encoding of the stirng or get a [`Buffer`](https://nodejs.org/api/buffer.html#buffer_buffer) instead if this option is `null`.

```javascript
getZonetab({encoding: null}).then(buffer => {
  buffer; //=> <Buffer 23 20 74 7a 20 7a 6f 6e 65 20 64 65 73 63 72 ... >
});
```

## License

Copyright (c) 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
