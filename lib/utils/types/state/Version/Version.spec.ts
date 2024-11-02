import { Version } from './Version';

describe('Version', () => {
	describe('.major', () => {
		it('should be the major release version as a string for PR prerelease versions', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2+build.34').major).toBe('1');
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2').major).toBe('1');
		});

		it('should be the major release version as a string for prerelease versions', () => {
			expect(new Version('1.2.5-alpha.9+build.34').major).toBe('1');
			expect(new Version('1.2.5-alpha.9').major).toBe('1');
		});

		it('should be the major release version as a string for release versions', () => {
			expect(new Version('1.2.5+build.34').major).toBe('1');
			expect(new Version('1.2.5').major).toBe('1');
		});
	});

	describe('.minor', () => {
		it('should be the minor release version as a string for PR prerelease versions', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2+build.34').minor).toBe('2');
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2').minor).toBe('2');
		});

		it('should be the minor release version as a string for prerelease versions', () => {
			expect(new Version('1.2.5-alpha.9+build.34').minor).toBe('2');
			expect(new Version('1.2.5-alpha.9').minor).toBe('2');
		});

		it('should be the minor release version as a string for release versions', () => {
			expect(new Version('1.2.5+build.34').minor).toBe('2');
			expect(new Version('1.2.5').minor).toBe('2');
		});
	});

	describe('.patch', () => {
		it('should be the patch release version as a string for PR prerelease versions', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2+build.34').patch).toBe('5');
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2').patch).toBe('5');
		});

		it('should be the patch release version as a string for prerelease versions', () => {
			expect(new Version('1.2.5-alpha.9+build.34').patch).toBe('5');
			expect(new Version('1.2.5-alpha.9').patch).toBe('5');
		});

		it('should be the patch release version as a string for release versions', () => {
			expect(new Version('1.2.5+build.34').patch).toBe('5');
			expect(new Version('1.2.5').patch).toBe('5');
		});
	});

	describe('.preid', () => {
		it('should be the entire prerelease version preid for prerelease versions', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2+build.34').preid).toBe('pr.1.abcd1234.20131111.2');
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2').preid).toBe('pr.1.abcd1234.20131111.2');
			expect(new Version('1.2.5-alpha.9+build.34').preid).toBe('alpha.9');
			expect(new Version('1.2.5-alpha.9').preid).toBe('alpha.9');
		});

		it('should be undefined for release versions', () => {
			expect(new Version('1.2.5+build.34').preid).toBe(undefined);
			expect(new Version('1.2.5').preid).toBe(undefined);
		});
	});

	describe('.type', () => {
		it('should be the prerelease version preid type for prerelease versions', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2+build.34').type).toBe('pr');
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2').type).toBe('pr');
			expect(new Version('1.2.5-alpha.9+build.34').type).toBe('alpha');
			expect(new Version('1.2.5-alpha.9').type).toBe('alpha');
		});

		it('should be undefined for release versions', () => {
			expect(new Version('1.2.5+build.34').type).toBe(undefined);
			expect(new Version('1.2.5').type).toBe(undefined);
		});
	});

	describe('.pr', () => {
		it('should be the PR number for PR prerelease versions', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2+build.34').pr).toBe('1');
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2').pr).toBe('1');
		});

		it('should be undefined for release versions and non-PR prelease versions', () => {
			expect(new Version('1.2.5-alpha.9+build.34').pr).toBe(undefined);
			expect(new Version('1.2.5-alpha.9').pr).toBe(undefined);
			expect(new Version('1.2.5+build.34').pr).toBe(undefined);
			expect(new Version('1.2.5').pr).toBe(undefined);
		});
	});

	describe('.commit', () => {
		it('should be the commit sha for PR prerelease versions', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2+build.34').commit).toBe('abcd1234');
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2').commit).toBe('abcd1234');
		});

		it('should be undefined for release versions and non-PR prelease versions', () => {
			expect(new Version('1.2.5-alpha.9+build.34').commit).toBe(undefined);
			expect(new Version('1.2.5-alpha.9').commit).toBe(undefined);
			expect(new Version('1.2.5+build.34').commit).toBe(undefined);
			expect(new Version('1.2.5').commit).toBe(undefined);
		});
	});

	describe('.date', () => {
		it('should be the date has for PR prerelease versions', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2+build.34').date).toBe('20131111');
			expect(new Version('1.2.5-pr.1.20131111.20131111.2').date).toBe('20131111');
		});

		it('should be undefined for release versions and non-PR prelease versions', () => {
			expect(new Version('1.2.5-alpha.9+build.34').commit).toBe(undefined);
			expect(new Version('1.2.5-alpha.9').commit).toBe(undefined);
			expect(new Version('1.2.5+build.34').commit).toBe(undefined);
			expect(new Version('1.2.5').commit).toBe(undefined);
		});
	});

	describe('.prerelease', () => {
		it('should be the prerelease version number as a string for prerelease versions', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2+build.34').prerelease).toBe('2');
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2').prerelease).toBe('2');
			expect(new Version('1.2.5-alpha.9+build.34').prerelease).toBe('9');
			expect(new Version('1.2.5-alpha.9').prerelease).toBe('9');
		});


		it('should be undefined for release versions', () => {
			expect(new Version('1.2.5+build.34').prerelease).toBe(undefined);
			expect(new Version('1.2.5').prerelease).toBe(undefined);
		});
	});

	describe('.build', () => {
		it('should be the build metadata as a string for versions with build metadata', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2+build.34').build).toBe('build.34');
			expect(new Version('1.2.5-alpha.9+build.34').build).toBe('build.34');
			expect(new Version('1.2.5+build.34').build).toBe('build.34');
		});


		it('should be undefined for versions without build metadata', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2').build).toBe(undefined);
			expect(new Version('1.2.5-alpha.9').build).toBe(undefined);
			expect(new Version('1.2.5').build).toBe(undefined);
		});
	});

	describe('.isRelease()', () => {
		it('should return true for release versions', () => {
			expect(new Version('1.2.5+build.34').isRelease()).toBe(true);
			expect(new Version('1.2.5').isRelease()).toBe(true);
		});

		it('should return false for any prerelease versions', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2+build.34').isRelease()).toBe(false);
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2').isRelease()).toBe(false);
			expect(new Version('1.2.5-alpha.9+build.34').isRelease()).toBe(false);
			expect(new Version('1.2.5-alpha.9').isRelease()).toBe(false);
		});
	});

	describe('.isPrerelease()', () => {
		it('should return true for any prerelease versions', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2+build.34').isPrerelease()).toBe(true);
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2').isPrerelease()).toBe(true);
			expect(new Version('1.2.5-alpha.9+build.34').isPrerelease()).toBe(true);
			expect(new Version('1.2.5-alpha.9').isPrerelease()).toBe(true);
		});

		it('should return false for any prerelease versions', () => {
			expect(new Version('1.2.5+build.34').isPrerelease()).toBe(false);
			expect(new Version('1.2.5').isPrerelease()).toBe(false);
		});
	});

	describe('.isPrPrerelease()', () => {
		it('should return true for PR prerelease versions', () => {
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2+build.34').isPrPrerelease()).toBe(true);
			expect(new Version('1.2.5-pr.1.abcd1234.20131111.2').isPrPrerelease()).toBe(true);
		});

		it('should return false for any other prerelease versions', () => {
			expect(new Version('1.2.5-alpha.9+build.34').isPrPrerelease()).toBe(false);
			expect(new Version('1.2.5-alpha.9').isPrPrerelease()).toBe(false);
		});

		it('should return false for release versions', () => {
			expect(new Version('1.2.5+build.34').isPrPrerelease()).toBe(false);
			expect(new Version('1.2.5').isPrPrerelease()).toBe(false);
		});
	});
});
