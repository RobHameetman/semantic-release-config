import { faker } from '@faker-js/faker';
import { PR_PRERELEASE_STRATEGIES } from '../PrPrereleaseStrategy';

export const randomPrPrereleaseStrategy = () => faker.helpers.arrayElement(PR_PRERELEASE_STRATEGIES);
export const randomNonDefaultPrPrereleaseStrategy = () => faker.helpers.arrayElement(PR_PRERELEASE_STRATEGIES.filter((strategy) => !strategy.includes('default')));
export const randomDefaultPrPrereleaseStrategy = () => faker.helpers.arrayElement(PR_PRERELEASE_STRATEGIES.filter((strategy) => strategy.includes('default')));
