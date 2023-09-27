import { ReactNode, } from 'react';
import { FoodsContextProvider } from './FoodsContext';
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
