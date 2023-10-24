import { getVersions } from './getVersions';
import { render } from './render';

export const versionsOf = async ($template: string, options: Record<string, unknown>) =>
	getVersions('@angular/core', render($template, options));
