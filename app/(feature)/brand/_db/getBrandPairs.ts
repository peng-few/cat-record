import { unstable_cache } from 'next/cache'
import { getBrands } from './getBrands';
import { Brand } from './schema/BrandSchema';

export const getBrandPairs = unstable_cache(async () => {
  const brands = await getBrands();

  const brandPairs = brands.reduce((accu, brand) => {
    accu[brand._id] = brand
    return accu
  }, {} as Record<string, Brand>)

  return brandPairs
},
  undefined,
  { tags: ['brands'] }
)