'use client'
import Logo from "./logo";
import { SignOut } from "../app/login/AuthButtons";
import { Activity } from "react";

export default function FintrackNav({session}) {
  return (
    <nav className="flex w-full px-4">
      <div>
        <Logo />
        <p className="font-bold text-inherit">FinTracker</p>
      </div>
      <div className="grow"></div>
      <div className="self-center justify-end">
        <Activity mode={session?.data? 'visible' : 'hidden'}>
          {session?.data?.user?.name}
          <SignOut />
        </Activity>
      </div>
    </nav>
  )
}
