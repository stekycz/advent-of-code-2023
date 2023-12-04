import {
  generatePositionFromIndex,
  type NumericValue,
  type Position,
} from '../star1';

interface GeneratePositionFromIndexTestCase {
  index: number;
  value: NumericValue;
  expectedPosition: Position;
}

describe('03/star1', () => {
  describe('generatePositionFromIndex', () => {
    it.each`
      index | value                                    | expectedPosition
      ${0}  | ${{ row: 0, column: 0, value: '3' }}     | ${{ row: -1, column: -1 }}
      ${1}  | ${{ row: 0, column: 0, value: '3' }}     | ${{ row: -1, column: 0 }}
      ${2}  | ${{ row: 0, column: 0, value: '3' }}     | ${{ row: -1, column: 1 }}
      ${3}  | ${{ row: 0, column: 0, value: '3' }}     | ${{ row: 0, column: -1 }}
      ${4}  | ${{ row: 0, column: 0, value: '3' }}     | ${{ row: 0, column: 1 }}
      ${5}  | ${{ row: 0, column: 0, value: '3' }}     | ${{ row: 1, column: -1 }}
      ${6}  | ${{ row: 0, column: 0, value: '3' }}     | ${{ row: 1, column: 0 }}
      ${7}  | ${{ row: 0, column: 0, value: '3' }}     | ${{ row: 1, column: 1 }}
      ${0}  | ${{ row: 10, column: 10, value: '123' }} | ${{ row: 9, column: 9 }}
      ${1}  | ${{ row: 10, column: 10, value: '123' }} | ${{ row: 9, column: 10 }}
      ${2}  | ${{ row: 10, column: 10, value: '123' }} | ${{ row: 9, column: 11 }}
      ${3}  | ${{ row: 10, column: 10, value: '123' }} | ${{ row: 9, column: 12 }}
      ${4}  | ${{ row: 10, column: 10, value: '123' }} | ${{ row: 9, column: 13 }}
      ${5}  | ${{ row: 10, column: 10, value: '123' }} | ${{ row: 10, column: 9 }}
      ${6}  | ${{ row: 10, column: 10, value: '123' }} | ${{ row: 10, column: 13 }}
      ${7}  | ${{ row: 10, column: 10, value: '123' }} | ${{ row: 11, column: 9 }}
      ${8}  | ${{ row: 10, column: 10, value: '123' }} | ${{ row: 11, column: 10 }}
      ${9}  | ${{ row: 10, column: 10, value: '123' }} | ${{ row: 11, column: 11 }}
      ${10} | ${{ row: 10, column: 10, value: '123' }} | ${{ row: 11, column: 12 }}
      ${11} | ${{ row: 10, column: 10, value: '123' }} | ${{ row: 11, column: 13 }}
    `(
      'returns expected position for index $index and value $value',
      ({
        index,
        value,
        expectedPosition,
      }: GeneratePositionFromIndexTestCase) => {
        expect(generatePositionFromIndex(value)(index)).toStrictEqual(
          expectedPosition,
        );
      },
    );
  });
});
