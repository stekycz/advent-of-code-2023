import { getInputLines } from './reader';

export function execute(fn: (lines: string[]) => number) {
  getInputLines()
    .then((lines) => {
      console.log(fn(lines));
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
