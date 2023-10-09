'use client'
import { ReactNode, createContext, useContext  } from 'react';
import { Brand } from '../_consts/BrandSchema';
import { WithStringId } from '@/_types';

export const BrandsContext = createContext<WithStringId<Brand>[]|undefined>([]);

export function useBrands() {
  return useContext(BrandsContext)
}

export interface BrandsContextProviderProps{
  children: ReactNode,
  value?: WithStringId<Brand>[]
}
export function BrandsContextProvider({ children,value }:BrandsContextProviderProps) {
  return (
    <BrandsContext.Provider value={value}>{children}</BrandsContext.Provider>
  )
  
}