"use client";
import { Button } from "@heroui/react";
import { createAuthClient } from "better-auth/react";

export function SignIn() {
  const authClient = createAuthClient();

  return (
    <Button variant='primary'
      onPress={async () => await authClient.signIn.social({ provider: 'github' })}>
      Sign in with Github
    </Button>
  )
}

export function SignOut() {
  const authClient = createAuthClient();

  return (
    <Button variant="danger-soft" onPress={async () => await authClient.signOut()}>
      Sign Out
    </Button>
  );
}
