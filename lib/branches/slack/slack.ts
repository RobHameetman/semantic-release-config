export const VERSIONED_RELEASE_BRANCH_SLACK_CONFIGS =
	Array.from({ length: 100000 }, (_, i) => i + 1)
		.flatMap((version) => ([
			{ pattern: `${version}.X.X`, notifyOnSuccess: true, },,
		]));
