import { ReactNode, createContext, useContext, useState } from 'react';
import BoardType from 'types/BoardType';
import TileValueType from 'types/TileValueType';

interface IBoardContext {
  board: BoardType;
  setTile: (row: number, col: number, value: TileValueType) => void;
}

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

export const useBoardContext = () => useContext(BoardContext);

const BoardProvider = ({ children }: BoardProviderProps) => {
  const [board, setBoard] = useState<BoardType>(initialBoard);

  const setTile = (row: number, col: number, value: TileValueType) => {
    setBoard((prevBoard) => [
      ...prevBoard.slice(0, row),
      [
        ...prevBoard[row].slice(0, col),
        value,
        ...prevBoard[row].slice(col + 1),
      ],
      ...prevBoard.slice(row + 1),
    ]);
  };

  return (
    <BoardContext.Provider value={{ board, setTile }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;