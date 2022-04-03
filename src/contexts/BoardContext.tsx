import { ReactNode, createContext, useContext, useState } from 'react';
import BoardType from 'types/BoardType';
import TileValueType from 'types/TileValueType';
import IBoardContext from 'interfaces/IBoardContext';

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

  const setTile = (row: number, col: number, value: TileValueType) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard;
      newBoard[row][col] = value;
      return [...newBoard];
    });
  };

  const moveRight = () => {
    const boardSize = board.length;
    const newBoard = board;

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

    setBoard(() => [...newBoard]);
  };

  return (
    <BoardContext.Provider value={{ board, setTile, moveRight }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);

export default BoardProvider;
