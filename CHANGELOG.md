# @abbasnasser/ui

## 0.2.0

### Minor Changes

- 9cf1ac6: Add the remaining shadcn-equivalent components: Accordion, Alert, AlertDialog, AspectRatio, Avatar, Calendar, Carousel, Chart, Combobox, Command, ContextMenu, Drawer, Form, HoverCard, InputGroup, InputOTP, Item, Kbd, Menubar, NavigationMenu, Progress, ResizablePanels, ScrollArea, Separator, Sheet, Skeleton, Sonner (Toaster), Spinner, Textarea, Toggle, ToggleGroup, and DirectionProvider.
- b82e180: Switch the library to the Cloudflare style: 4px radius on controls, 6px on cards and overlays, flat cards with a border and no shadow, shadows only on floating layers, and 32px control height. Replaces the soft style.
- 4adaf2b: AppLauncher now matches the Talabetak DMS launcher: a grip button that opens a panel with a search box, a grid of square tiles and a row of create shortcuts. Removed the `title`, `currentKey` and tile `description` props.
- 614eff0: Apply the soft style across the library: 8px radius on controls, 12px on cards and overlays, `shadow-sm` on cards, and 36px control height for inputs and selects. Bare `rounded` classes are normalised to the radius scale.
- 2150fa9: Restyle tables to match the reference: a lighter header band with medium-weight column titles, taller rows with 16px cell padding, and a sortable header that shows up and down arrows. Adds a customers-table example to the showcase.

### Patch Changes

- 6c906b5: Loosen the React peer range to `^19.0.0`, so apps on React 19.0 to 19.2 install without `--legacy-peer-deps`.

## 0.1.1

### Patch Changes

- 84a3ddd: First release: tokens and theme, Button, form controls, overlays, menus, tables, Sidebar, AppLauncher and DataTable.
