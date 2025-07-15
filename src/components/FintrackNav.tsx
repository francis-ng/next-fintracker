'use client'
import React from "react";
import Logo from "./logo";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { SignOut } from "../app/login/AuthButtons";

export default function FintrackNav({name}: {name: string}) {
  return (
    <Navbar maxWidth="full">
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit">FinTracker</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {name}
        { name && <SignOut /> }
      </NavbarContent>
    </Navbar>
  )
}