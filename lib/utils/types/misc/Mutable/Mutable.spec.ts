import { isMutable } from './Mutable';
import { fakeMutable } from './__test__';

describe('isMutable()', () => {
	it('should return true given a mutable object', () => {
		expect(isMutable(fakeMutable({ test: 'this' }))).toBe(true);
	});

	it('should return false given an immutable object', () => {
		expect(isMutable(Object.freeze(fakeMutable({ test: 'this' })))).toBe(false);
	});
});
