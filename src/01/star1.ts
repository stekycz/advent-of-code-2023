import { createInterface } from 'node:readline/promises';
import * as A from 'fp-ts/Array';
import * as NEA from 'fp-ts/NonEmptyArray';
import { pipe } from 'fp-ts/function';

async function getResult(): Promise<number> {
  const lines = [];
  for await (const line of createInterface({
    input: process.stdin,
  })) {
    lines.push(line);
  }

  return pipe(
    lines,
    A.map((line): string[] =>
      pipe(
        Array.from(line.matchAll(/\d/g)),
        A.filter(A.isNonEmpty),
        A.map(NEA.head),
      ),
    ),
    A.filter(A.isNonEmpty),
    A.map((matches) => `${NEA.head(matches)}${NEA.last(matches)}`),
    A.map((match) => Number.parseInt(match, 10)),
    A.reduce(0, (acc, value) => acc + value),
  );
}

getResult()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
