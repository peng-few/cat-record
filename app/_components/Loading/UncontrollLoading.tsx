'use client'
import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import { LoadingProps,Loading } from './Loading';

export interface LoadingHandler {
  open: () => void;
  close: () => void;
}

export type UncontrollLoadingProps = Omit<LoadingProps, 'loading'>

export const useLoading = () => {
  const loadingRef = useRef<LoadingHandler>(null)

  return [loadingRef,loadingRef.current] as const
}

export const UncontrollLoading = forwardRef<LoadingHandler, UncontrollLoadingProps>(function UncontrollLoading(props, ref) {
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false)
  })
  )
  
  return (
    <Loading {...props} loading={open}></Loading>
  )
})

export default UncontrollLoading