import { unstable_cache } from 'next/cache'
import { Collection } from "../_firebase"
import QueryGenerator from './QueryGenerator';

export const getFoods = unstable_cache(async (searchParams = {}) => {
  const { type } = searchParams;
  const queryGenerator = new QueryGenerator();
  queryGenerator.isType(type)

  const data = await Collection.getDatas(queryGenerator.contraint);
  return data
}, undefined,
  { tags: ['foods'] }
)