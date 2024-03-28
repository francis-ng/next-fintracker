import React from "react";
import Logo from "./logo";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function Header() {
  return (
    <Navbar maxWidth="full">
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit">FinTracker</p>
      </NavbarBrand>
    </Navbar>
  )
}