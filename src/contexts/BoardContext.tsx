import { ReactNode, createContext, useContext, useState } from 'react';
import BoardType from 'types/BoardType';
import TileValueType from 'types/TileValueType';
import IBoardContext from 'interfaces/IBoardContext';
import { getRandomNumber } from 'utils/math';

interface BoardProviderProps {
  children: ReactNode;
}

const initialBoard: BoardType = [
  [0, 4, 0, 0],
  [0, 4, 0, 0],
  [4, 4, 4, 4],
  [0, 4, 0, 0],
];

const initialContext: IBoardContext = {
  board: initialBoard,
  generateBoard: () => {},
  moveUp: () => {},
  moveRight: () => {},
  moveDown: () => {},
  moveLeft: () => {},
};

const BoardContext = createContext<IBoardContext>(initialContext);

const BoardProvider = ({ children }: BoardProviderProps) => {
  const [board, setBoard] = useState<BoardType>(initialBoard);

  const boardSize = board.length;

  /**
   * Set value in specified tile.
   * @param row Tile row.
   * @param col Tile column.
   * @param value Value to set.
   */
  const setTile = (row: number, col: number, value: TileValueType) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard;
      newBoard[row][col] = value;
      return [...newBoard];
    });
  };

  /**
   * Fill board with zeros.
   */
  const resetBoard = () => {
    for (let i = 0; i < boardSize; i += 1) {
      for (let j = 0; j < boardSize; j += 1) {
        setTile(i, j, 0);
      }
    }
  };

  /**
   * Generate tile with 2 or 4 value in random empty place.
   */
  const generateTile = () => {
    let number;
    let row;
    let col;

    while (number !== 2 && number !== 4) {
      number = getRandomNumber(2, 4);
    }

    do {
      row = getRandomNumber(0, boardSize - 1);
      col = getRandomNumber(0, boardSize - 1);
    } while (board[row][col] !== 0);

    setTile(row, col, number);
  };

  // TODO: Sometimes generates two tiles in one place. Need to be fixed.
  /**
   * Generates two random tiles.
   */
  const generateTwoTiles = () => {
    for (let i = 0; i < 2; i += 1) {
      generateTile();
    }
  };

  /**
   * Generates new board with two random tiles.
   */
  const generateBoard = () => {
    resetBoard();
    generateTwoTiles();
  };

  const merge = (row: Array<TileValueType>): Array<TileValueType> => {
    const mergedRow = row;
    for (let i = 0; i < mergedRow.length - 1; i += 1) {
      if (mergedRow[i] === mergedRow[i + 1]) {
        mergedRow[i + 1] = (mergedRow[i + 1] * 2) as TileValueType;
        mergedRow[i] = 0;
      }
    }
    return mergedRow;
  };

  const mergeRight = () => {
    for (let i = 0; i < board.length; i += 1) {
      const mergedRow = merge(board[i]);
      for (let j = 0; j < mergedRow.length; j += 1) {
        setTile(i, j, mergedRow[j]);
      }
    }
  };

  /**
   * Moving tiles to up.
   */
  const moveUp = () => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard;

      for (let i = 0; i < boardSize; i += 1) {
        for (let j = 0; j < boardSize - 1; j += 1) {
          for (let k = boardSize - 1; k > 0; k -= 1) {
            if (newBoard[k][i] > 0 && newBoard[k - 1][i] === 0) {
              newBoard[k - 1][i] = newBoard[k][i];
              newBoard[k][i] = 0;
            }
          }
        }
      }

      return [...newBoard];
    });

    let row: Array<TileValueType>;
    let mergedRow;
    for (let i = 0; i < board.length; i += 1) {
      row = [0, 0, 0, 0];
      for (let j = board.length - 1; j >= 0; j -= 1) {
        row[board.length - 1 - j] = board[j][i];
      }
      mergedRow = merge(row);
      for (let j = board.length - 1; j >= 0; j -= 1) {
        setTile(j, i, mergedRow[board.length - 1 - j]);
      }
    }

    generateTile();
  };

  /**
   * Pushing tiles to right.
   */
  const pushRight = () => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard;

      for (let i = 0; i < boardSize; i += 1) {
        for (let j = 0; j < boardSize - 1; j += 1) {
          for (let k = 0; k < boardSize - 1; k += 1) {
            if (newBoard[i][k] > 0 && newBoard[i][k + 1] === 0) {
              newBoard[i][k + 1] = newBoard[i][k];
              newBoard[i][k] = 0;
            }
          }
        }
      }

      return [...newBoard];
    });
  };

  /**
   * Moving tiles to right.
   */
  const moveRight = () => {
    pushRight();
    mergeRight();
    pushRight();
    generateTile();
  };

  /**
   * Moving tiles to down.
   */
  const moveDown = () => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard;

      for (let i = 0; i < boardSize; i += 1) {
        for (let j = 0; j < boardSize - 1; j += 1) {
          for (let k = 0; k < boardSize - 1; k += 1) {
            if (newBoard[k][i] > 0 && newBoard[k + 1][i] === 0) {
              newBoard[k + 1][i] = newBoard[k][i];
              newBoard[k][i] = 0;
            }
          }
        }
      }

      return [...newBoard];
    });

    generateTile();
  };

  /**
   * Moving tiles to left.
   */
  const moveLeft = () => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard;

      for (let i = 0; i < boardSize; i += 1) {
        for (let j = 0; j < boardSize - 1; j += 1) {
          for (let k = boardSize - 1; k > 0; k -= 1) {
            if (newBoard[i][k] > 0 && newBoard[i][k - 1] === 0) {
              newBoard[i][k - 1] = newBoard[i][k];
              newBoard[i][k] = 0;
            }
          }
        }
      }

      return [...newBoard];
    });

    generateTile();
  };

  return (
    <BoardContext.Provider
      value={{ board, generateBoard, moveUp, moveRight, moveDown, moveLeft }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);

export default BoardProvider;
