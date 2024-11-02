import { faker } from '@faker-js/faker';
import { PR_PRERELEASE_LABELS } from '../PrPrereleaseLabel';

export const randomPrPrereleaseLabel = () => faker.helpers.arrayElement(PR_PRERELEASE_LABELS);
// export const randomNonDefaultPrPrereleaseStrategy = () => faker.helpers.arrayElement(PR_PRERELEASE_LABELS.filter((strategy) => !strategy.includes('default')));
// export const randomDefaultPrPrereleaseStrategy = () => faker.helpers.arrayElement(PR_PRERELEASE_LABELS.filter((strategy) => strategy.includes('default')));
