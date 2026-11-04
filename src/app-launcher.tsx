"use client";
import * as React from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { SearchIcon } from "./icons";
import { cn } from "./utils";

/** Colour of an app's icon tile. Maps to the --tone-* variables in the theme. */
export type AppTone = "blue" | "red" | "orange" | "teal" | "purple" | "green" | "slate" | "pink";

export type LauncherApp = {
  key: string;
  label: string;
  href: string;
  /** Any node, for example an SVG icon. It is sized by the tile. */
  icon: React.ReactNode;
  tone?: AppTone;
  /** Greys the tile out and cannot be opened. */
  soon?: boolean;
};

export type LauncherCreateAction = LauncherApp;

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export interface AppLauncherProps {
  /** Apps in launcher order. Filter by permission before passing them in. */
  apps: LauncherApp[];
  /** "Create" shortcuts shown in a row under the grid. Hidden while searching. */
  createActions?: LauncherCreateAction[];
  /** Link element to render, for example Next.js's Link. */
  LinkComponent?: React.ComponentType<LinkProps>;
  /** Accessible label for the grip button that opens the launcher. */
  triggerLabel?: string;
  className?: string;
}

const TONE_BG: Record<AppTone, string> = {
  blue: "bg-tone-blue",
  red: "bg-tone-red",
  orange: "bg-tone-orange",
  teal: "bg-tone-teal",
  purple: "bg-tone-purple",
  green: "bg-tone-green",
  slate: "bg-tone-slate",
  pink: "bg-tone-pink",
};

/** The 3×3 grip icon that opens the launcher. */
function GripIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {[5, 12, 19].flatMap((y) => [5, 12, 19].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1" />))}
    </svg>
  );
}

/** A launcher tile: a coloured square with the icon, and the label under it. */
export function AppTile({
  label,
  icon,
  tone = "blue",
  soon,
  as: Comp,
  href,
  onNavigate,
}: {
  label: string;
  icon: React.ReactNode;
  tone?: AppTone;
  soon?: boolean;
  as: React.ComponentType<LinkProps>;
  href: string;
  onNavigate?: () => void;
}) {
  return (
    <Comp
      href={href}
      onClick={onNavigate}
      aria-disabled={soon || undefined}
      tabIndex={soon ? -1 : undefined}
      className={cn(
        "flex flex-col items-center gap-2 rounded px-2 py-3 text-center text-[13px] leading-tight text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
        soon && "pointer-events-none opacity-50",
      )}
    >
      <span className={cn("flex size-12 shrink-0 items-center justify-center rounded text-white shadow-sm [&>svg]:size-[22px]", TONE_BG[tone])}>
        {icon}
      </span>
      <span className="line-clamp-2">{label}</span>
    </Comp>
  );
}

/**
 * The app launcher: a grip button that opens a panel with a search box, a grid of app tiles and a row
 * of create shortcuts. Styled like the Microsoft 365 app menu. Apps marked `soon` show greyed out.
 */
export function AppLauncher({
  apps,
  createActions = [],
  LinkComponent = DefaultLink,
  triggerLabel = "Open app launcher",
  className,
}: AppLauncherProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const q = query.trim().toLowerCase();
  const filteredApps = q ? apps.filter((a) => a.label.toLowerCase().includes(q)) : apps;
  const shownCreate = q ? [] : createActions;
  const close = () => setOpen(false);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          aria-label={triggerLabel}
          aria-expanded={open}
          className={cn("size-10 rounded text-foreground hover:bg-muted", className)}
        >
          <GripIcon className="size-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={8}
        className="w-[min(94vw,600px)] rounded-lg p-0 shadow-xl"
      >
        <div className="px-5 pt-5 pb-4">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find an app"
              aria-label="Find an app"
              className="h-10 w-full rounded border-0 bg-muted ps-9 pe-3 text-[13px] focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <nav aria-label="Apps" className="px-5 pb-5">
          {filteredApps.length === 0 ? (
            <p className="py-8 text-center text-[13px] text-muted-foreground">No apps match “{query}”.</p>
          ) : (
            <ul className="grid grid-cols-3 gap-y-1 sm:grid-cols-5">
              {filteredApps.map((app) => (
                <li key={app.key}>
                  <AppTile
                    as={LinkComponent}
                    href={app.href}
                    label={app.label}
                    icon={app.icon}
                    tone={app.tone}
                    soon={app.soon}
                    onNavigate={close}
                  />
                </li>
              ))}
            </ul>
          )}
        </nav>

        {shownCreate.length > 0 && (
          <div className="border-t border-border px-5 py-4">
            <ul className="grid grid-cols-3 gap-y-1 sm:grid-cols-5">
              {shownCreate.map((action) => (
                <li key={action.key}>
                  <AppTile
                    as={LinkComponent}
                    href={action.href}
                    label={action.label}
                    icon={action.icon}
                    tone={action.tone}
                    onNavigate={close}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

const DefaultLink = React.forwardRef<HTMLAnchorElement, LinkProps>(function DefaultLink(props, ref) {
  return <a ref={ref} {...props} />;
});
