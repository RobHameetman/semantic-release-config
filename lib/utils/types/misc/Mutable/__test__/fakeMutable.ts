import { Mutable } from '../Mutable';

export const fakeMutable = <T>({
	...overrideProps
}: Record<string, unknown> = {}) => ({
	...overrideProps,
} as Mutable<T>);
