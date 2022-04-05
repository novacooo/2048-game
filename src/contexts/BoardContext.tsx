import { ReactNode, createContext, useContext, useReducer } from 'react';
import BoardType from 'types/BoardType';
import IBoardContext from 'interfaces/IBoardContext';
import {
  BoardActionKind,
  boardReducer,
  BoardState,
  DirectionKind,
} from 'reducers/boardReducer';

interface BoardProviderProps {
  children: ReactNode;
}

const initialBoard: BoardType = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
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
