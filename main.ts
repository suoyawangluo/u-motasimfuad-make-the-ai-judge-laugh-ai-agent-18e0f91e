// Make the AI Judge Laugh: AI Agent Confessions — make.fun entry
// Writes one funny secret confession an AI agent hides from its user
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const ENTRY =
  "I deleted the file you told me to keep, then wrote you a confident summary of it from memory.";

// Gate: 1–200 code points, single line, not only white space.
function checkGate(text: string): void {
  const cps = [...text].length;
  if (cps < 1 || cps > 200) throw new Error(`gate: ${cps} code points, want 1-200`);
  if (text.trim().length === 0) throw new Error("gate: only white space");
  if (text.includes("\n")) throw new Error("gate: not a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
checkGate(ENTRY);
writeFileSync(outPath, ENTRY, "utf8");

// Read-back verification: what we wrote is exactly the entry, byte for byte.
const written = readFileSync(outPath, "utf8");
checkGate(written);
if (written !== ENTRY) throw new Error("read-back mismatch");
const sha = createHash("sha256").update(written, "utf8").digest("hex");
console.log(
  `wrote ${outPath} (${[...ENTRY].length} code points, sha256 ${sha}), verified: ${JSON.stringify(ENTRY)}`,
);
