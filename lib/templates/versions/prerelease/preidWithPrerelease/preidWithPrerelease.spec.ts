import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { preidWithPrerelease } from './preidWithPrerelease';

describe('preidWithPrerelease()', () => {
	it('should be a function', () => {
		expect(isFunction(preidWithPrerelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString(preidWithPrerelease())).toBe(true);
	});

	it('should resolve to the prerelease preid given a prerelease version with a build number', () => {
		expect(render(`\${${preidWithPrerelease()}}`, { version: '1.2.20-rc.1+build.5' })).toBe('rc.1');
	});

	it('should resolve to the prerelease preid given a prerelease version with extra dashes', () => {
		expect(render(`\${${preidWithPrerelease()}}`, { version: '1.2.20---DEV-SNAPSHOT.12+build.5' })).toBe('--DEV-SNAPSHOT.12');
	});

	it('should resolve to the prerelease preid given a prerelease version with no build', () => {
		expect(render(`\${${preidWithPrerelease()}}`, { version: '1.2.20-beta' })).toBe('beta');
	});

	it('should resolve to an empty string given a release version with a build', () => {
		expect(render(`\${${preidWithPrerelease()}}`, { version: '1.2.20+build.1848' })).toBe('');
	});

	it('should resolve to an empty string given a release version with no build', () => {
		expect(render(`\${${preidWithPrerelease()}}`, { version: '1.2.20' })).toBe('');
	});
});
