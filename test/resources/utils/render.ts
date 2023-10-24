import template from 'lodash/template';
import { fakeNextRelease } from '../fakes/fakeNextRelease';

export const render = ($template: string, options: Record<string, unknown>) => {
	console.log('$template', $template);
	const result = template($template)(fakeNextRelease(options));


	return result;
}
	// template($template)(fakeNextRelease(options));
/**
 * ${nextRelease.type === 'patch'
 * 	? `>= ${nextRelease.version.split(/\.|-/)[0]}.${nextRelease.version.split(/\.|-/)[1]}.${Number(nextRelease.version.split(/\.|-/)[2]) - 1 >= 0 ? Number(nextRelease.version.split(/\.|-/)[2]) - 1 : 0} < ${nextRelease.version.split(/\.|-/)[0]}.${nextRelease.version.split(/\.|-/)[1]}.${nextRelease.version.split(/\.|-/)[2]}`
 * : ''}
 */
