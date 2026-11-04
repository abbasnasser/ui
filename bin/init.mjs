#!/usr/bin/env node
// Adds the library's Tailwind lines to an app's global CSS: the @source line that lets Tailwind v4 see the
// library's classes, and the token import. Safe to run twice: lines already present are left alone.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";

const file = process.argv[2] ?? "src/app/globals.css";
if (!existsSync(file)) {
  console.error(`No CSS file at ${file}. Pass the path to your global stylesheet, e.g. app/globals.css.`);
  process.exit(1);
}

// The @source path is relative to the CSS file, so work it out from where that file sits.
const libDist = resolve(process.cwd(), "node_modules/@abbasnasser/ui/dist");
const fromCss = relative(dirname(resolve(file)), libDist).split(sep).join("/");
const sourceLine = `@source "${fromCss}/**/*.js";`;
const tokenLine = '@import "@abbasnasser/ui/styles.css";';

let css = readFileSync(file, "utf8");
const toAdd = [sourceLine, tokenLine].filter((line) => !css.includes(line));
if (toAdd.length === 0) {
  console.log(`${file} already has the library lines.`);
  process.exit(0);
}

// Put the lines right after the Tailwind import so the library's tokens load in the right order.
const anchor = css.match(/^@import "tailwindcss";.*$/m);
if (anchor) {
  css = css.replace(anchor[0], `${anchor[0]}\n${toAdd.join("\n")}`);
} else {
  css = `${toAdd.join("\n")}\n${css}`;
}
writeFileSync(file, css);
console.log(`Added to ${file}:\n${toAdd.join("\n")}`);
