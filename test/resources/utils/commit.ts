export const commit = (message: string) => {
	const match = message.match(/^(?<type>[^\(:]+)(?:\((?<scope>[^\)]+)\))?: (?<subject>.*)$/);

	return match
		? match.groups
		: null;
};
