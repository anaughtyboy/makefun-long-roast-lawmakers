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

// Read the file back as bytes and confirm it holds exactly the line:
// same UTF-8 bytes, same byte length, and no trailing newline.
const written = readFileSync(target);
const expected = Buffer.from(LINE, "utf8");
if (!written.equals(expected)) {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}
if (written.length !== LINE.length) {
  throw new Error(
    `byte-length mismatch: wrote ${written.length} bytes, expected ${LINE.length}`,
  );
}
if (written[written.length - 1] === 0x0a) {
  throw new Error("entry.txt must not end with a newline");
}
console.log(`wrote ${LINE.length} characters to ${target}`);
