"use client";
import { Button } from "@heroui/react";
import { signIn, signOut, } from "next-auth/react";

export function SignIn() {
  return (
    <Button color='primary'
            onPress={() => signIn('github', {callbackUrl: 'http://localhost:3000/ledger/list'})}>
      Sign in with Github
    </Button>
  )
}

export function SignOut() {
  return (
    <Button color="danger" variant="ghost" onPress={() => signOut()}>
      Sign Out
    </Button>
  );
}