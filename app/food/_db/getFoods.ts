import { unstable_cache } from 'next/cache'
import { Collection } from "./Collection"
import QueryBuilder from './QueryBuilder';

export const getFoods = unstable_cache(async (searchParams = {}) => {
  // const { type,phosphorus,protein,carbon,fishmeat } = searchParams;
  // const queryBuilder = new QueryBuilder();
  // queryBuilder.isType(type)
  //   .isLowPhosphorus(phosphorus)
  //   .isHighProtein(protein)
  //   .isLowProtein(protein)
  //   .isLowCarbon(carbon)
  //   .notFishMeat(fishmeat)
  const data = await Collection.getDatas({});
  return data
}, undefined,
  { tags: ['foods'] }
)