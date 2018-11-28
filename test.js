'use strict';

const getZonetab = require('.');
const test = require('tape');

test('getZonetab()', async t => {
	t.plan(5);

	(async () => {
		const data = await getZonetab();

		t.equal(
			typeof data,
			'string',
			'should be fulfilled with a string.'
		);

		t.equal(
			data.indexOf('# tzdb timezone descriptions (deprecated version)'),
			0,
			'should be fulfilled with a zone.tab data.'
		);
	})();

	(async () => {
		t.equal(
			Buffer.isBuffer(await getZonetab({encoding: null})),
			true,
			'should be fulfilled with a buffer when `encoding` option is null.'
		);
	})();

	(async () => {
		try {
			await getZonetab({baseUrl: 'https://example.org'});
		} catch ({message}) {
			t.equal(
				message,
				'404 Not Found',
				'should fail when it cannot get zone.tab file.'
			);
		}
	})();

	try {
		await getZonetab({}, {});
	} catch (err) {
		t.equal(
			err.toString(),
			'RangeError: Expected 0 or 1 argument (<Object>), but got 2 arguments.',
			'should fail when it takes too many arguments.'
		);
	}
});
