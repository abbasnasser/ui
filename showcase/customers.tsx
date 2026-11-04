import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Avatar, AvatarFallback, Badge, Button, Card, CardHeader, CardTitle, DataTable, Progress, Tooltip,
  TooltipContent, TooltipTrigger,
} from "../src";

type Customer = {
  id: string;
  name: string;
  handle: string;
  initials: string;
  tone: string;
  last4: string;
  info?: boolean;
  categories: { label: string; tone: string }[];
  clickthrough: number;
};

const CUSTOMERS: Customer[] = [
  { id: "1", name: "Alice Smith", handle: "@alicesmith", initials: "AS", tone: "bg-tone-orange", last4: "18", categories: [{ label: "Arts", tone: "blue" }, { label: "Business", tone: "orange" }, { label: "Travel", tone: "red" }], clickthrough: 45 },
  { id: "2", name: "Bob Johnson", handle: "@bobjohnson", initials: "BJ", tone: "bg-tone-slate", last4: "99", info: true, categories: [{ label: "Books", tone: "blue" }, { label: "Computers", tone: "blue" }], clickthrough: 14 },
  { id: "3", name: "Clara Garcia", handle: "@claragarcia", initials: "CG", tone: "bg-tone-pink", last4: "14", categories: [{ label: "Kitchen", tone: "orange" }, { label: "Books", tone: "slate" }], clickthrough: 88 },
  { id: "4", name: "Emma Lee", handle: "@emmalee", initials: "EL", tone: "bg-tone-teal", last4: "19", info: true, categories: [{ label: "Furniture", tone: "green" }], clickthrough: 45 },
  { id: "5", name: "Grace Taylor", handle: "@gracetaylor", initials: "GT", tone: "bg-tone-purple", last4: "50", categories: [{ label: "Beauty", tone: "green" }, { label: "Apparel", tone: "orange" }, { label: "Sale", tone: "red" }], clickthrough: 72 },
  { id: "6", name: "Isabella Clark", handle: "@isabellaclark", initials: "IC", tone: "bg-tone-blue", last4: "80", categories: [{ label: "AI", tone: "orange" }, { label: "Machine Learning", tone: "red" }], clickthrough: 27 },
  { id: "7", name: "David Brown", handle: "@davidbrown", initials: "DB", tone: "bg-tone-green", last4: "96", categories: [{ label: "Lazy", tone: "blue" }, { label: "Music", tone: "blue" }, { label: "Movie", tone: "red" }], clickthrough: 45 },
  { id: "8", name: "Frank Wong", handle: "@frankwong", initials: "FW", tone: "bg-tone-red", last4: "28", info: true, categories: [{ label: "Sports", tone: "orange" }, { label: "Jogging", tone: "red" }], clickthrough: 22 },
];

const CATEGORY_CLASS: Record<string, string> = {
  blue: "bg-tone-blue/15 text-tone-blue",
  orange: "bg-tone-orange/15 text-tone-orange",
  red: "bg-tone-red/15 text-tone-red",
  green: "bg-tone-green/15 text-tone-green",
  slate: "bg-tone-slate/15 text-tone-slate",
};

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="1" y="1" width="22" height="14" rx="2" />
      <path d="M1 6h22" />
    </svg>
  );
}

const COLUMNS: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarFallback className={`${row.original.tone} text-[13px] font-medium text-white`}>{row.original.initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col leading-tight">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-[12px] text-muted-foreground">{row.original.handle}</span>
        </div>
      </div>
    ),
  },
  {
    id: "payment",
    header: "Payment Methods",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-10 items-center justify-center rounded-md border border-border bg-background text-muted-foreground">
          <CardIcon />
        </span>
        <span className="tabular-nums text-muted-foreground">Ends in ****-**{row.original.last4}</span>
        {row.original.info ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" aria-label="Payment details" className="text-subtle-foreground hover:text-foreground">
                <InfoIcon />
              </button>
            </TooltipTrigger>
            <TooltipContent>Card expires soon</TooltipContent>
          </Tooltip>
        ) : null}
      </div>
    ),
  },
  {
    id: "category",
    header: "Category",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1.5">
        {row.original.categories.map((c) => (
          <span key={c.label} className={`rounded-full px-2.5 py-0.5 text-[12px] font-medium ${CATEGORY_CLASS[c.tone] ?? ""}`}>
            {c.label}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "clickthrough",
    header: "Clickthrough Percentage",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-3">
        <Progress value={Number(getValue())} className="h-1.5 w-40" />
        <span className="w-9 text-end text-[12px] tabular-nums text-muted-foreground">{String(getValue())}%</span>
      </div>
    ),
  },
];

export function CustomersTable() {
  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex-row items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <CardTitle className="text-[17px]">Your Customers</CardTitle>
          <Badge tone="info">New</Badge>
        </div>
        <Button variant="secondary" size="sm">Filter</Button>
      </CardHeader>
      <DataTable
        columns={COLUMNS}
        data={CUSTOMERS}
        getRowId={(row) => row.id}
        pageSize={8}
        density="comfortable"
        className="gap-0"
      />
    </Card>
  );
}
