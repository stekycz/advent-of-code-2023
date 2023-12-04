import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { execute } from '../executor';

interface Game<T> {
  id: T;
  parts: T;
}

interface GamePart {
  red: number;
  green: number;
  blue: number;
}

interface ColorCountGroups {
  color: string;
  count: string;
}

function isColorCountGroups(value: unknown): value is ColorCountGroups {
  return (
    typeof value === 'object' &&
    value !== null &&
    'color' in value &&
    typeof value.color === 'string' &&
    'count' in value &&
    typeof value.count === 'string'
  );
}

const GAME_LINE_REGEX = /^Game (?<id>\d+): (?<games>.*)$/;

const getGamePart = (game: string): GamePart =>
  pipe(
    game.split(','),
    A.map((part) => /(?<count>\d+) (?<color>red|green|blue)/.exec(part)),
    A.map(O.fromNullable),
    A.filter(O.isSome),
    A.map((part) => O.fromNullable(part.value.groups)),
    A.filter(O.isSome),
    A.map((groups) => groups.value),
    A.filter(isColorCountGroups),
    A.map((groups) => ({ [groups.color]: Number.parseInt(groups.count, 10) })),
    A.reduce({ red: 0, green: 0, blue: 0 }, (acc: GamePart, game) => ({
      ...acc,
      ...game,
    })),
  );

const getGames = (games: string[]): GamePart[] =>
  pipe(
    games,
    A.flatMap((game) => game.split(';')),
    A.map(getGamePart),
  );

const isGameValid = (
  game: Game<O.Option<string>>,
): game is Game<O.Some<string>> => O.isSome(game.id) && O.isSome(game.parts);

const getResult = (lines: string[]): number =>
  pipe(
    lines,
    A.map((line) => O.fromNullable(GAME_LINE_REGEX.exec(line))),
    A.filter(O.isSome),
    A.map((match) => O.fromNullable(match.value.groups)),
    A.filter(O.isSome),
    A.map((groups) => ({
      id: O.fromNullable(groups.value['id']),
      parts: O.fromNullable(groups.value['games']),
    })),
    A.filter(isGameValid),
    A.map((match) => ({
      id: Number.parseInt(match.id.value, 10),
      parts: getGames(match.parts.value.split(',')),
    })),
    A.map((game) =>
      pipe(
        game.parts,
        A.reduce({ red: 0, green: 0, blue: 0 }, (minimalSet, gamePart) => ({
          red: Math.max(minimalSet.red, gamePart.red),
          green: Math.max(minimalSet.green, gamePart.green),
          blue: Math.max(minimalSet.blue, gamePart.blue),
        })),
        (game) => game.red * game.green * game.blue,
      ),
    ),
    A.reduce(0, (acc, game) => acc + game),
  );

execute(getResult);
