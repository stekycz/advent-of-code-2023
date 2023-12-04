import { createInterface } from 'node:readline/promises';

export async function getInputLines(): Promise<string[]> {
  const lines: string[] = [];

  for await (const line of createInterface({
    input: process.stdin,
  })) {
    lines.push(line);
  }

  return lines;
}
