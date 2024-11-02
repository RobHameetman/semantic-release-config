export const mockEnv = (env: string) => {
	const $mock = jest.fn();

	Object.defineProperties(process.env, {
		[env]: {
			get: $mock
		},
	});

	return $mock;
};
