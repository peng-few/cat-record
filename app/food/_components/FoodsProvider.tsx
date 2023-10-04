import { ReactNode, } from 'react';
import { FoodsContextProvider } from './FoodsProvider.client';
import { getFoods } from '../_firebase/getFoods';

export interface FoodEditProvider{
  children: ReactNode,
}

export async function FoodsProvider({ children }: FoodEditProvider) {
  const brands = await getFoods()
  return (
    <FoodsContextProvider value={brands}>
      {children}
    </FoodsContextProvider>
  )
}

export default FoodsProvider
