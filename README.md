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

- `src/theme.css` — the theme: semantic colour variables (light in `:root`, dark in `.dark`) mapped to Tailwind utilities.
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

## Theming (shadcn style)

Components never use hex values. They use semantic utilities such as `bg-primary`, `text-muted-foreground`
and `border-border`, which come from the variables in `src/theme.css`:

- Light values in `:root`, dark values in `.dark`. Add `class="dark"` to `<html>` for dark mode.
- `--radius` sets every corner: `rounded-sm`, `rounded-md` and `rounded-lg` follow it.

To restyle an app, override the variables in its own CSS, after the import:

    @import "@abbasnasser/ui/styles.css";

    :root {
      --primary: oklch(0.55 0.2 260);
      --radius: 0.25rem;
    }

To add a theme, define a new block of variables (for example `.theme-green { --primary: ...; }`) and put
that class on the element that should use it. Keep the same variable names, so every component still works.

## Style

The library uses the Cloudflare style. Use the scale and don't hard-code values:

- **Radius:** controls (buttons, inputs, selects) 4px, `rounded-md`. Cards, popovers and tables 6px, `rounded-lg`. Small chips 2px, `rounded-sm`. Large surfaces 8px, `rounded-xl`.
- **Borders:** 1px, `border-border` (10% alpha) for panels, `border-input` (18% alpha) for form fields. Cards are flat with a border and no shadow.
- **Shadows:** only on floating layers. `shadow-md` on menus, popovers and tooltips, `shadow-lg` on dialogs and sheets.
- **Control height:** 32px for inputs, selects and default buttons. 28px for `size="sm"` buttons.

## App launcher

`AppLauncher` is the workspace's app menu, the same as the Talabetak DMS launcher. It renders a grip button
that opens a panel with a "Find an app" search box, a grid of square app tiles (3 columns, 5 on larger
screens), and an optional row of create shortcuts. Apps marked `soon` show greyed out and cannot be opened.
Filter apps by permission before passing them in. Tile colours are the `--tone-*` theme variables.

    <AppLauncher
      apps={[{ key: "orders", label: "Orders", href: "/orders", tone: "blue", icon: <OrdersIcon /> }]}
      createActions={[{ key: "order", label: "New order", href: "/orders/new", tone: "blue", icon: <PlusIcon /> }]}
      LinkComponent={Link}
    />

## Data table

`DataTable` is built on TanStack Table, with every feature opt-in, so a plain list stays simple:

- sorting (client, or server through `server.onSortingChange`), client-side search, column show/hide
- row selection with select-all and an indeterminate header, plus a bulk-action bar
- pagination on the client (`pageSize`), or on the server (`server` with the total)
- loading skeleton, empty state, sticky header, row click, expandable rows, compact density

Columns are plain TanStack `ColumnDef` objects. Example:

    <DataTable
      columns={columns}
      data={orders}
      getRowId={(r) => r.id}
      searchable
      selectable
      columnVisibility
      renderExpanded={(order) => <OrderDetail order={order} />}
      bulkActions={(rows) => <Button size="sm">Export {rows.length}</Button>}
    />

Every feature is a prop you can turn off. Sorting is on by default (`sortable={false}` turns it off everywhere;
a column can opt out with `enableSorting: false`). Pagination is on by default (`pagination={false}` shows all rows).
Search, selection, column visibility, expansion and the empty and loading states are off until their prop is set.

Tested here: each main configuration renders on the server. Sorting, selection and expansion have not yet been
exercised in a browser.

## Releasing

Releases are automatic and use changesets.

1. When you change the library, run `npx changeset`, choose the bump (patch, minor or major), and describe the change. Commit the new file in `.changeset/`.
2. Merge to `main`. The Release workflow opens or updates a "Version packages" pull request.
3. Merge that pull request. The workflow bumps the version, writes the changelog and publishes to npm.

The workflow needs a repository secret named `NPM_TOKEN` (Settings → Secrets and variables → Actions).
