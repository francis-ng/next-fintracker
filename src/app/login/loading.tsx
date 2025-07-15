'use client'
import {CircularProgress} from "@heroui/react";

function loadingLogin() {
  return (
    <div className="w-full h-screen content-center justify-center align-middle">
      <CircularProgress classNames={{
          svg: 'w-1/2 h-1/2 mx-auto',
          base: 'mx-auto'
        }}
        size="lg" aria-label="Loading..." />
    </div>
  )
}

export default loadingLogin;