"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ExpandedState,
  type OnChangeFn,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type Updater,
  type VisibilityState,
} from "@tanstack/react-table";
import { cn } from "../utils";
import { Empty } from "../empty";
import { Checkbox } from "../checkbox";
import { Button } from "../button";
import { Input } from "../input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu";

/*
 * A data table with everything a staff screen needs. Each feature is opt-in, so a simple list stays simple:
 * - sorting (client or server), global search, column visibility, density
 * - row selection with select-all and an indeterminate header, and a bulk-action bar
 * - pagination (client, or server with a known total), page size choice
 * - loading skeleton, empty state, sticky header, row click, expandable rows
 * Column definitions are plain TanStack ColumnDef objects, so any column can render anything.
 */

export type DataTableDensity = "comfortable" | "compact";

export interface DataTableServerState {
  /** Total rows across all pages, when the server knows it. */
  total: number;
  pageIndex: number;
  pageSize: number;
  onPaginationChange: (state: PaginationState) => void;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  /** Search text sent to the server; the table shows it but does not filter rows itself. */
  search?: string;
  onSearchChange?: (value: string) => void;
}

export interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Stable id per row, used for selection and expansion. Defaults to the row index. */
  getRowId?: (row: TData, index: number) => string;
  /** Shows skeleton rows instead of data. */
  loading?: boolean;
  /** Shown when there are no rows, or none match the search. */
  empty?: { title: React.ReactNode; description?: React.ReactNode; icon?: React.ReactNode };
  /** Show a search box in the toolbar that filters rows on the client. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Lets the user show or hide columns. */
  columnVisibility?: boolean;
  /** Adds a checkbox column and a bulk-action bar when rows are selected. */
  selectable?: boolean;
  selection?: RowSelectionState;
  onSelectionChange?: (selection: RowSelectionState) => void;
  /** Bulk actions shown when rows are selected. Receives the selected rows. */
  bulkActions?: (selected: TData[], clear: () => void) => React.ReactNode;
  /** Pages the rows. On by default; set false to show every row in one list. */
  pagination?: boolean;
  /** Rows per page on the client. Use `server` for paging on the server. */
  pageSize?: number;
  pageSizeOptions?: number[];
  server?: DataTableServerState;
  /** Sorting on every column. On by default. A single column can opt out with `enableSorting: false` in its definition. */
  sortable?: boolean;
  /** Controlled sorting for a client table. */
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  /** Renders a panel under a row. Adds an expand button to each row. */
  renderExpanded?: (row: TData) => React.ReactNode;
  /** Makes the header stay visible while the body scrolls. Give the table a height to see it. */
  stickyHeader?: boolean;
  density?: DataTableDensity;
  onRowClick?: (row: TData) => void;
  /** Text shown in the toolbar on the right, for example the number of rows. */
  caption?: React.ReactNode;
  className?: string;
}

export function DataTable<TData, TValue = unknown>({
  columns: userColumns,
  data,
  getRowId,
  loading = false,
  empty = { title: "No results" },
  searchable = false,
  searchPlaceholder = "Search",
  columnVisibility: showColumnToggle = false,
  selectable = false,
  selection,
  onSelectionChange,
  bulkActions,
  pagination = true,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  server,
  sortable = true,
  sorting: controlledSorting,
  onSortingChange,
  renderExpanded,
  stickyHeader = false,
  density = "comfortable",
  onRowClick,
  caption,
  className,
}: DataTableProps<TData, TValue>) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);
  const [internalSelection, setInternalSelection] = React.useState<RowSelectionState>({});
  const [visibility, setVisibility] = React.useState<VisibilityState>({});
  const [search, setSearch] = React.useState("");
  const [pageState, setPageState] = React.useState<PaginationState>({ pageIndex: 0, pageSize });
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const isServer = Boolean(server);
  const sorting = server?.sorting ?? controlledSorting ?? internalSorting;
  const rowSelection = selection ?? internalSelection;
  const globalFilter = searchable && !isServer ? search : undefined;

  const setSorting: OnChangeFn<SortingState> = (updater) => {
    const next = resolve(updater, sorting);
    if (server?.onSortingChange) server.onSortingChange(next);
    else if (onSortingChange) onSortingChange(next);
    else setInternalSorting(next);
  };

  const setSelection: OnChangeFn<RowSelectionState> = (updater) => {
    const next = resolve(updater, rowSelection);
    if (onSelectionChange) onSelectionChange(next);
    else setInternalSelection(next);
  };

  // Selection column first, when enabled. Its header selects every row on the current page.
  const columns = React.useMemo<ColumnDef<TData, TValue>[]>(() => {
    if (!selectable) return userColumns;
    const select: ColumnDef<TData, TValue> = {
      id: "select",
      enableSorting: false,
      enableHiding: false,
      header: ({ table }) => (
        <Checkbox
          aria-label="Select all rows on this page"
          checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? "indeterminate" : false}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    };
    return [select, ...userColumns];
  }, [selectable, userColumns]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      columnVisibility: visibility,
      globalFilter,
      pagination: isServer ? { pageIndex: server!.pageIndex, pageSize: server!.pageSize } : pageState,
      expanded,
    },
    getRowId,
    onSortingChange: setSorting,
    onRowSelectionChange: setSelection,
    onColumnVisibilityChange: setVisibility,
    onPaginationChange: (updater) => {
      const next = resolve(updater, isServer ? { pageIndex: server!.pageIndex, pageSize: server!.pageSize } : pageState);
      if (isServer) server!.onPaginationChange(next);
      else setPageState(next);
    },
    onExpandedChange: setExpanded,
    enableSorting: sortable,
    enableRowSelection: selectable,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: pagination || isServer ? getPaginationRowModel() : undefined,
    getExpandedRowModel: getExpandedRowModel(),
    manualSorting: isServer,
    manualPagination: isServer,
    rowCount: isServer ? server!.total : undefined,
    getRowCanExpand: () => Boolean(renderExpanded),
  });

  const visibleRows = table.getRowModel().rows;
  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);
  const colSpan = table.getVisibleLeafColumns().length + (renderExpanded ? 1 : 0);
  const rowPad = density === "compact" ? "py-1" : "py-2.5";
  const noRows = !loading && visibleRows.length === 0;

  return (
    <div className={cn("flex min-w-0 flex-col gap-3", className)}>
      {searchable || showColumnToggle || caption || (selectable && selectedRows.length > 0) ? (
        <div className="flex flex-wrap items-center gap-2">
          {searchable ? (
            <Input
              type="search"
              aria-label={searchPlaceholder}
              placeholder={searchPlaceholder}
              className="h-8 w-64"
              value={isServer ? server!.search ?? "" : search}
              onChange={(e) => {
                if (isServer) server!.onSearchChange?.(e.target.value);
                else setSearch(e.target.value);
                table.setPageIndex(0);
              }}
            />
          ) : null}
          {selectable && selectedRows.length > 0 ? (
            <div className="flex items-center gap-2 rounded-md bg-muted px-2.5 py-1 text-[13px]">
              <span className="font-medium">{selectedRows.length} selected</span>
              {bulkActions ? bulkActions(selectedRows, () => setSelection({})) : null}
            </div>
          ) : null}
          <div className="ms-auto flex items-center gap-2">
            {caption ? <span className="text-[12px] text-muted-foreground tabular-nums">{caption}</span> : null}
            {showColumnToggle ? <ColumnToggle table={table} /> : null}
          </div>
        </div>
      ) : null}

      <div className={cn("relative w-full overflow-auto rounded-lg border border-border", stickyHeader && "max-h-[480px]")}>
        <table className="w-full caption-bottom text-[13px]" aria-busy={loading || undefined}>
          <thead className={cn("bg-muted/50", stickyHeader && "sticky top-0 z-10 bg-muted")}>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id} className="border-b border-border">
                {renderExpanded ? <th className="w-8" aria-label="Expand" /> : null}
                {group.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortState = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      scope="col"
                      aria-sort={sortState === "asc" ? "ascending" : sortState === "desc" ? "descending" : canSort ? "none" : undefined}
                      className={cn("h-9 px-3 text-start align-middle text-[12px] font-medium whitespace-nowrap text-muted-foreground", header.column.id === "select" && "w-10")}
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="-mx-1 inline-flex items-center gap-1 rounded px-1 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 outline-none"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <SortIcon direction={sortState} />
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: Math.min(pageSize, 5) }).map((_, i) => (
                  <tr key={`skeleton-${i}`} className="border-b border-border last:border-0">
                    <td colSpan={colSpan} className={cn("px-3", rowPad)}>
                      <div className="h-4 w-full animate-pulse rounded bg-muted motion-reduce:animate-none" />
                    </td>
                  </tr>
                ))
              : visibleRows.map((row) => (
                  <React.Fragment key={row.id}>
                    <tr
                      data-state={row.getIsSelected() ? "selected" : undefined}
                      onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                      className={cn(
                        "border-b border-border transition-colors last:border-0 hover:bg-muted/50 data-[state=selected]:bg-primary/5",
                        onRowClick && "cursor-pointer",
                      )}
                    >
                      {renderExpanded ? (
                        <td className={cn("px-1", rowPad)}>
                          <button
                            type="button"
                            aria-expanded={row.getIsExpanded()}
                            aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
                            onClick={(e) => {
                              e.stopPropagation();
                              row.toggleExpanded();
                            }}
                            className="inline-flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            <svg viewBox="0 0 10 10" width={9} height={9} aria-hidden className={cn("transition-transform", row.getIsExpanded() && "rotate-90")}>
                              <path d="M3 1.5 7 5 3 8.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                            </svg>
                          </button>
                        </td>
                      ) : null}
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className={cn("px-3 align-middle text-foreground", rowPad)}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                    {renderExpanded && row.getIsExpanded() ? (
                      <tr className="border-b border-border bg-muted/30">
                        <td colSpan={colSpan} className="px-4 py-3">
                          {renderExpanded(row.original)}
                        </td>
                      </tr>
                    ) : null}
                  </React.Fragment>
                ))}
            {noRows ? (
              <tr>
                <td colSpan={colSpan} className="p-4">
                  <Empty icon={empty.icon} title={empty.title} description={empty.description} />
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {pagination || isServer ? <Pagination table={table} pageSizeOptions={pageSizeOptions} isServer={isServer} /> : null}
    </div>
  );
}

function resolve<T>(updater: Updater<T>, current: T): T {
  return typeof updater === "function" ? (updater as (old: T) => T)(current) : updater;
}

function SortIcon({ direction }: { direction: false | "asc" | "desc" }) {
  return (
    <svg viewBox="0 0 10 12" width={8} height={10} aria-hidden className={cn("shrink-0", direction ? "text-foreground" : "text-subtle-foreground")}>
      <path d="M5 1 8 4.5H2z" fill={direction === "asc" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="0.8" />
      <path d="M5 11 2 7.5h6z" fill={direction === "desc" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function ColumnToggle<TData>({ table }: { table: ReturnType<typeof useReactTable<TData>> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllLeafColumns()
          .filter((c) => c.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value: boolean) => column.toggleVisibility(!!value)}
              onSelect={(e: Event) => e.preventDefault()}
            >
              {typeof column.columnDef.header === "string" ? column.columnDef.header : column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Pagination<TData>({
  table,
  pageSizeOptions,
  isServer,
}: {
  table: ReturnType<typeof useReactTable<TData>>;
  pageSizeOptions: number[];
  isServer: boolean;
}) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const total = isServer ? table.getRowCount() : table.getPrePaginationRowModel().rows.length;
  const from = total === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min(total, (pageIndex + 1) * pageSize);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted-foreground">
      <span className="tabular-nums">
        {total === 0 ? "No rows" : `${from}–${to} of ${total}`}
      </span>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <Select value={String(pageSize)} onValueChange={(v) => table.setPageSize(Number(v))}>
            <SelectTrigger className="h-8 w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {/* The current size is always listed, even when it is not one of the standard options. */}
              {[...new Set([...pageSizeOptions, pageSize])].sort((x, y) => x - y).map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="tabular-nums">
          Page {pageCount === 0 ? 0 : pageIndex + 1} of {pageCount}
        </span>
        <div className="flex items-center gap-1">
          <Button variant="secondary" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} aria-label="Previous page">
            Previous
          </Button>
          <Button variant="secondary" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} aria-label="Next page">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
