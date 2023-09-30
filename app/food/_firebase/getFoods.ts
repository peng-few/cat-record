import { unstable_cache } from 'next/cache'
import { Collection } from "../_firebase"

export const getFoods = unstable_cache(async () => {
  const data = await Collection.getAllData();
  return data
}, undefined,
  { tags: ['foods'] }
)