export const mockDatetimeHash = (date = new Date()) => {
	const $mock = jest.fn(() => date.toISOString());

	Object.defineProperties(Date.prototype, {
		toDatetimeHash: {
			get: $mock
		},
	});

	return $mock;
}
