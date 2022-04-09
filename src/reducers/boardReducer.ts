import BoardType from 'types/BoardType';
import TileValueType from 'types/TileValueType';
import { getRandomNumber } from 'utils/math';

export enum BoardActionKind {
  RESET_BOARD = 'RESET_BOARD',
  GENERATE_TILE = 'GENERATE_TILE',
  MERGE = 'MERGE',
  MOVE = 'MOVE',
}

export enum DirectionKind {
  UP = 'UP',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
}

export interface BoardState {
  board: BoardType;
  score: number;
}

export interface BoardAction {
  type: BoardActionKind;
  direction?: DirectionKind;
}

const getRow = (board: BoardType, i: number, direction: DirectionKind) => {
  let row;

  if (direction === DirectionKind.RIGHT) row = board[i];
  if (direction === DirectionKind.LEFT) row = board[i].reverse();
  if (direction === DirectionKind.UP) row = board.map((el) => el[i]).reverse();
  if (direction === DirectionKind.DOWN) row = board.map((el) => el[i]);

  return row;
};

export const boardReducer = (state: BoardState, action: BoardAction) => {
  const { type, direction } = action;

  let newBoard: BoardType;
  let newScore: number;
  let tileValue: TileValueType;
  let number;
  let row;
  let col;

  switch (type) {
    case BoardActionKind.RESET_BOARD:
      return {
        ...state,
        score: 0,
        board: state.board.map((el) => el.fill(0)),
      };
    case BoardActionKind.GENERATE_TILE:
      newBoard = state.board;

      while (number !== 2 && number !== 4) {
        number = getRandomNumber(2, 4);
      }

      do {
        row = getRandomNumber(0, 3);
        col = getRandomNumber(0, 3);
      } while (newBoard[row][col] !== 0);

      newBoard[row][col] = number;

      return {
        ...state,
        board: newBoard,
      };
    case BoardActionKind.MERGE:
      newBoard = state.board;
      newScore = state.score;

      for (let i = 0; i < 4; i += 1) {
        row = getRow(newBoard, i, direction as DirectionKind);

        if (row) {
          for (let j = 0; j < 3; j += 1) {
            if (row[j] === row[j + 1]) {
              tileValue = (row[j + 1] * 2) as TileValueType;
              row[j + 1] = tileValue;
              row[j] = 0;
              newScore += tileValue;
            }
          }

          // Rows
          if (direction === DirectionKind.RIGHT) newBoard[i] = row;
          if (direction === DirectionKind.LEFT) newBoard[i] = row.reverse();

          // Columns
          if (direction === DirectionKind.UP) row = row.reverse();
          if (
            direction === DirectionKind.UP ||
            direction === DirectionKind.DOWN
          ) {
            for (let j = 0; j < 4; j += 1) {
              newBoard[j][i] = row[j];
            }
          }
        }
      }

      return {
        ...state,
        score: newScore,
        board: newBoard,
      };
    case BoardActionKind.MOVE:
      newBoard = state.board;

      for (let i = 0; i < 4; i += 1) {
        row = getRow(newBoard, i, direction as DirectionKind);

        if (row) {
          for (let j = 0; j < 4; j += 1) {
            for (let k = 0; k < 3; k += 1) {
              if (row[k] > 0 && row[k + 1] === 0) {
                row[k + 1] = row[k];
                row[k] = 0;
              }
            }
          }

          // Rows
          if (direction === DirectionKind.RIGHT) newBoard[i] = row;
          if (direction === DirectionKind.LEFT) newBoard[i] = row.reverse();

          // Columns
          if (direction === DirectionKind.UP) row = row.reverse();
          if (
            direction === DirectionKind.UP ||
            direction === DirectionKind.DOWN
          ) {
            for (let j = 0; j < 4; j += 1) {
              newBoard[j][i] = row[j];
            }
          }
        }
      }

      return {
        ...state,
        board: newBoard,
      };
    default:
      return state;
  }
};
