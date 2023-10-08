'use client'
import { createContext, useContext, ReactNode, useState } from 'react';

export const FocusedRowContext = createContext(null);
export const FocusedRowDispatchContext = createContext<any>(null);

export interface FocusedRowProvider{
  children: ReactNode
}

export function FocusedRowProvider({ children }: FocusedRowProvider) {
  const [focusedRow,setFocusedRow] = useState<any>(null)
  return (
    <FocusedRowContext.Provider value={focusedRow}>
      <FocusedRowDispatchContext.Provider value={setFocusedRow}>
        { children }
      </FocusedRowDispatchContext.Provider>
    </FocusedRowContext.Provider>
  )
}

export function useFocusedRow() {
  const focusedRow = useContext(FocusedRowContext);
  const setFocusedRow = useContext(FocusedRowDispatchContext);
  return { focusedRow, setFocusedRow };
}


export default FocusedRowProvider;