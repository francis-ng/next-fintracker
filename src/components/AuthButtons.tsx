"use client";
import { Button } from "@nextui-org/react";
import { signIn, signOut, } from "next-auth/react";

export function SignIn() {
  return (
    <Button color='primary'
            onClick={() => signIn('github', {callbackUrl: 'http://localhost:3000/ledger/list'})}>
      Login
    </Button>
  )
}

export function SignOut() {
  return (
    <Button color="danger" variant="ghost" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}