"use client";
import * as React from "react";
import { cn } from "../utils";

/**
 * A sidebar with apps, and each app's pages in a tree under it. Expanded, it takes its width and pushes the
 * content. Collapsed, it becomes an icon rail; the full list opens over the content while the mouse is on it,
 * after a tap, or when a key focuses it. Ctrl/Cmd+B toggles it. Timings follow the Cloudflare reference:
 * 250ms, and the close curve is the open curve played backwards.
 */

export type SidebarPage = {
  key: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  /** False shows the page greyed out with a "Soon" badge, and it cannot be opened. */
  ready?: boolean;
  /** Pages with the same group share a block (no title is shown). */
  group?: string;
};

export type SidebarApp = {
  key: string;
  label: string;
  href: string;
  /** Optional. Without one, the app's first letter stands in for it in the rail and the list. */
  icon?: React.ReactNode;
  /** Apps with the same group share a block, separated by a divider. */
  group?: string;
  /** Pages of this app. An app with none is not opened as a list. */
  pages?: SidebarPage[];
  /** True greys the app out with a "Soon" badge. */
  soon?: boolean;
  /** Pixel nudge that centres an icon whose glyph sits off-centre in its box. Measure, then set. */
  iconOffset?: number;
};

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type SidebarProps = {
  apps: SidebarApp[];
  /** The current path, for marking the open page. */
  activePath: string;
  /** The app the current page belongs to. Its list opens on its own. */
  activeAppKey?: string;
  collapsed: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Called after a link is followed, so a host can close a drawer. */
  onNavigate?: () => void;
  /** The link element to render, for example Next.js's Link. Defaults to a plain anchor. */
  LinkComponent?: React.ComponentType<LinkProps>;
  /** Shown above the apps, in the expanded sidebar. */
  header?: React.ReactNode;
  /** Shown below the apps, in the expanded sidebar. */
  footer?: React.ReactNode;
  /** Ctrl/Cmd+B toggles collapse. On by default. */
  shortcut?: boolean;
  /** Draws the vertical line that joins an app to its pages. On by default; off gives a flat, indented list. */
  tree?: boolean;
  className?: string;
};

const EASE_OPEN = "ease-[cubic-bezier(0.77,0,0.175,1)]";
const EASE_CLOSE = "ease-[cubic-bezier(0.825,0,0.23,1)]";

export function Sidebar({
  apps,
  activePath,
  activeAppKey,
  collapsed,
  onCollapsedChange,
  onNavigate,
  LinkComponent = DefaultLink,
  header,
  footer,
  shortcut = true,
  tree = true,
  className,
}: SidebarProps) {
  const [peek, setPeek] = React.useState(false);
  const railRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<number | undefined>(undefined);

  const openPeek = React.useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setPeek(true);
  }, []);
  const closePeekSoon = React.useCallback(() => {
    window.clearTimeout(closeTimer.current);
    // The overlay starts closing about 80ms after the pointer leaves.
    closeTimer.current = window.setTimeout(() => setPeek(false), 80);
  }, []);
  React.useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // While the list is open over the rail: a click outside it, or Escape, closes it.
  React.useEffect(() => {
    if (!peek) return;
    function onPointerDown(e: PointerEvent) {
      if (railRef.current && !railRef.current.contains(e.target as Node)) setPeek(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setPeek(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [peek]);

  // Ctrl/Cmd+B. Some synthetic key events (autofill, extensions) arrive without a key name.
  React.useEffect(() => {
    if (!shortcut || !onCollapsedChange) return;
    function onKey(e: KeyboardEvent) {
      if (typeof e.key === "string" && e.key.toLowerCase() === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPeek(false);
        onCollapsedChange?.(!collapsed);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut, collapsed, onCollapsedChange]);

  const showRail = collapsed && !peek;

  return (
    <div
      ref={railRef}
      className={cn(
        "relative h-full shrink-0 transition-[width] duration-[250ms] motion-reduce:transition-none",
        EASE_OPEN,
        // Measured on Cloudflare: a 56px icon rail, and a 259px list when open.
        collapsed ? "w-14" : "w-[259px]",
        className,
      )}
      onPointerEnter={(e) => {
        if (collapsed && e.pointerType === "mouse") openPeek();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") closePeekSoon();
      }}
      onFocus={() => {
        if (collapsed) setPeek(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPeek(false);
      }}
      onClick={() => {
        if (collapsed) setPeek(true);
      }}
    >
      {/* One element: collapsed it is 56px wide; while open over the page it widens in place, so the content
          does not move. */}
      <aside
        aria-label="Sidebar"
        className={cn(
          "absolute inset-y-0 start-0 z-40 flex h-full flex-col overflow-hidden border-e border-sidebar-border bg-sidebar transition-[width] duration-[250ms]",
          collapsed && !peek ? EASE_CLOSE : EASE_OPEN,
          collapsed && peek ? "w-[259px]" : "w-full",
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-2">
          {header && !showRail ? <div>{header}</div> : null}
          <SidebarNav
            apps={apps}
            activePath={activePath}
            activeAppKey={activeAppKey}
            collapsed={showRail}
            LinkComponent={LinkComponent}
            tree={tree}
            onNavigate={() => {
              setPeek(false);
              onNavigate?.();
            }}
          />
          {footer && !showRail ? <div className="mt-auto">{footer}</div> : null}
        </div>
      </aside>
    </div>
  );
}

function DefaultLink({ href, ...props }: LinkProps) {
  return <a href={href} {...props} />;
}

// Metrics from the reference: 32px rows, 13px text, selected fill #f3f3f3.
const itemBase =
  "flex items-center gap-2 overflow-hidden rounded-lg text-left text-[13px] font-normal text-sidebar-foreground h-[34px]";
const collapsedItem = "min-w-0 flex-1 justify-center px-0 gap-0";
const appBase =
  "flex items-center gap-3 overflow-hidden rounded-lg ps-3 pe-2 text-left text-[13px] font-medium text-sidebar-foreground h-[34px]";
const activeClasses = "bg-sidebar-accent font-medium";
const soonClasses = "text-muted-foreground cursor-default";

type LinkComponentType = React.ComponentType<LinkProps>;

function SidebarNav({
  apps,
  activePath,
  activeAppKey,
  collapsed,
  LinkComponent,
  tree,
  onNavigate,
}: {
  apps: SidebarApp[];
  activePath: string;
  activeAppKey?: string;
  collapsed: boolean;
  LinkComponent: LinkComponentType;
  tree: boolean;
  onNavigate: () => void;
}) {
  const [openKeys, setOpenKeys] = React.useState<string[]>(() => (activeAppKey ? [activeAppKey] : []));

  // When the page moves into another app, that app's list opens. Adjusted during render, not in an effect.
  const [seenActiveKey, setSeenActiveKey] = React.useState(activeAppKey);
  if (activeAppKey !== seenActiveKey) {
    setSeenActiveKey(activeAppKey);
    if (activeAppKey) setOpenKeys([activeAppKey]);
  }

  // One app's list is open at a time.
  const open = (key: string) => setOpenKeys([key]);
  const toggle = (key: string) => setOpenKeys((keys) => (keys.includes(key) ? [] : [key]));

  return (
    <nav aria-label="Apps" className="flex flex-col">
      {groupBy(apps).map(([group, items], index) => (
        <div
          key={group}
          className={cn(
            index > 0 && "transition-[margin-top] duration-[250ms] motion-reduce:transition-none",
            index > 0 && (collapsed ? "ease-[cubic-bezier(0.8,0,0.6,1)]" : "ease-[cubic-bezier(0.4,0,0.2,1)]"),
            // Expanded gaps are 15px larger than collapsed ones, as on the reference.
            index > 0 && (collapsed ? "mt-3" : "mt-[27px]"),
          )}
        >
          <ul className="space-y-1">
            {items.map((app) => (
              <AppRow
                key={app.key}
                app={app}
                active={app.key === activeAppKey}
                open={openKeys.includes(app.key)}
                activePath={activePath}
                collapsed={collapsed}
                LinkComponent={LinkComponent}
                tree={tree}
                onOpen={() => open(app.key)}
                onToggle={() => toggle(app.key)}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function AppRow({
  app,
  active,
  open,
  activePath,
  collapsed,
  LinkComponent,
  tree,
  onOpen,
  onToggle,
  onNavigate,
}: {
  app: SidebarApp;
  active: boolean;
  open: boolean;
  activePath: string;
  collapsed: boolean;
  LinkComponent: LinkComponentType;
  tree: boolean;
  onOpen: () => void;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const pages = app.pages ?? [];
  const hasPages = pages.length > 0 && !app.soon;
  const label = app.soon ? `${app.label} (soon)` : app.label;

  return (
    <li>
      <div
        className={cn(
          "flex items-center rounded-lg transition-[width] duration-[250ms] motion-reduce:transition-none",
          collapsed ? "w-[34px] ease-[cubic-bezier(0.8,0,0.6,1)]" : "w-full ease-[cubic-bezier(0.4,0,0.2,1)]",
        )}
      >
        <LinkComponent
          href={app.href}
          onClick={() => {
            onOpen();
            onNavigate();
          }}
          aria-current={active ? "page" : undefined}
          aria-label={collapsed ? label : undefined}
          className={cn(
            appBase,
            "min-w-0 flex-1 transition-[padding] duration-[250ms] motion-reduce:transition-none",
            collapsed ? "ps-[9px] pe-0 ease-[cubic-bezier(0.8,0,0.6,1)]" : "ps-3 pe-2 ease-[cubic-bezier(0.4,0,0.2,1)]",
            app.soon ? soonClasses : "",
          )}
        >
          <span className="flex items-center gap-3">
            <span
              style={{ translate: `${app.iconOffset ?? 0}px 0` }}
              className="flex h-5 w-4 shrink-0 items-center justify-center text-[14px] leading-none text-sidebar-foreground/75 [&>*]:!size-[14px] [&>*]:!text-[14px] [&>*]:!leading-none"
            >
              {app.icon ?? <span className="text-[12px] leading-none font-semibold uppercase">{app.label.charAt(0)}</span>}
            </span>
            <span
              className={cn(
                "truncate transition-[opacity,max-width,translate] duration-[250ms] motion-reduce:transition-none",
                collapsed ? "ease-[cubic-bezier(0.8,0,0.6,1)]" : "ease-[cubic-bezier(0.4,0,0.2,1)]",
                collapsed ? "max-w-0 -translate-x-[3px] opacity-0" : "max-w-[200px] translate-x-0",
              )}
            >
              {app.label}
            </span>
            {app.soon && (
              <span
                className={cn(
                  "ms-auto overflow-hidden rounded bg-muted text-[11px] font-medium whitespace-nowrap text-sidebar-foreground transition-[opacity,max-width,padding] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none",
                  collapsed ? "max-w-0 px-0 opacity-0" : "max-w-[80px] px-1.5 py-0.5",
                )}
              >
                Soon
              </span>
            )}
          </span>
          {/* Screen readers get the label when the text is hidden in the rail. */}
          {collapsed && <span className="sr-only">{label}</span>}
        </LinkComponent>
        {hasPages && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-label={`${open ? "Collapse" : "Expand"} ${app.label}`}
            tabIndex={collapsed ? -1 : undefined}
            className={cn(
              "flex h-8 shrink-0 items-center justify-center overflow-hidden rounded text-muted-foreground transition-[width,opacity] duration-200 ease-out hover:text-sidebar-foreground motion-reduce:transition-none",
              collapsed ? "w-0 opacity-0" : "w-8",
            )}
          >
            <Chevron open={open} hidden={collapsed} />
          </button>
        )}
      </div>
      {hasPages && (
        <AppPages
          pages={pages}
          activePath={activePath}
          open={open && !collapsed}
          collapsed={collapsed}
          LinkComponent={LinkComponent}
          tree={tree}
          onNavigate={onNavigate}
        />
      )}
    </li>
  );
}

/** A chevron that turns to point down when the app's pages are open. Drawn with CSS, not an icon font. */
function Chevron({ open, hidden }: { open: boolean; hidden: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 10 10"
      width={10}
      height={10}
      className={cn(
        "transition-[rotate,translate] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none",
        open && "rotate-90",
        hidden && "translate-x-[10px]",
      )}
    >
      <path d="M3 1.5 7 5 3 8.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function AppPages({
  pages,
  activePath,
  open,
  collapsed,
  LinkComponent,
  tree,
  onNavigate,
}: {
  pages: SidebarPage[];
  activePath: string;
  open: boolean;
  collapsed: boolean;
  LinkComponent: LinkComponentType;
  tree: boolean;
  onNavigate: () => void;
}) {
  // Opening and closing animate the list's height (250ms). Closed lists are inert, so they cannot be focused.
  return (
    <div
      inert={!open}
      className={cn(
        "grid transition-[grid-template-rows] duration-[250ms] motion-reduce:transition-none",
        open ? `grid-rows-[1fr] ${EASE_OPEN}` : `grid-rows-[0fr] ${EASE_CLOSE}`,
      )}
    >
      <div className="min-h-0 overflow-hidden">
        {/* With the tree on, the line runs down from the app icon; with it off, the pages are just indented. */}
        <div className="relative ms-5 mt-1">
          <ul>
            {pages.map((page, index) => (
              <PageLink
                key={page.key}
                page={page}
                active={activePath === page.href}
                open={open}
                index={index}
                total={pages.length}
                last={index === pages.length - 1}
                collapsed={collapsed}
                LinkComponent={LinkComponent}
                tree={tree}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PageLink({
  page,
  active,
  open,
  index,
  total,
  last,
  collapsed,
  LinkComponent,
  tree,
  onNavigate,
}: {
  page: SidebarPage;
  active: boolean;
  open: boolean;
  index: number;
  total: number;
  last: boolean;
  collapsed: boolean;
  LinkComponent: LinkComponentType;
  tree: boolean;
  onNavigate: () => void;
}) {
  // Tree line: one vertical line down the left, from the app icon to the last page.
  const treeItem = tree
    ? cn(
        "relative ps-[9px] pe-[5px] py-px before:absolute before:start-0 before:top-0 before:border-s before:border-sidebar-border before:content-['']",
        last ? "before:h-1/2" : "before:h-full",
      )
    : "py-px";
  const ready = page.ready !== false;
  // Closing is the opening played backwards: the stagger runs from the last page to the first.
  const base = cn(
    itemBase,
    collapsed ? collapsedItem : "ps-3 pe-2 w-full",
    "transition-[opacity,translate] duration-300 motion-reduce:transition-none",
    open ? "translate-y-0 opacity-100 ease-out" : "translate-y-1 opacity-0 ease-[cubic-bezier(0.8,0,1,1)]",
    !ready && "cursor-default text-muted-foreground",
  );
  const stagger = { transitionDelay: `${(open ? index : total - 1 - index) * 50}ms` };
  const body = (
    <>
      {!collapsed && <span className="truncate">{page.label}</span>}
      {!collapsed && !ready && (
        <span className="ms-auto rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium whitespace-nowrap text-sidebar-foreground">
          Soon
        </span>
      )}
      {collapsed && <span className="sr-only">{page.label}</span>}
    </>
  );

  if (!ready) {
    return (
      <li className={collapsed ? undefined : treeItem}>
        <span aria-disabled="true" style={stagger} className={base}>
          {page.icon && collapsed ? page.icon : null}
          {body}
        </span>
      </li>
    );
  }

  return (
    <li className={collapsed ? undefined : treeItem}>
      <LinkComponent
        href={page.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        style={stagger}
        className={cn(base, active && activeClasses)}
      >
        {page.icon && collapsed ? page.icon : null}
        {body}
      </LinkComponent>
    </li>
  );
}

/** Items grouped under their `group` value, in the order each group first appears. */
function groupBy<T extends { group?: string }>(items: T[]): [string, T[]][] {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const key = item.group ?? "";
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.entries()];
}
