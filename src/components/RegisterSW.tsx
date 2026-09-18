"use client";

import { SerwistProvider } from "@serwist/turbopack/react";
import type { ReactNode } from "react";

/**
 * Registers the Serwist service worker (served from /serwist/sw.js by the
 * route handler in src/app/serwist/[path]/route.ts) and caches visited
 * routes for offline use.
 *
 * Disabled in development so the dev server is never intercepted by the
 * worker and to avoid stale-worker noise while iterating.
 */
export default function RegisterSW({ children }: { children: ReactNode }) {
  return (
    <SerwistProvider
      swUrl="/serwist/sw.js"
      disable={process.env.NODE_ENV !== "production"}
    >
      {children}
    </SerwistProvider>
  );
}
