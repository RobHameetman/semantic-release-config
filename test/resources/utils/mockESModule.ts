import * as path from 'path';
import * as url from 'url';

interface WalkOptions {
	readonly depth: number;
}

const DEFAULT_WALK_OPTIONS: WalkOptions = {
	depth: 6,
};

interface WalkInput {
	readonly value: unknown;
	readonly options: WalkOptions;
	readonly objPath?: ReadonlyArray<unknown>;
	readonly property?: string | undefined;
	readonly parent?: unknown;
	readonly cb: (...args: ReadonlyArray<unknown>) => unknown;
}

const walk = ({
	value,
	cb,
	options = DEFAULT_WALK_OPTIONS,
	property = undefined,
	parent = null,
	objPath = [],
}: WalkInput) => {
	return value && typeof value === 'object' && objPath.length <= options.depth
		? Object.entries(value).forEach(([key, val]) =>
				walk({ value: val, cb, options, property: key, parent: value, objPath: [...objPath, key] })
			)
		: cb([property, value], parent, objPath);
}

const forEachDeep = (obj, cb, options = DEFAULT_WALK_OPTIONS) => walk({ value: obj, cb, options });

export const mockESModule = async (
  moduleSpecifier,
  importMeta,
  factory = x => x,
) => {
  let modulePath = moduleSpecifier;

  if (moduleSpecifier.startsWith('.')) {
    const metaPath = url.fileURLToPath(new URL('./', importMeta.url));
    modulePath = path.join(metaPath, moduleSpecifier);
  }

  const { jest } = importMeta;
  const module = await import(modulePath);
  const moduleCopy = { ...module };

  forEachDeep(moduleCopy, ([prop, value], obj) => {
    if (typeof value === 'function') {
      obj[prop] = jest.fn(value);
      // re-adding stinky dynamic custom properties which jest.fn() may has removed
      Object.assign(obj[prop], value);
    }
  });

  const moduleMock = factory(moduleCopy);
  jest.unstable_mockModule(moduleSpecifier, () => moduleMock);

  return moduleMock;
}
