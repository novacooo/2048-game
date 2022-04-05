import { ReactNode, createContext, useContext, useReducer } from 'react';
import BoardType from 'types/BoardType';
import IBoardContext from 'interfaces/IBoardContext';
import { getRandomNumber } from 'utils/math';
import TileValueType from 'types/TileValueType';

enum BoardActionKind {
  RESET_BOARD = 'RESET_BOARD',
  GENERATE_TILE = 'GENERATE_TILE',
  MERGE = 'MERGE',
  MOVE = 'MOVE',
}

enum DirectionKind {
  UP = 'UP',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
}

interface BoardAction {
  type: BoardActionKind;
  direction?: DirectionKind;
}

interface BoardState {
  board: BoardType;
}

interface BoardProviderProps {
  children: ReactNode;
}

const initialBoard: BoardType = [
  [0, 4, 0, 0],
  [0, 4, 0, 0],
  [4, 4, 4, 4],
  [0, 4, 0, 0],
];

const initialState: BoardState = {
  board: initialBoard,
};

const initialContext: IBoardContext = {
  board: initialBoard,
  resetGame: () => {},
  moveUp: () => {},
  moveRight: () => {},
  moveDown: () => {},
  moveLeft: () => {},
};

const boardReducer = (state: BoardState, action: BoardAction) => {
  const { type, direction } = action;

  let newBoard: BoardType;
  let number;
  let row;
  let col;

  switch (type) {
    case BoardActionKind.RESET_BOARD:
      return {
        ...state,
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

      for (let i = 0; i < 4; i += 1) {
        row = undefined;
        if (direction === DirectionKind.RIGHT) row = newBoard[i];
        if (direction === DirectionKind.LEFT) row = newBoard[i].reverse();
        if (direction === DirectionKind.UP)
          row = newBoard.map((el) => el[i]).reverse();
        if (direction === DirectionKind.DOWN) row = newBoard.map((el) => el[i]);

        if (row) {
          for (let j = 0; j < 3; j += 1) {
            if (row[j] === row[j + 1]) {
              row[j + 1] = (row[j + 1] * 2) as TileValueType;
              row[j] = 0;
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
    case BoardActionKind.MOVE:
      newBoard = state.board;

      for (let i = 0; i < 4; i += 1) {
        row = undefined;
        if (direction === DirectionKind.RIGHT) row = newBoard[i];
        if (direction === DirectionKind.LEFT) row = newBoard[i].reverse();
        if (direction === DirectionKind.UP)
          row = newBoard.map((el) => el[i]).reverse();
        if (direction === DirectionKind.DOWN) row = newBoard.map((el) => el[i]);

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

const BoardContext = createContext<IBoardContext>(initialContext);

const BoardProvider = ({ children }: BoardProviderProps) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  const resetGame = () => {
    dispatch({ type: BoardActionKind.RESET_BOARD });
    dispatch({ type: BoardActionKind.GENERATE_TILE });
    dispatch({ type: BoardActionKind.GENERATE_TILE });
  };

  const moveUp = () => {
    dispatch({ type: BoardActionKind.MOVE, direction: DirectionKind.UP });
    dispatch({ type: BoardActionKind.MERGE, direction: DirectionKind.UP });
    dispatch({ type: BoardActionKind.MOVE, direction: DirectionKind.UP });
    dispatch({ type: BoardActionKind.GENERATE_TILE });
  };

  const moveRight = () => {
    dispatch({ type: BoardActionKind.MOVE, direction: DirectionKind.RIGHT });
    dispatch({ type: BoardActionKind.MERGE, direction: DirectionKind.RIGHT });
    dispatch({ type: BoardActionKind.MOVE, direction: DirectionKind.RIGHT });
    dispatch({ type: BoardActionKind.GENERATE_TILE });
  };

  const moveDown = () => {
    dispatch({ type: BoardActionKind.MOVE, direction: DirectionKind.DOWN });
    dispatch({ type: BoardActionKind.MERGE, direction: DirectionKind.DOWN });
    dispatch({ type: BoardActionKind.MOVE, direction: DirectionKind.DOWN });
    dispatch({ type: BoardActionKind.GENERATE_TILE });
  };

  const moveLeft = () => {
    dispatch({ type: BoardActionKind.MOVE, direction: DirectionKind.LEFT });
    dispatch({ type: BoardActionKind.MERGE, direction: DirectionKind.LEFT });
    dispatch({ type: BoardActionKind.MOVE, direction: DirectionKind.LEFT });
    dispatch({ type: BoardActionKind.GENERATE_TILE });
  };

  return (
    <BoardContext.Provider
      value={{
        board: state.board,
        resetGame,
        moveUp,
        moveRight,
        moveDown,
        moveLeft,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);

export default BoardProvider;
