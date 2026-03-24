"use client";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { createAuthClient } from "better-auth/react";

export function SignIn() {
  const authClient = createAuthClient();

  return (
    <Button variant='primary' className="w-full"
      onPress={async () => await authClient.signIn.social({ provider: 'github' })}>
        <Icon icon="mdi:github" />
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
