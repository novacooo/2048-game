import { ReactNode, createContext, useContext, useState } from 'react';
import BoardType from 'types/BoardType';
import TileValueType from 'types/TileValueType';
import IBoardContext from 'interfaces/IBoardContext';
import { getRandomNumber } from 'utils/math';

interface BoardProviderProps {
  children: ReactNode;
}

const initialBoard: BoardType = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const BoardContext = createContext<IBoardContext | undefined>(undefined);

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
   * Generates two tiles in random places with 2 or 4 value.
   */
  const generateTwoTiles = () => {
    let prevRow;
    let prevCol;
    for (let i = 0; i < 2; i += 1) {
      let number;
      let row;
      let col;

      while (number !== 2 && number !== 4) {
        number = getRandomNumber(2, 4);
      }

      do {
        row = getRandomNumber(0, boardSize - 1);
        col = getRandomNumber(0, boardSize - 1);
      } while (row === prevRow && col === prevCol);

      setTile(row, col, number);

      prevRow = row;
      prevCol = col;
    }
  };

  /**
   * Generates new board with two random tiles.
   */
  const generateBoard = () => {
    resetBoard();
    generateTwoTiles();
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
  };

  /**
   * Moving tiles to right.
   */
  const moveRight = () => {
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
