import type { PluginSpec } from 'semantic-release';
import { env } from '@utils/functions/env';
import { getEnvBooleanOrValue } from '@utils/functions/getEnvBooleanOrValue';

export interface ExecuteCustomCommandsInput {
	/**
	 * The shell command to execute during the analyze commits step.
	 */
	readonly analyze?: string;

	/**
	 * The shell command to execute during the generate notes step.
	 */
	readonly annotate?: string;

	/**
	 * The shell command to execute during the add channel step.
	 */
	readonly channel?: string;

	/**
	 * The shell command to execute during the verify release step.
	 */
	readonly confirm?: string;

	/**
	 * The path to use as current working directory when executing the shell
	 * commands. This path is relative to the path from which semantic-release is
	 * running. For example if semantic-release runs from `/my-project` and
	 * `execCwd` is set to `buildScripts` then the shell command will be executed
	 * from `/my-project/buildScripts`.
	 */
	readonly cwd?: string;

	/**
	 * The shell command to execute during the fail step.
	 */
	readonly fail?: string;

	/**
	 * The shell command to execute during the prepare step.
	 */
	readonly prepare?: string;

	/**
	 * The shell command to execute during the publish step.
	 */
	readonly publish?: string;

	/**
	 * The shell to use to run the command. If `true`, runs file inside of a shell.
	 * Uses `/bin/sh` on UNIX and `cmd.exe` on Windows. A different shell can be
	 * specified as a string. The shell should understand the `-c` switch on UNIX
	 * or `/d /s /c` on Windows.
	 */
	readonly shell?: boolean | string;

	/**
	 * The shell command to execute during the success step.
	 */
	readonly success?: string;

	/**
	 * The shell command to execute during the verify condition step.
	 */
	readonly verify?: string;
}

export const executeCustomCommands = ({
	analyze = env('RELEASE_EXEC_ANALYZE_COMMITS_CMD'),
	annotate = env('RELEASE_EXEC_GENERATE_NOTES_CMD'),
	channel = env('RELEASE_EXEC_ADD_CHANNEL_CMD'),
	confirm = env('RELEASE_EXEC_VERIFY_ARTIFACTS_CMD'),
	cwd = env('RELEASE_EXEC_CWD'),
	fail = env('RELEASE_EXEC_FAIL_CMD'),
	prepare = env('RELEASE_EXEC_PREPARE_CMD'),
	publish = env('RELEASE_EXEC_PUBLISH_CMD'),
	success = env('RELEASE_EXEC_SUCCESS_CMD'),
	shell = env('RELEASE_EXEC_SHELL', getEnvBooleanOrValue),
	verify = env('RELEASE_EXEC_VERIFY_CONDITIONS_CMD'),
}: ExecuteCustomCommandsInput = {}) => ([
	'@semantic-release/exec', {
		analyzeCommitsCmd: analyze,
		addChannelCmd: channel,
		execCwd: cwd,
		failCmd: fail,
		generateNotesCmd: annotate,
		prepareCmd: prepare,
		publishCmd: publish,
		shell,
		successCmd: success,
		verifyConditionsCmd: verify,
		verifyReleaseCmd: confirm,
	},
] as PluginSpec);
