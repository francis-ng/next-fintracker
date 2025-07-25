import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname
});

export default eslintConfig([
    ...compat.config({
        extends: ['next/core-web-vitals', 'next/typescript', 'next'],
    })
]);