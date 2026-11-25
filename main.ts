// The Internet in One Word — make.fun bounty entry.
//
// Writes a single word describing the whole internet to /output/entry.txt.
// Gate: the output must be UTF-8 text of 1–30 characters, not only whitespace,
// and exactly one word.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const WORD = "feral";
const OUTPUT_PATH = "/output/entry.txt";

// Gate validation, mirroring the sealed scorer's rules.
function validate(word: string): void {
  if (word.length < 1 || word.length > 30) {
    throw new Error(`word must be 1-30 characters, got ${word.length}`);
  }
  if (word.trim().length === 0) {
    throw new Error("word must not be only whitespace");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be exactly one word (no whitespace)");
  }
  // The gate counts characters, but a control character would corrupt the
  // entry file even while passing a length check — reject it outright.
  if (/[\u0000-\u001F\u007F]/.test(word)) {
    throw new Error("word must not contain control characters");
  }
}

validate(WORD);

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, WORD, "utf8");
const bytes = Buffer.byteLength(WORD, "utf8");
console.log(`wrote ${JSON.stringify(WORD)} (${WORD.length} chars, ${bytes} bytes) to ${OUTPUT_PATH}`);
