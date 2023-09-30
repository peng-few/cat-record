import { unstable_cache } from 'next/cache'
import { getFoods } from './getFoods';
import { getBrandPairs } from '@/brand/_firebase/getBrandPairs';

export const getFoodPairs = unstable_cache(async () => {
  const [foods, brandPairs] = await Promise.all([
    getFoods(), getBrandPairs()
  ])

  const foodPairs = foods.reduce((accu, food) => {
    accu[food.id] = brandPairs[food.brand]+food.name
    return accu
  }, {} as Record<number, string>)

  return foodPairs
},
  undefined,
  { tags: ['foods'] }
)