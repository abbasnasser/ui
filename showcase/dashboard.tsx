import * as React from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Avatar, AvatarFallback, Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle,
  ChartContainer, ChartTooltip, ChartTooltipContent, Progress, Tabs, TabsContent, TabsList, TabsTrigger,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue, Separator,
} from "../src";

const REVENUE = [
  { day: "Mon", revenue: 1240, deliveries: 42 },
  { day: "Tue", revenue: 1890, deliveries: 58 },
  { day: "Wed", revenue: 1420, deliveries: 45 },
  { day: "Thu", revenue: 2310, deliveries: 71 },
  { day: "Fri", revenue: 2650, deliveries: 84 },
  { day: "Sat", revenue: 3100, deliveries: 96 },
  { day: "Sun", revenue: 1980, deliveries: 61 },
];

const REVENUE_CONFIG = {
  revenue: { label: "Revenue", color: "#2f6fd6" },
  deliveries: { label: "Deliveries", color: "#1f9d94" },
};

const CHANNEL_CONFIG = {
  delivered: { label: "Delivered", color: "#3fa35b" },
  returned: { label: "Returned", color: "#e0792b" },
};

const CHANNELS = [
  { day: "Mon", delivered: 38, returned: 4 },
  { day: "Tue", delivered: 52, returned: 6 },
  { day: "Wed", delivered: 41, returned: 4 },
  { day: "Thu", delivered: 64, returned: 7 },
  { day: "Fri", delivered: 77, returned: 7 },
  { day: "Sat", delivered: 88, returned: 8 },
  { day: "Sun", delivered: 55, returned: 6 },
];

type Order = { id: string; customer: string; zone: string; driver: string; status: "Delivered" | "On the way" | "Pending" | "Returned"; amount: string };
const ORDERS: Order[] = [
  { id: "#10482", customer: "Hanna Mouawad", zone: "Achrafieh", driver: "Lina Saab", status: "Delivered", amount: "$42.00" },
  { id: "#10481", customer: "Elie Haddad", zone: "Hamra", driver: "Omar Nasser", status: "On the way", amount: "$18.50" },
  { id: "#10480", customer: "Rima Khoury", zone: "Jounieh", driver: "Ali Haddad", status: "Pending", amount: "$77.00" },
  { id: "#10479", customer: "Karim Daher", zone: "Verdun", driver: "Sara Khoury", status: "Returned", amount: "$12.00" },
  { id: "#10478", customer: "Nour Chahine", zone: "Baabda", driver: "Lina Saab", status: "Delivered", amount: "$63.25" },
];

const STATUS_TONE: Record<Order["status"], "success" | "info" | "warning" | "danger"> = {
  Delivered: "success",
  "On the way": "info",
  Pending: "warning",
  Returned: "danger",
};

const DRIVERS = [
  { name: "Lina Saab", done: 22, total: 26 },
  { name: "Omar Nasser", done: 15, total: 24 },
  { name: "Ali Haddad", done: 9, total: 18 },
  { name: "Sara Khoury", done: 4, total: 11 },
];

function Kpi({ label, value, delta, tone }: { label: string; value: string; delta: string; tone: "success" | "danger" }) {
  return (
    <Card className="gap-1 p-4">
      <CardDescription>{label}</CardDescription>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[22px] font-semibold tabular-nums">{value}</span>
        <Badge tone={tone}>{delta}</Badge>
      </div>
    </Card>
  );
}

export function Dashboard() {
  const [range, setRange] = React.useState("7d");

  return (
    <section id="dashboard" className="flex scroll-mt-6 flex-col gap-5 border-t border-border py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[17px] font-semibold">Dashboard</h2>
          <p className="text-[13px] text-muted-foreground">Operations overview for the last {range === "7d" ? "7 days" : "30 days"}.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary">Export</Button>
          <Button variant="primary">New order</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Revenue" value="$14,590" delta="+12.4%" tone="success" />
        <Kpi label="Deliveries" value="492" delta="+8.1%" tone="success" />
        <Kpi label="Returns" value="41" delta="+3.0%" tone="danger" />
        <Kpi label="On-time rate" value="94.2%" delta="-1.1%" tone="danger" />
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Daily, in USD, last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ revenue: REVENUE_CONFIG.revenue }} className="aspect-auto h-64 w-full">
              <LineChart data={REVENUE} margin={{ left: 0, right: 8, top: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={44} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Driver progress</CardTitle>
            <CardDescription>Deliveries completed today</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {DRIVERS.map((d) => (
              <div key={d.name} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarFallback className="text-[10px]">{d.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 truncate text-[13px]">{d.name}</span>
                  <span className="text-[12px] tabular-nums text-muted-foreground">{d.done}/{d.total}</span>
                </div>
                <Progress value={Math.round((d.done / d.total) * 100)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Recent orders</CardTitle>
              <CardDescription>The latest five orders across all zones</CardDescription>
            </div>
            <Button variant="secondary" size="sm">View all</Button>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all">
              <div className="px-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="open">Open</TabsTrigger>
                  <TabsTrigger value="issues">Issues</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Zone</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-end">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ORDERS.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell className="font-medium tabular-nums">{o.id}</TableCell>
                        <TableCell>{o.customer}</TableCell>
                        <TableCell className="text-muted-foreground">{o.zone}</TableCell>
                        <TableCell>{o.driver}</TableCell>
                        <TableCell><Badge tone={STATUS_TONE[o.status]}>{o.status}</Badge></TableCell>
                        <TableCell className="text-end tabular-nums">{o.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="open" className="mt-0 px-4 py-6 text-[13px] text-muted-foreground">
                Open orders are shown here: pending and on the way.
              </TabsContent>
              <TabsContent value="issues" className="mt-0 px-4 py-6 text-[13px] text-muted-foreground">
                Returns and failed deliveries are shown here.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deliveries by outcome</CardTitle>
            <CardDescription>Delivered against returned, this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CHANNEL_CONFIG} className="aspect-auto h-44 w-full">
              <BarChart data={CHANNELS}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="delivered" stackId="a" fill="var(--color-delivered)" radius={[0, 0, 4, 4]} />
                <Bar dataKey="returned" stackId="a" fill="var(--color-returned)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
            <Separator className="my-4" />
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-muted-foreground">Success rate</span>
              <span className="font-semibold tabular-nums">91.6%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
