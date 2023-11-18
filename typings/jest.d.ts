declare namespace jest {
	interface Matchers<R, T> {
		toBeAMajorRelease(): T;
		toBeAMinorRelease(): T;
		toBeAPatchRelease(): T;
		toBeReleased(): T;
		toEqualZero(): T;
	}
}
