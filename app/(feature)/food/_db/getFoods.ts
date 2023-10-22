import { unstable_cache } from 'next/cache'
import { Collection } from "./Collection"
import QueryBuilder from './QueryBuilder';

export const getFoods = unstable_cache(async (searchParams = {}) => {
  const { type,phosphorus,protein,carbon,fishmeat,page } = searchParams;
  const queryBuilder = new QueryBuilder();
  queryBuilder.isType(type)
    .isLowPhosphorus(phosphorus)
    .isHighProtein(protein)
    .isLowProtein(protein)
    .isLowCarbon(carbon)
    .notFishMeat(fishmeat)
  const data = await Collection.getDatas([{$match: queryBuilder.filter}]);
  return data
}, undefined,
  { tags: ['foods'] }
)