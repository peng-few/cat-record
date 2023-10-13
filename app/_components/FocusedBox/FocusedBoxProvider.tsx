'use client'
import { createContext, useContext, ReactNode, useState } from 'react';

export const FocusedBoxContext = createContext(null);
export const FocusedBoxDispatchContext = createContext<any>(null);

export interface FocusedBoxProvider{
  children: ReactNode
}

export function FocusedBoxProvider({ children }: FocusedBoxProvider) {
  const [focusedBox,setFocusedBox] = useState<any>(null)
  return (
    <FocusedBoxContext.Provider value={focusedBox}>
      <FocusedBoxDispatchContext.Provider value={setFocusedBox}>
        { children }
      </FocusedBoxDispatchContext.Provider>
    </FocusedBoxContext.Provider>
  )
}

export function useFocusedBox() {
  const focusedBox = useContext(FocusedBoxContext);
  const setFocusedBox = useContext(FocusedBoxDispatchContext);
  return { focusedBox, setFocusedBox };
}


export default FocusedBoxProvider;