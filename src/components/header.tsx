import React from "react";
import { auth } from "@/auth";
import FintrackNav from "./FintrackNav";

export default async function Header() {
  const session = await auth();

  return (
    <FintrackNav name={session?.user?.name} />
  )
}