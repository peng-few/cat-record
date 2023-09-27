'use client'
import { ReactNode, createContext, useContext  } from 'react';
import { FieldBrand } from '../_firebase';

export const BrandsContext = createContext<FieldBrand[]|undefined>([]);

export function useBrands() {
  return useContext(BrandsContext)
}

export interface BrandsContextProviderProps{
  children: ReactNode,
  value?: FieldBrand[]
}
export function BrandsContextProvider({ children,value }:BrandsContextProviderProps) {
  return (
    <BrandsContext.Provider value={value}>{children}</BrandsContext.Provider>
  )
  
}