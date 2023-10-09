import { ReactNode, } from 'react';
import { BrandsContextProvider } from './BrandsContext';
import { getBrands } from '../_db/getBrands';

export interface FoodEditProvider{
  children: ReactNode,
}

export async function BrandsProvider({ children }: FoodEditProvider) {
  const brands = await getBrands()
  return (
    <BrandsContextProvider value={brands}>
      {children}
    </BrandsContextProvider>
  )
}

export default BrandsProvider
