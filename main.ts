// makefun-long-roast-lawmakers — writes one satirical sentence to the output dir.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The lawmakers voted to regulate AI, crypto and the internet, then called IT support because none of them could convert the bill to PDF.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.txt");

if (LINE.length < 1 || LINE.length > 320) {
  throw new Error(`entry must be 1-320 characters, got ${LINE.length}`);
}
if (LINE.trim() !== LINE || LINE.includes("\n")) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, LINE, "utf8");

// Read the file back and confirm it holds exactly the line, byte for byte.
const back = readFileSync(target, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}
console.log(`wrote ${LINE.length} characters to ${target}`);
