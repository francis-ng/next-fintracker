import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname
});

export default eslintConfig([...nextCoreWebVitals, ...nextTypescript, ...compat.config({
    extends: ['next']
})]);