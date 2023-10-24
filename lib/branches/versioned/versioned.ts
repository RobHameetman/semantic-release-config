export const VERSIONED_RELEASE_BRANCHES =
	Array.from({ length: 100000 }, (_, i) => i + 1)
		.flatMap((version) => ([
			{ name: `${version}.X.X`, range: `${version}.x.x`, channel: String(version) },
			{ name: `${version}.X.X`, range: `${version}.x.x`, prerelease: true, channel: `${version}-next` },
		]));
