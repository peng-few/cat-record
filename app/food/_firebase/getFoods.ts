import { unstable_cache } from 'next/cache'
import { collection } from "../_firebase"

export const getFoods = unstable_cache(async () => {
  const data = await collection.getAllData();
  return data
}, undefined,
  { tags: ['foods'] }
)