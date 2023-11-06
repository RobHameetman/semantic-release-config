import template from 'lodash/template';
import { fakeNextRelease } from '../fakes/fakeNextRelease';

export const render = ($template: string, options: Record<string, unknown>) => {
	const result = template($template)(fakeNextRelease(options));


	return result;
}
