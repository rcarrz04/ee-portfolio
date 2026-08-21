#!/usr/bin/env node
/**
 * Contrast + non-inversion gate for src/index.css.
 *
 * Parses the live `:root` and `.dark` custom-property blocks (no hardcoded
 * values, no npm dependencies) and asserts:
 *   - WCAG AA contrast ratios for the dark palette's foreground/background pairs
 *   - Structural "authored, not inverted" rules for the dark palette
 *   - A regression-only baseline for the light palette
 *
 * Exits 0 and prints "ALL CHECKS PASS" if every assertion passes.
 * Exits 1 and prints one FAIL line per failing assertion otherwise.
 */

const fs = require("fs");
const path = require("path");

const CSS_PATH = path.join(__dirname, "..", "src", "index.css");

function readCss() {
  return fs.readFileSync(CSS_PATH, "utf8");
}

/**
 * Extract a `{ selector }` block's raw contents (text between the first
 * matching `{` and its closing `}`), honoring nested braces.
 */
function extractBlock(css, selectorRegex) {
  const match = selectorRegex.exec(css);
  if (!match) {
    throw new Error(
      `Could not find block matching ${selectorRegex} in ${CSS_PATH}`
    );
  }
  const openBraceIndex = css.indexOf("{", match.index);
  if (openBraceIndex === -1) {
    throw new Error(`Malformed CSS: no '{' found after ${selectorRegex}`);
  }
  let depth = 0;
  let i = openBraceIndex;
  for (; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  if (depth !== 0) {
    throw new Error(`Malformed CSS: unbalanced braces after ${selectorRegex}`);
  }
  return css.slice(openBraceIndex + 1, i);
}

/**
 * Parse HSL custom-property declarations of the form:
 *   --name: H S% L%;
 * where H/S/L may contain decimals. Returns a map of name -> {h, s, l}.
 */
function parseHslVars(blockText) {
  const vars = {};
  const re = /--([a-z0-9-]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*;/gi;
  let m;
  while ((m = re.exec(blockText)) !== null) {
    const [, name, h, s, l] = m;
    vars[name] = { h: parseFloat(h), s: parseFloat(s), l: parseFloat(l) };
  }
  return vars;
}

// --- Color math -------------------------------------------------------

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0,
    g1 = 0,
    b1 = 0;
  if (hp >= 0 && hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (hp >= 1 && hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (hp >= 2 && hp < 3) [r1, g1, b1] = [0, c, x];
  else if (hp >= 3 && hp < 4) [r1, g1, b1] = [0, x, c];
  else if (hp >= 4 && hp < 5) [r1, g1, b1] = [x, 0, c];
  else if (hp >= 5 && hp < 6) [r1, g1, b1] = [c, 0, x];
  const m = l - c / 2;
  return {
    r: (r1 + m) * 255,
    g: (g1 + m) * 255,
    b: (b1 + m) * 255,
  };
}

function channelToLinear(c) {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

function relativeLuminance({ r, g, b }) {
  const R = channelToLinear(r);
  const G = channelToLinear(g);
  const B = channelToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hsl1, hsl2) {
  const l1 = relativeLuminance(hslToRgb(hsl1.h, hsl1.s, hsl1.l));
  const l2 = relativeLuminance(hslToRgb(hsl2.h, hsl2.s, hsl2.l));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

// --- Assertion bookkeeping ---------------------------------------------

let failCount = 0;

function assertRatio(vars, blockLabel, fgName, bgName, minRatio) {
  const fg = vars[fgName];
  const bg = vars[bgName];
  if (!fg || !bg) {
    throw new Error(
      `Missing --${!fg ? fgName : bgName} in ${blockLabel} block`
    );
  }
  const ratio = round2(contrastRatio(fg, bg));
  const label = `${fgName} on ${bgName}`;
  if (ratio >= minRatio) {
    console.log(`PASS [${blockLabel}] ${label}: ${ratio}:1 (>= ${minRatio}:1)`);
  } else {
    console.log(`FAIL [${blockLabel}] ${label}: ${ratio}:1 (< ${minRatio}:1)`);
    failCount++;
  }
  return ratio;
}

function assertStructural(name, condition, detail) {
  if (condition) {
    console.log(`PASS [dark structural] ${name}: ${detail}`);
  } else {
    console.log(`FAIL [dark structural] ${name}: ${detail}`);
    failCount++;
  }
}

// --- Main ---------------------------------------------------------------

function main() {
  const css = readCss();
  const rootBlockText = extractBlock(css, /:root\s*\{/);
  const darkBlockText = extractBlock(css, /\.dark\s*\{/);

  const rootVars = parseHslVars(rootBlockText);
  const darkVars = parseHslVars(darkBlockText);

  // --- Dark: WCAG AA pairs (4.5:1) ---
  assertRatio(darkVars, "dark", "foreground", "background", 4.5);
  assertRatio(darkVars, "dark", "foreground", "card", 4.5);
  assertRatio(darkVars, "dark", "muted-foreground", "background", 4.5);
  assertRatio(darkVars, "dark", "muted-foreground", "card", 4.5);
  assertRatio(darkVars, "dark", "card-foreground", "card", 4.5);
  assertRatio(darkVars, "dark", "popover-foreground", "popover", 4.5);
  assertRatio(darkVars, "dark", "secondary-foreground", "secondary", 4.5);
  assertRatio(darkVars, "dark", "primary-foreground", "primary", 4.5);
  assertRatio(darkVars, "dark", "accent-foreground", "accent", 4.5);

  // --- Dark: large-text/UI pair (3:1) ---
  assertRatio(darkVars, "dark", "accent", "background", 3);

  // --- Dark: structural non-inversion rules ---
  assertStructural(
    "background is not near-black",
    darkVars.background.l >= 6,
    `L=${darkVars.background.l}%`
  );
  assertStructural(
    "foreground is not pure white",
    darkVars.foreground.l <= 96,
    `L=${darkVars.foreground.l}%`
  );
  const elevationDelta = round2(darkVars.card.l - darkVars.background.l);
  assertStructural(
    "card elevated above background",
    elevationDelta >= 3,
    `delta ${elevationDelta} pts`
  );
  assertStructural(
    "border lighter than background",
    darkVars.border.l > darkVars.background.l,
    `border L=${darkVars.border.l}%, background L=${darkVars.background.l}%`
  );

  // --- Light: regression-only baseline ---
  assertRatio(rootVars, "light", "foreground", "background", 4.5);
  assertRatio(rootVars, "light", "muted-foreground", "background", 4.5);
  assertRatio(rootVars, "light", "accent", "background", 3);
  assertRatio(rootVars, "light", "primary-foreground", "primary", 4.5);

  // --- Known light-mode exception: accent-foreground on accent ---
  const knownRatio = round2(
    contrastRatio(rootVars["accent-foreground"], rootVars["accent"])
  );
  const knownFloor = 4.1;
  console.log(
    `KNOWN [light] accent-foreground on accent: ${knownRatio}:1 — pre-existing ` +
      `:root value inherited per UI-SPEC (not a TOKEN-01..04 decision), out of scope ` +
      `for this phase; handed to Phase 3 / IMPL-03 for remediation.`
  );
  if (knownRatio < knownFloor) {
    console.log(
      `FAIL [light] accent-foreground on accent regressed below floor: ${knownRatio}:1 (< ${knownFloor}:1)`
    );
    failCount++;
  }

  console.log("");
  if (failCount === 0) {
    console.log("ALL CHECKS PASS");
    process.exit(0);
  } else {
    console.log(`${failCount} CHECK(S) FAILED`);
    process.exit(1);
  }
}

main();
