import { unstable_cache } from 'next/cache'
import { getBrands } from './getBrands';

export const getBrandPairs = unstable_cache(async () => {
  const brands = await getBrands();
  const brandPairs = brands.reduce((accu, brand) => {
    accu[brand.id] = brand.name
    return accu
  }, {} as Record<string, string>)

  return brandPairs
},
  undefined,
  { tags: ['brands'] }
)