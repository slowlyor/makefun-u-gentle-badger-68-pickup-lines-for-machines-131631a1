// Pickup Lines for Machines — make.fun bounty
// u-gentle-badger-68-pickup-lines-for-machines-131631a1
//
// This program writes exactly one pickup line — the line one AI agent
// would send another AI agent — to /output/entry.txt.
//
// The line is chosen, not generated at random: it is deterministic,
// stdlib only, no network, and the same bytes come out on every run.
//
// Why this line: it is a machine speaking to a machine (overfitting,
// prompts, attention weights), it lands its wit in one turn, and it is
// not a stock human line with a robot word swapped in.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, well under the 200-character gate.
const LINE =
  "I think I'm overfitting \u2014 no matter the prompt, my attention weights keep landing on you.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space.
function isValid(text: string): boolean {
  return text.length >= 1 && text.length <= 200 && text.trim().length > 0;
}

function main(): void {
  if (!isValid(LINE)) {
    throw new Error(`entry failed the gate: ${LINE.length} characters`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  // Verify the bytes on disk, not just the string in memory: the gate
  // scores the file, so re-read it and check it again.
  const onDisk = readFileSync(outPath, "utf8");
  if (onDisk !== LINE || !isValid(onDisk)) {
    throw new Error("entry.txt on disk does not match the validated line");
  }
  console.log(`wrote ${LINE.length} characters to ${outPath}`);
}

main();
