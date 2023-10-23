'use client'
import { createContext, useContext, ReactNode, useState } from 'react';
import { Brand } from './_db/schema/BrandSchema'
import { WithStringId } from '@/_types';

export interface BrandEdit{
  brand?: WithStringId<Brand>;
  open: boolean;
}
export const BrandEditContext = createContext<BrandEdit>({open: false});
export const BrandEditDispatchContext = createContext<any>(null);

export interface BrandEditProvider{
  children: ReactNode
}

export function BrandEditProvider({ children }: BrandEditProvider) {
  const [brandEdit,setBrandEdit] = useState<any>({open: false})
  return (
    <BrandEditContext.Provider value={brandEdit}>
      <BrandEditDispatchContext.Provider value={setBrandEdit}>
        { children }
      </BrandEditDispatchContext.Provider>
    </BrandEditContext.Provider>
  )
}

export function useBrandEdit() {
  const brandEdit = useContext(BrandEditContext);
  const setBrandEdit = useContext(BrandEditDispatchContext);
  return { brandEdit, setBrandEdit };
}


export default BrandEditProvider;