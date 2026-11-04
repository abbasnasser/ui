import * as React from "react";
import {
  Badge, Banner, Breadcrumbs, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator, Button, ButtonGroup,
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Collapsible,
  CollapsibleContent, CollapsibleTrigger, DataTable, Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger, Empty, Field, FieldDescription, FieldError, FieldLabel, Input,
  Label, Link, Loader, Meter, Pagination, PaginationItems, PaginationLink, PageHeader, Popover, PopoverContent,
  PopoverTrigger, RadioGroup, RadioGroupItem, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  Sidebar, Slider, Switch, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent,
  TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, AppLauncher, cn,
  type SidebarApp, type LauncherApp, type AppTone,
} from "../src";
import { MoreSections } from "./more";

/* Small stand-in icons, so the showcase needs no icon font. */
const Dot = () => <span className="inline-block size-3.5 rounded-sm bg-current opacity-70" />;

const SIDEBAR_APPS: SidebarApp[] = [
  { key: "orders", label: "Orders", href: "#orders", icon: <Dot />, pages: [
    { key: "all", label: "All orders", href: "#orders/all" },
    { key: "new", label: "New order", href: "#orders/new" },
    { key: "returns", label: "Returns", href: "#orders/returns", ready: false },
  ] },
  { key: "drivers", label: "Drivers", href: "#drivers", icon: <Dot />, pages: [
    { key: "list", label: "Drivers list", href: "#drivers/list" },
  ] },
  { key: "reports", label: "Reports", href: "#reports", icon: <Dot />, group: "b" },
  { key: "warehouse", label: "Warehouse", href: "#warehouse", soon: true, group: "b" },
];

const LAUNCHER_APPS: LauncherApp[] = [
  { key: "orders", label: "Orders", href: "#orders", tone: "blue" as AppTone, icon: <Dot /> },
  { key: "drivers", label: "Drivers", href: "#drivers", tone: "teal", icon: <Dot /> },
  { key: "reports", label: "Reports", href: "#reports", tone: "purple", icon: <Dot /> },
  { key: "warehouse", label: "Warehouse", href: "#warehouse", tone: "orange", icon: <Dot />, soon: true },
];

type Person = { id: string; name: string; role: string; status: string };
const PEOPLE: Person[] = [
  { id: "1", name: "Ali Haddad", role: "Dispatcher", status: "Active" },
  { id: "2", name: "Sara Khoury", role: "Driver", status: "Suspended" },
  { id: "3", name: "Omar Nasser", role: "Admin", status: "Active" },
  { id: "4", name: "Lina Saab", role: "Driver", status: "Active" },
  { id: "5", name: "Karim Daher", role: "Warehouse", status: "Pending" },
];
const PEOPLE_COLUMNS = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status", cell: ({ getValue }: { getValue: () => unknown }) => <Badge tone={getValue() === "Active" ? "success" : getValue() === "Suspended" ? "danger" : "warning"}>{String(getValue())}</Badge> },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-6 flex-col gap-4 border-t border-border py-8">
      <h2 className="text-[17px] font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Row({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap items-center gap-3", className)}>{children}</div>;
}

export function App() {
  const [dark, setDark] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [switchOn, setSwitchOn] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [selection, setSelection] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <TooltipProvider>
      <div className="min-h-svh bg-background text-foreground">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/95 px-6 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-semibold">@abbasnasser/ui</span>
            <Badge>v0.1.1</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setDark((d) => !d)}>{dark ? "Light" : "Dark"} theme</Button>
          </div>
        </header>

        <div className="flex">
          <nav className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-56 shrink-0 flex-col gap-1 overflow-y-auto border-e border-border p-4 text-[13px] md:flex">
            {[
              ["buttons", "Buttons"], ["forms", "Forms"], ["overlays", "Overlays"], ["navigation", "Navigation"],
              ["data", "Data"], ["feedback", "Feedback"], ["layout", "Layout"], ["sidebar", "Sidebar"], ["launcher", "App launcher"],
              ["accordion", "Accordion"], ["alerts", "Alerts and dialogs"], ["menus", "Menus and command"], ["forms-more", "More form controls"], ["data-more", "Calendar, chart, carousel"], ["layout-more", "Layout and items"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">{label}</a>
            ))}
          </nav>

          <main className="min-w-0 flex-1 px-6 pb-24">
            <PageHeader
              title="Components"
              description="Every component in the library, with its main options. Use the theme button to check dark mode."
              breadcrumb={
                <Breadcrumbs>
                  <BreadcrumbList>
                    <BreadcrumbItem><Link href="#">Library</Link></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>Showcase</BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumbs>
              }
              actions={<Button variant="primary" size="sm">Primary action</Button>}
              className="pt-6"
            />

            <Section id="buttons" title="Buttons">
              <Row>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button disabled>Disabled</Button>
              </Row>
              <Row>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="icon" aria-label="Add"><Dot /></Button>
              </Row>
              <ButtonGroup>
                <Button variant="secondary">Day</Button>
                <Button variant="secondary">Week</Button>
                <Button variant="secondary">Month</Button>
              </ButtonGroup>
            </Section>

            <Section id="forms" title="Forms">
              <div className="grid gap-6 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input id="name" placeholder="Full name" />
                  <FieldDescription>Shown on invoices.</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" aria-invalid="true" defaultValue="not-an-email" />
                  <FieldError>Enter a valid email address.</FieldError>
                </Field>
                <Field>
                  <FieldLabel>Zone</FieldLabel>
                  <Select defaultValue="beirut">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beirut">Beirut</SelectItem>
                      <SelectItem value="tripoli">Tripoli</SelectItem>
                      <SelectItem value="sidon">Sidon</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Delivery type</FieldLabel>
                  <RadioGroup defaultValue="same">
                    <Label className="flex items-center gap-2"><RadioGroupItem value="same" /> Same day</Label>
                    <Label className="flex items-center gap-2"><RadioGroupItem value="next" /> Next day</Label>
                  </RadioGroup>
                </Field>
              </div>
              <Row>
                <Label className="flex items-center gap-2"><Checkbox checked={checked} onCheckedChange={(v) => setChecked(!!v)} /> Notify the customer</Label>
                <Label className="flex items-center gap-2"><Switch checked={switchOn} onCheckedChange={setSwitchOn} /> Auto-assign drivers</Label>
              </Row>
              <div className="max-w-sm">
                <FieldLabel>Radius</FieldLabel>
                <Slider defaultValue={[40]} max={100} step={1} aria-label="Radius" className="mt-2" />
              </div>
            </Section>

            <Section id="overlays" title="Overlays and menus">
              <Row>
                <Dialog>
                  <DialogTrigger asChild><Button variant="secondary">Open dialog</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel order?</DialogTitle>
                      <DialogDescription>This cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="secondary">Keep</Button>
                      <Button variant="destructive">Cancel order</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Popover>
                  <PopoverTrigger asChild><Button variant="secondary">Open popover</Button></PopoverTrigger>
                  <PopoverContent><p className="text-[13px]">Popovers hold small forms or details.</p></PopoverContent>
                </Popover>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="secondary">Actions</Button></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Tooltip>
                  <TooltipTrigger asChild><Button variant="ghost">Hover me</Button></TooltipTrigger>
                  <TooltipContent>A short hint</TooltipContent>
                </Tooltip>
              </Row>
              <Collapsible className="max-w-md rounded-lg border border-border p-3">
                <CollapsibleTrigger className="text-[13px] font-medium">Show more details</CollapsibleTrigger>
                <CollapsibleContent className="pt-2 text-[13px] text-muted-foreground">Hidden content opens here.</CollapsibleContent>
              </Collapsible>
            </Section>

            <Section id="navigation" title="Navigation">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="pt-4 text-[13px]">Every order.</TabsContent>
                <TabsContent value="active" className="pt-4 text-[13px]">Orders in progress.</TabsContent>
                <TabsContent value="archived" className="pt-4 text-[13px]">Closed orders.</TabsContent>
              </Tabs>
              <Breadcrumbs>
                <BreadcrumbList>
                  <BreadcrumbItem><Link href="#">Orders</Link></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><Link href="#">2026</Link></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>Order 1042</BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumbs>
              <Pagination>
                <span className="text-[13px] text-muted-foreground">Page {page} of 5</span>
                <PaginationItems>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <PaginationLink key={n} active={n === page} onClick={() => setPage(n)}>{n}</PaginationLink>
                  ))}
                </PaginationItems>
              </Pagination>
            </Section>

            <Section id="data" title="Data">
              <DataTable
                columns={PEOPLE_COLUMNS}
                data={PEOPLE}
                getRowId={(r) => r.id}
                searchable
                selectable
                columnVisibility
                pageSize={3}
                selection={selection}
                onSelectionChange={setSelection}
                caption="5 people"
                bulkActions={(rows) => <Button size="sm" variant="secondary">Export {rows.length}</Button>}
                renderExpanded={(p) => <p className="text-[13px]">{p.name} is a {p.role.toLowerCase()}.</p>}
              />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plain table</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PEOPLE.slice(0, 2).map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Card className="max-w-md">
                <CardHeader>
                  <CardTitle>Card</CardTitle>
                  <CardDescription>A bordered surface for grouped content.</CardDescription>
                </CardHeader>
                <CardContent className="text-[13px]">Body text goes here.</CardContent>
                <CardFooter><Button variant="primary" size="sm">Save</Button></CardFooter>
              </Card>
            </Section>

            <Section id="feedback" title="Feedback and status">
              <Banner tone="info" title="Heads up">Scheduled maintenance on Friday at 22:00.</Banner>
              <Banner tone="warning" title="Driver app outdated">Ask 3 drivers to update.</Banner>
              <Banner tone="success" title="Saved" />
              <Banner tone="danger" title="Could not save" />
              <Row>
                <Badge>Neutral</Badge>
                <Badge tone="info">Info</Badge>
                <Badge tone="success">Success</Badge>
                <Badge tone="warning">Warning</Badge>
                <Badge tone="danger">Danger</Badge>
              </Row>
              <div className="grid max-w-xl gap-4 md:grid-cols-2">
                <Meter label="Capacity" valueText="72 of 100" value={72} />
                <Meter label="Deliveries today" valueText="18 of 25" value={18} max={25} />
              </div>
              <Row><Loader /><span className="text-[13px] text-muted-foreground">Loading…</span></Row>
              <Empty title="No deliveries yet" description="New orders will appear here." action={<Button variant="primary" size="sm">Create order</Button>} />
            </Section>

            <Section id="layout" title="Links and text">
              <Row>
                <Link href="#">A text link</Link>
                <span className="text-[13px] text-muted-foreground">next to plain text</span>
              </Row>
            </Section>

            <Section id="sidebar" title="Sidebar">
              <p className="text-[13px] text-muted-foreground">
                The sidebar is shown inside a fixed frame. Toggle it to see the collapsed rail. Icons are optional and so is the tree.
              </p>
              <div className="flex h-[420px] overflow-hidden rounded-lg border border-border">
                <Sidebar
                  apps={SIDEBAR_APPS}
                  activePath="#orders/all"
                  activeAppKey="orders"
                  collapsed={sidebarCollapsed}
                  onCollapsedChange={setSidebarCollapsed}
                  header={<span className="px-2 text-[13px] font-semibold">Staff</span>}
                  footer={<span className="px-2 text-[12px] text-muted-foreground">Signed in</span>}
                />
                <div className="flex-1 p-4 text-[13px]">
                  <Button size="sm" variant="secondary" onClick={() => setSidebarCollapsed((c) => !c)}>
                    {sidebarCollapsed ? "Expand" : "Collapse"} sidebar
                  </Button>
                  <p className="mt-3 text-muted-foreground">Ctrl/Cmd+B also toggles it.</p>
                </div>
              </div>
              <Sidebar
                className="h-auto w-64 rounded-lg border border-border"
                apps={SIDEBAR_APPS.map((a) => ({ ...a, pages: undefined }))}
                activePath="#reports"
                collapsed={false}
                shortcut={false}
              />
            </Section>

            <Section id="launcher" title="App launcher">
              <AppLauncher
                apps={LAUNCHER_APPS}
                createActions={[{ key: "order", label: "New order", href: "#orders/new", tone: "blue", icon: <Dot /> }]}
              />
              <Empty title="Nothing to show" description="Shown when no app is open." />
            </Section>
            <MoreSections />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
