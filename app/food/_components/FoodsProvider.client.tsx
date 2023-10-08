'use client'
import { ReactNode, createContext, useContext  } from 'react';
import { FoodEntity } from '../_consts/FoodEntitySchema';
import { type WithId } from 'mongodb';

export const FoodsContext = createContext<WithId<FoodEntity>[]|undefined>([]);

export function useFoods() {
  return useContext(FoodsContext)
}

export interface FoodsContextProviderProps{
  children: ReactNode,
  value?: WithId<FoodEntity>[]
}
export function FoodsContextProvider({ children,value }:FoodsContextProviderProps) {
  return (
    <FoodsContext.Provider value={value}>{children}</FoodsContext.Provider>
  )
  
}