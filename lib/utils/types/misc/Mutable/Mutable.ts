import { isObject } from '@rob.hameetman/type-guards';

/**
 * An object with no readonly properties. This is useful when mocking and faking
 * data for testing that is immutable at runtime but mutable when seeding the
 * mock or fake with optional data. The example below shows how this type can be
 * useful in mocking and faking data by avoiding false positives from TypeScript
 * when trying to give a fake user a fake phone number. Using `Partial<User>`
 * instead would not work because `phoneNumber` is readonly, and a const
 * assertion
 *
 * @example
 * ```TypeScript
 * import { faker } from '@faker-js/faker';
 * import type { Mutable } from '@/utils/types/misc/Mutable';
 * import type { User } from '../User';
 *
 * export const fakeUser = <T>({
 *   ...overrideProps
 * }: Record<string, unknown> = {}) => {
 *   const user = {
 *     name: faker.person.firstName(),
 *   } as Mutable<User<T>>;
 *
 *   faker.helpers.maybe(() => {
 *     user.phoneNumber = faker.phone.number();
 *   });
 *
 *   return {
 *     ...user,
 *     ...overrideProps,
 *   } as User<T>;
 * };
 * ```
 *
 * @typeParam `T` - The type of the mutable data.
 */
export type Mutable<T> = Record<keyof T, T[keyof T]>;

/**
 * Checks that an `unknown` value is a {@link Mutable<T>}.
 *
 * Requirements:
 *   - `value` must be a compound reference type with no readonly property descriptors.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link Mutable<T>}.
 */
export const isMutable = <T>(value: unknown): value is Mutable<T> =>
	/**
	 * value
	 */
	isObject(value) &&
	Object.keys(value).every((key) =>
		Object.getOwnPropertyDescriptor(value, key)?.writable);
