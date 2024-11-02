declare namespace jest {
	interface Matchers<R, T> {
		toBeAMajorRelease(): T;
		toBeAMinorRelease(): T;
		toBeAPatchRelease(): T;
		toBeReleased(): T;
		toEqualZero(): T;
	}

	export function unstable_mockModule(moduleName: string, factory: () => unknown): void;
}
