// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import { jest } from '@jest/globals';
import '../matchers';

global.jest = jest;

Object.assign(process.env, {
	CONFIG_TEST_TIMEOUT: '10000',
});

beforeAll(() => {
	jest.useFakeTimers();
});

afterAll(() => {
	jest.restoreAllMocks();
	jest.resetModules();
	jest.useRealTimers();
});
