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
    const boardSize = board.length;
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
    const boardSize = board.length;

    for (let i = 0; i < 2; i += 1) {
      let number;
      while (number !== 2 && number !== 4) number = getRandomNumber(2, 4);
      const row = getRandomNumber(0, boardSize - 1);
      const col = getRandomNumber(0, boardSize - 1);
      setTile(row, col, number);
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
   * Moving tiles to right side.
   */
  const moveRight = () => {
    setBoard((prevBoard) => {
      const boardSize = board.length;
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
      setTile(0, 3, 8);
      return [...newBoard];
    });
  };

  return (
    <BoardContext.Provider value={{ board, generateBoard, moveRight }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);

export default BoardProvider;
