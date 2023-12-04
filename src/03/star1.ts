import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { execute } from '../executor';

export interface Position {
  row: number;
  column: number;
}

export interface NumericValue extends Position {
  value: string;
}

const digitRegex = /\d/;

const numberRegex = /(?<value>\d+)/g;

export const generatePositionFromIndex =
  (value: NumericValue) =>
  (index: number): Position => ({
    row:
      index < value.value.length + 2
        ? value.row - 1
        : index > value.value.length + 3
          ? value.row + 1
          : value.row,
    column:
      index < value.value.length + 2
        ? value.column + index - 1
        : index === value.value.length + 2
          ? value.column - 1
          : index === value.value.length + 3
            ? value.column + value.value.length
            : value.column + index - value.value.length - 5,
  });

const isNeighborOfSpecialChar =
  (lines: string[]) =>
  (value: NumericValue): boolean =>
    pipe(
      A.makeBy(
        (value.value.length + 2) * 2 + 2,
        generatePositionFromIndex(value),
      ),
      A.filter(
        (position) =>
          position.row >= 0 &&
          position.row < lines.length &&
          position.column >= 0,
      ),
      A.some((position: Position) =>
        pipe(
          O.fromNullable(lines[position.row]),
          O.match(
            () => false,
            (value) =>
              value[position.column] !== '.' &&
              pipe(
                O.fromNullable(value[position.column]),
                O.match(
                  () => false,
                  (value) => !digitRegex.test(value),
                ),
              ),
          ),
        ),
      ),
    );

const getResult = (lines: string[]): number =>
  pipe(
    lines,
    A.mapWithIndex((index, line) =>
      pipe(
        Array.from(line.matchAll(numberRegex)),
        A.map(
          (match): NumericValue => ({
            row: index,
            column: pipe(
              O.fromNullable(match.index),
              O.match(
                () => 0,
                (index) => index,
              ),
            ),
            value: pipe(
              O.fromNullable(match.groups),
              O.flatMap((groups) => O.fromNullable(groups['value'])),
              O.match(
                () => '0',
                (value) => value,
              ),
            ),
          }),
        ),
      ),
    ),
    A.flatten,
    A.filter(isNeighborOfSpecialChar(lines)),
    A.map((item) => Number.parseInt(item.value, 10)),
    A.reduce(0, (acc, id) => acc + id),
  );

execute(getResult);
