# @your-scope/ui

Shared component library for our apps. Cloudflare-style density and tokens, built on Radix primitives
(the same base as the shadcn code in our apps).

## Use in an app

    npm install @your-scope/ui

In the app's global CSS (Tailwind v4):

    @import "@your-scope/ui/styles.css";

Then:

    import { Button } from "@your-scope/ui";

## Layout

- `src/tokens.css` — colour, line and radius tokens (`--ui-*`).
- `src/utils.ts` — `cn()` class merging.
- `src/button.tsx` — `Button` with `primary`, `secondary`, `ghost`, `destructive` variants.

## Rules

- Components take their colours from `--ui-*` tokens, never hard-coded brand colours.
- Every component works on its own in every app; app-specific logic stays in the app.
- Add a component only when two apps need it, or it is clearly reusable.

## Status

Version 0.1.0. Private; not published yet. The package scope is a placeholder until the npm scope is chosen.
