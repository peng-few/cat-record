'use client'
import { ReactNode, createContext, useContext  } from 'react';
import { Food } from '../_db/schema/FoodSchema';
import { WithStringId } from '@/_types';

export const FoodsContext = createContext<WithStringId<Food>[]|undefined>([]);

export function useFoods() {
  return useContext(FoodsContext)
}

export interface FoodsContextProviderProps{
  children: ReactNode,
  value?: WithStringId<Food>[]
}
export function FoodsContextProvider({ children,value }:FoodsContextProviderProps) {
  return (
    <FoodsContext.Provider value={value}>{children}</FoodsContext.Provider>
  )
  
}