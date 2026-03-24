'use client'
import {ProgressCircle} from "@heroui/react";

function loadingLogin() {
  return (
    <div className="w-full h-screen content-center justify-center align-middle">
      <ProgressCircle aria-label="Loading" size="lg">
        <ProgressCircle.Track className="w-1/2 h-1/2 mx-auto">
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
    </div>
  )
}

export default loadingLogin;