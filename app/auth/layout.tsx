import { ReactNode } from "react";
import SessionProvider from "./_components/SessionProvider";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}