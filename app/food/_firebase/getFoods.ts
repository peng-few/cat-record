import { unstable_cache } from 'next/cache'
import { Collection } from "../_firebase"
import QueryBuilder from './QueryBuilder';

export const getFoods = unstable_cache(async (searchParams = {}) => {
  const { type,phosphorus,protein,carbon,fishmeat } = searchParams;
  const queryBuilder = new QueryBuilder();
  queryBuilder.isType(type)
    .isLowPhosphorus(phosphorus)
    .isHighProtein(protein)
    .isLowProtein(protein)
    .isLowCarbon(carbon)
    .notFishMeat(fishmeat)
  console.log(queryBuilder.contraint)
  const data = await Collection.getDatas(queryBuilder.contraint);
  return data
}, undefined,
  { tags: ['foods'] }
)