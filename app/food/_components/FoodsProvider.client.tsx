'use client'
import { ReactNode, createContext, useContext  } from 'react';
import { FieldFood } from '../_firebase';

export const FoodsContext = createContext<FieldFood[]|undefined>([]);

export function useFoods() {
  return useContext(FoodsContext)
}

export interface FoodsContextProviderProps{
  children: ReactNode,
  value?: FieldFood[]
}
export function FoodsContextProvider({ children,value }:FoodsContextProviderProps) {
  return (
    <FoodsContext.Provider value={value}>{children}</FoodsContext.Provider>
  )
  
}