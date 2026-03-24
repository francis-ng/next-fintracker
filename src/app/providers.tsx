'use client'

import { useRouter } from "next/navigation"
import { Toast } from "@heroui/react"

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
  }
}

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <>
      <Toast.Provider placement='top' />
      {children}
    </>
  )
}