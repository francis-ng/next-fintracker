import { createSerwistRoute } from "@serwist/turbopack";

// Serves the service worker (and its source map) at /serwist/sw.js.
// The worker source is bundled with esbuild and served from memory;
// no file is written to public/.
export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute({
    swSrc: "src/app/sw.ts",
  });
