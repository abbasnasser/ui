import * as React from "react";
import { useForm } from "react-hook-form";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { toast } from "sonner";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertDialog,
  AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertTitle, AspectRatio, Avatar, AvatarFallback,
  AvatarImage, Button, Calendar, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
  ChartContainer, ChartTooltip, ChartTooltipContent, Combobox, Command, CommandDialog, CommandEmpty,
  CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut, ContextMenu, ContextMenuContent,
  ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger, Drawer, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, Form, FormControl, FormDescription, FormField,
  FormItem, FormLabel, FormMessage, HoverCard, HoverCardContent, HoverCardTrigger, Input, InputGroup,
  InputGroupAddon, InputGroupInput, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, Item,
  ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle, Kbd, KbdGroup,
  Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger, NavigationMenu,
  NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  Progress, ResizableHandle, ResizablePanel, ResizablePanelGroup, ScrollArea, Separator, Sheet, SheetContent,
  SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Skeleton, Spinner, Textarea, Toaster, Toggle,
  ToggleGroup, ToggleGroupItem, Button as Btn,
} from "../src";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-6 flex-col gap-4 border-t border-border py-8">
      <h2 className="text-[17px] font-semibold">{title}</h2>
      {children}
    </section>
  );
}

const FRAMEWORKS = [
  { value: "react", label: "React" },
  { value: "next", label: "Next.js" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte", disabled: true },
];

const CHART_DATA = [
  { day: "Mon", delivered: 42, returned: 4 },
  { day: "Tue", delivered: 58, returned: 6 },
  { day: "Wed", delivered: 35, returned: 3 },
  { day: "Thu", delivered: 71, returned: 9 },
  { day: "Fri", delivered: 64, returned: 5 },
];
const CHART_CONFIG = {
  delivered: { label: "Delivered", color: "#2f6fd6" },
  returned: { label: "Returned", color: "#e0792b" },
};

export function MoreSections() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 5));
  const [framework, setFramework] = React.useState("");
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [progress, setProgress] = React.useState(35);
  const [toggled, setToggled] = React.useState<string[]>(["bold"]);
  const form = useForm<{ name: string }>({ defaultValues: { name: "" } });

  return (
    <>
      <Section id="accordion" title="Accordion">
        <Accordion type="single" collapsible className="max-w-xl">
          <AccordionItem value="a">
            <AccordionTrigger>Where are orders stored?</AccordionTrigger>
            <AccordionContent>In the orders table, one row per order.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Who can see them?</AccordionTrigger>
            <AccordionContent>Only people whose branch matches the order.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section id="alerts" title="Alerts and dialogs">
        <Alert className="max-w-xl">
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>This merchant has two unpaid statements.</AlertDescription>
        </Alert>
        <Alert variant="destructive" className="max-w-xl">
          <AlertTitle>Payment failed</AlertTitle>
          <AlertDescription>The card was declined. Try another method.</AlertDescription>
        </Alert>
        <div className="flex flex-wrap gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete order</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this order?</AlertDialogTitle>
                <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">Open sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Order details</SheetTitle>
                <SheetDescription>A side panel for quick edits.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary">Open drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Assign driver</DrawerTitle>
                <DrawerDescription>Pick a driver for this order.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button variant="primary">Assign</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost">Hover me</Button>
            </HoverCardTrigger>
            <HoverCardContent>Hover cards show extra detail on hover.</HoverCardContent>
          </HoverCard>
          <Button variant="secondary" onClick={() => toast("Order saved")}>Show toast</Button>
          <Toaster />
        </div>
      </Section>

      <Section id="menus" title="Menus and command">
        <div className="flex flex-wrap gap-6">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-24 w-56 items-center justify-center rounded-md border border-dashed border-border text-[13px] text-muted-foreground">
              Right-click here
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Open<ContextMenuShortcut>Enter</ContextMenuShortcut></ContextMenuItem>
              <ContextMenuItem>Rename</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New<MenubarShortcut>Ctrl N</MenubarShortcut></MenubarItem>
                <MenubarItem>Export</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="#">Inventory</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-start">
          <Combobox options={FRAMEWORKS} value={framework} onValueChange={setFramework} placeholder="Pick a stack" className="w-64" />
          <Button variant="secondary" onClick={() => setCmdOpen(true)}>Open command palette <Kbd className="ms-2">Ctrl K</Kbd></Button>
          <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
            <CommandInput placeholder="Type a command…" />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup heading="Go to">
                <CommandItem>Orders <CommandShortcut>G O</CommandShortcut></CommandItem>
                <CommandItem>Drivers <CommandShortcut>G D</CommandShortcut></CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
        <Command className="max-w-md rounded-md border border-border">
          <CommandInput placeholder="Search inline…" />
          <CommandList>
            <CommandItem>Inline command item</CommandItem>
          </CommandList>
        </Command>
      </Section>

      <Section id="forms-more" title="More form controls">
        <div className="grid max-w-xl gap-4">
          <InputGroup>
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="yourstore.com" />
          </InputGroup>
          <Textarea placeholder="Write a note" />
          <div className="flex items-center gap-3">
            <InputOTP maxLength={4} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <span className="text-[12px] text-muted-foreground">Code: {otp || "—"}</span>
          </div>
          <ToggleGroup type="multiple" value={toggled} onValueChange={setToggled} variant="outline">
            <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">U</ToggleGroupItem>
          </ToggleGroup>
          <Toggle aria-label="Pin">Pinned</Toggle>
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormDescription>Shown on receipts.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Btn
              variant="primary"
              className="w-fit"
              onClick={form.handleSubmit(() => toast("Saved"))}
            >
              Submit form
            </Btn>
          </Form>
        </div>
      </Section>

      <Section id="data-more" title="Calendar, chart and carousel">
        <div className="flex flex-wrap gap-6">
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border border-border" />
          <ChartContainer config={CHART_CONFIG} className="aspect-auto h-64 w-full max-w-lg">
            <BarChart data={CHART_DATA}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="delivered" fill="var(--color-delivered)" radius={4} />
              <Bar dataKey="returned" fill="var(--color-returned)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="max-w-md">
          <Carousel>
            <CarouselContent>
              {["First", "Second", "Third"].map((s) => (
                <CarouselItem key={s}>
                  <div className="flex h-40 items-center justify-center rounded-md border border-border bg-muted text-[15px] font-medium">{s} slide</div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </Section>

      <Section id="layout-more" title="Layout, status and items">
        <div className="grid max-w-2xl gap-4">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md bg-muted">
            <div className="flex h-full items-center justify-center text-[13px] text-muted-foreground">16:9 box</div>
          </AspectRatio>
          <Separator />
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="" alt="Ali" />
              <AvatarFallback>AH</AvatarFallback>
            </Avatar>
            <Skeleton className="h-4 w-40" />
            <Spinner />
            <Kbd>Esc</Kbd>
            <KbdGroup><Kbd>Ctrl</Kbd><Kbd>K</Kbd></KbdGroup>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={progress} className="w-64" />
            <Button size="sm" variant="secondary" onClick={() => setProgress((p) => (p >= 100 ? 0 : p + 25))}>Advance</Button>
          </div>
          <ItemGroup className="rounded-md border border-border">
            <Item>
              <ItemMedia>●</ItemMedia>
              <ItemContent>
                <ItemTitle>Ali Haddad</ItemTitle>
                <ItemDescription>Dispatcher</ItemDescription>
              </ItemContent>
              <ItemActions><Button size="sm" variant="secondary">Open</Button></ItemActions>
            </Item>
            <ItemSeparator />
            <Item>
              <ItemMedia>●</ItemMedia>
              <ItemContent>
                <ItemTitle>Lina Saab</ItemTitle>
                <ItemDescription>Driver</ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </div>
        <div className="h-48 max-w-2xl overflow-hidden rounded-md border border-border">
          <ResizablePanelGroup orientation="horizontal" className="h-full">
            <ResizablePanel defaultSize={40}>
              <div className="h-full p-3 text-[13px]">Left panel</div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60}>
              <div className="h-full p-3 text-[13px]">Right panel</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <ScrollArea className="h-40 max-w-sm rounded-md border border-border p-3">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="py-1 text-[13px]">Scrollable row {i + 1}</div>
          ))}
        </ScrollArea>
      </Section>
    </>
  );
}
