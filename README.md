# @abbasnasser/ui

Shared component library for our apps. Cloudflare-style density and tokens, built on Radix primitives
(the same base as the shadcn code in our apps).

## Use in an app

Apps must also scan the library's classes, because Tailwind v4 skips node_modules:

    @source "../node_modules/@abbasnasser/ui/dist/**/*.js";

    npm install @abbasnasser/ui

In the app's global CSS (Tailwind v4):

    @import "@abbasnasser/ui/styles.css";

Then:

    import { Button } from "@abbasnasser/ui";

## Start a new app

    npx @abbasnasser/ui ui-init src/app/globals.css

This adds the two Tailwind lines below to the global stylesheet. Run it once per app.

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

## Sidebar

`Sidebar` is the Talabetak staff sidebar made generic: apps with pages in a tree, a 56px icon rail that opens
over the content, and Ctrl/Cmd+B to collapse. It takes plain data, so it has no router or permission code:

    <Sidebar
      apps={[{ key: "orders", label: "Orders", href: "/orders", icon: <OrdersIcon />,
               pages: [{ key: "list", label: "All orders", href: "/orders/list" }] }]}
      activePath={pathname}
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
      LinkComponent={Link} // for example Next.js's Link
    />

Everything beyond `key`, `label` and `href` is optional:

- `icon` on an app or page. Without an app icon, its first letter stands in for it in the rail.
- `pages`. An app with none is a plain link.
- `tree` on `Sidebar`. On by default, it draws the line that joins an app to its pages. Off gives a flat list, indented under the app.
- `soon` and `ready: false` grey out an app or page with a "Soon" badge.

Colours come from the `--ui-sidebar-*` tokens. Icons must be centred in their box; set `iconOffset` in pixels
for any icon whose glyph sits off-centre. The chevron is drawn with SVG, so the library needs no icon font.
