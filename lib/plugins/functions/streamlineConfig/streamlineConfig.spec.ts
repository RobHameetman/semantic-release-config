import { onTest } from '@test/utils/onTest';
import { streamlineConfig } from './streamlineConfig';

describe('streamlineConfig()', () => {
	let error: Error | null = null;
	let result: unknown = null;
	let index = 1;

	beforeEach(() => {
		try {
			onTest(index, {
				1: () => {
					result = streamlineConfig(['test-config', {
						foo: 'foo.js',
						bar: 'setToThis',
					}]);
				},
				2: () => {
					result = streamlineConfig(['test-config', {
						foo: undefined,
						bar: 'setToThis',
					}]);
				},
				3: () => {
					result = streamlineConfig(['test-config', {
						foo: undefined,
						bar: '',
					}]);
				}
			});
		} catch (thrown) {
			error = !(thrown instanceof Error) ? (thrown as Error) : new Error();
			console.error(thrown);
		}
	});

	afterEach(() => {
		result = null;
		index++;
	});

	it('should return an array given a plugin name and a configuration with defined options', () => {
		expect(index).toBe(1);
		expect(error).toBeNull();

		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect((result as [string, object]).at(0)).toEqual(expect.any(String));
		expect((result as [string, object]).at(1)).toEqual(expect.any(Object));
	});

	it('should remove undefined configuration options given a configuration with undefined options', () => {
		expect(index).toBe(2);
		expect(error).toBeNull();

		expect((result as [string, object]).at(1)).toEqual(expect.objectContaining(
			{ bar: 'setToThis' },
		));
	});

	it('should return a string given a plugin name and a configuration with no defined options', () => {
		expect(index).toBe(3);
		expect(error).toBeNull();

		expect(result).toBe('test-config');
	});
});

