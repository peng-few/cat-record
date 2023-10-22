import { unstable_cache } from 'next/cache'
import { getFoods } from './getFoods';
import { getBrandPairs } from '@/(feature)/brand/_db/getBrandPairs';

export const getFoodPairs = unstable_cache(async () => {
  const [foods, brandPairs] = await Promise.all([
    getFoods(), getBrandPairs()
  ])

  const foodPairs = foods.reduce((accu, food) => {
    accu[food._id] = brandPairs[food.brand]+food.name
    return accu
  }, {} as Record<string, string>)

  return foodPairs
},
  undefined,
  { tags: ['foods'] }
)