import { Option, Struct } from '@ephox/katamari';

import * as Cycles from '../alien/Cycles';

const outcome = Struct.immutableBag([ 'rowIndex', 'columnIndex', 'cell' ], [ ]);

const toCell = function (matrix, rowIndex, columnIndex) {
  return Option.from(matrix[rowIndex]).bind(function (row) {
    return Option.from(row[columnIndex]).map(function (cell) {
      return outcome({
        rowIndex,
        columnIndex,
        cell
      });
    });
  });
};

const cycleHorizontal = function (matrix, rowIndex, startCol, deltaCol) {
  const row = matrix[rowIndex];
  const colsInRow = row.length;
  const newColIndex = Cycles.cycleBy(startCol, deltaCol, 0, colsInRow - 1);
  return toCell(matrix, rowIndex, newColIndex);
};

const cycleVertical = function (matrix, colIndex, startRow, deltaRow) {
  const nextRowIndex = Cycles.cycleBy(startRow, deltaRow, 0, matrix.length - 1);
  const colsInNextRow = matrix[nextRowIndex].length;
  const nextColIndex = Cycles.cap(colIndex, 0, colsInNextRow - 1);
  return toCell(matrix, nextRowIndex, nextColIndex);
};

const moveHorizontal = function (matrix, rowIndex, startCol, deltaCol) {
  const row = matrix[rowIndex];
  const colsInRow = row.length;
  const newColIndex = Cycles.cap(startCol + deltaCol, 0, colsInRow - 1);
  return toCell(matrix, rowIndex, newColIndex);
};

const moveVertical = function (matrix, colIndex, startRow, deltaRow) {
  const nextRowIndex = Cycles.cap(startRow + deltaRow, 0, matrix.length - 1);
  const colsInNextRow = matrix[nextRowIndex].length;
  const nextColIndex = Cycles.cap(colIndex, 0, colsInNextRow - 1);
  return toCell(matrix, nextRowIndex, nextColIndex);
};

// return address(Math.floor(index / columns), index % columns);
const cycleRight = function (matrix, startRow, startCol) {
  return cycleHorizontal(matrix, startRow, startCol, +1);
};

const cycleLeft = function (matrix, startRow, startCol) {
  return cycleHorizontal(matrix, startRow, startCol, -1);
};

const cycleUp = function (matrix, startRow, startCol) {
  return cycleVertical(matrix, startCol, startRow, -1);
};

const cycleDown = function (matrix, startRow, startCol) {
  return cycleVertical(matrix, startCol, startRow, +1);
};

const moveLeft = function (matrix, startRow, startCol) {
  return moveHorizontal(matrix, startRow, startCol, -1);
};

const moveRight = function (matrix, startRow, startCol) {
  return moveHorizontal(matrix, startRow, startCol, +1);
};

const moveUp = function (matrix, startRow, startCol) {
  return moveVertical(matrix, startCol, startRow, -1);
};

const moveDown = function (matrix, startRow, startCol) {
  return moveVertical(matrix, startCol, startRow, +1);
};

export {
  cycleRight,
  cycleLeft,
  cycleUp,
  cycleDown,

  moveLeft,
  moveRight,
  moveUp,
  moveDown
};