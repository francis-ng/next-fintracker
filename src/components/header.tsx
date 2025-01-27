import React from "react";
import Logo from "./logo";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { auth } from "@/auth";
import { SignOut } from "../app/login/AuthButtons";

export default async function Header() {
  const session = await auth();

  return (
    <Navbar maxWidth="full">
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit">FinTracker</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {session?.user?.name}
        { session && <SignOut /> }
      </NavbarContent>
    </Navbar>
  )
}