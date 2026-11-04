import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

/** Colour of an app's icon tile. Maps to the --tone-* variables in the theme. */
export type AppTone = "blue" | "red" | "orange" | "teal" | "purple" | "green" | "slate" | "pink";

export type LauncherApp = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  tone?: AppTone;
  /** A line under the label, for example what the app is for. */
  description?: string;
  /** Greys the tile out with a "Soon" badge; it cannot be opened. */
  soon?: boolean;
};

export type LauncherCreateAction = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  tone?: AppTone;
};

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export interface AppLauncherProps extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "title"> {
  apps: LauncherApp[];
  /** Quick "create" shortcuts shown in a bar above the grid. */
  createActions?: LauncherCreateAction[];
  /** The key of the app the user is in, marked as current. */
  currentKey?: string;
  /** Link element to render, for example Next.js's Link. */
  LinkComponent?: React.ComponentType<LinkProps>;
  /** Heading above the grid, for example "Apps". */
  title?: React.ReactNode;
}

const tileVariants = cva(
  "flex size-10 shrink-0 items-center justify-center rounded-lg text-white [&>*]:!size-[18px] [&>*]:!text-[18px]",
  {
    variants: {
      tone: {
        blue: "bg-tone-blue",
        red: "bg-tone-red",
        orange: "bg-tone-orange",
        teal: "bg-tone-teal",
        purple: "bg-tone-purple",
        green: "bg-tone-green",
        slate: "bg-tone-slate",
        pink: "bg-tone-pink",
      },
    },
    defaultVariants: { tone: "blue" },
  },
);

export interface AppTileProps extends VariantProps<typeof tileVariants> {
  label: string;
  icon: React.ReactNode;
}

/** The coloured icon square used by the launcher. */
export function AppTile({ icon, tone, className }: AppTileProps & { className?: string }) {
  return <span aria-hidden className={cn(tileVariants({ tone }), className)}>{icon}</span>;
}

/**
 * The app launcher: a grid of app tiles, each a link with a coloured icon, a label and an optional
 * description. Apps that are not built yet show a "Soon" badge and cannot be opened. An optional bar of
 * create shortcuts sits above the grid.
 */
export function AppLauncher({
  apps,
  createActions,
  currentKey,
  LinkComponent = DefaultLink,
  title,
  className,
  ...props
}: AppLauncherProps) {
  return (
    <section className={cn("flex flex-col gap-5", className)} {...props}>
      {title ? <h2 className="text-[15px] font-semibold text-foreground">{title}</h2> : null}

      {createActions && createActions.length > 0 ? (
        <nav aria-label="Create" className="flex flex-wrap gap-2">
          {createActions.map((action) => (
            <LinkComponent
              key={action.key}
              href={action.href}
              className="inline-flex h-8 items-center gap-2 rounded-full border border-input bg-background ps-1.5 pe-3 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
            >
              <AppTile icon={action.icon} tone={action.tone} className="size-6 rounded-full [&>*]:!size-[12px] [&>*]:!text-[12px]" label={action.label} />
              {action.label}
            </LinkComponent>
          ))}
        </nav>
      ) : null}

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2">
        {apps.map((app) => {
          const current = app.key === currentKey;
          const body = (
            <>
              <AppTile icon={app.icon} tone={app.tone} label={app.label} />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex items-center gap-2">
                  <span className="truncate text-[13px] font-medium text-foreground">{app.label}</span>
                  {app.soon ? (
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">Soon</span>
                  ) : null}
                </span>
                {app.description ? (
                  <span className="truncate text-[12px] text-muted-foreground">{app.description}</span>
                ) : null}
              </span>
            </>
          );
          const base =
            "flex items-center gap-3 rounded-lg border p-3 transition-colors";
          return (
            <li key={app.key}>
              {app.soon ? (
                <div aria-disabled="true" className={cn(base, "cursor-default border-border opacity-60")}>
                  {body}
                </div>
              ) : (
                <LinkComponent
                  href={app.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    base,
                    "border-border hover:border-input hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/40 outline-none",
                    current && "border-primary bg-primary/5",
                  )}
                >
                  {body}
                </LinkComponent>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function DefaultLink({ href, ...props }: LinkProps) {
  return <a href={href} {...props} />;
}
