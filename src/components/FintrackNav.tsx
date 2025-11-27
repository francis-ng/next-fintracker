'use client'
import Logo from "./logo";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { SignOut } from "../app/login/AuthButtons";
import { Activity } from "react";

export default function FintrackNav({session}) {
  return (
    <Navbar maxWidth="full">
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit">FinTracker</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <Activity mode={session?.data? 'visible' : 'hidden'}>
          {session?.data?.user?.name}
          <SignOut />
        </Activity>
      </NavbarContent>
    </Navbar>
  )
}
