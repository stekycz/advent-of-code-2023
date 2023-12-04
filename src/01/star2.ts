import * as A from 'fp-ts/Array';
import * as NEA from 'fp-ts/NonEmptyArray';
import * as Ord from 'fp-ts/Ord';
import { pipe } from 'fp-ts/function';
import { getInputLines } from '../reader';

const translateTable: Record<string, string> = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const wordRegexes = pipe(
  Object.keys(translateTable),
  A.map((key) => new RegExp(key, 'g')),
);
const allRegexes = [/\d/g, ...wordRegexes];

async function getResult(): Promise<number> {
  const lines = await getInputLines();

  return pipe(
    lines,
    A.map((line): string[] =>
      pipe(
        pipe(
          allRegexes,
          A.flatMap((regex) => Array.from(line.matchAll(regex))),
          A.sort(
            Ord.contramap((match: RegExpMatchArray) => match.index ?? 0)(
              Ord.fromCompare((a: number, b: number) => {
                return a === b ? 0 : a < b ? -1 : 1;
              }),
            ),
          ),
        ),
        A.filter(A.isNonEmpty),
        A.map(NEA.head),
        A.map((match) => translateTable[match] ?? match),
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
