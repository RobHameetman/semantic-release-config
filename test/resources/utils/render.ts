import template from 'lodash/template';
import { fakeNextRelease } from '../fakes/fakeNextRelease';

export const render = ($template: string, options: Record<string, unknown>) =>
	template($template)(fakeNextRelease(options));
