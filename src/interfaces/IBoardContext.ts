import BoardType from 'types/BoardType';

interface IBoardContext {
  board: BoardType;
  resetGame: () => void;
  moveUp: () => void;
  moveRight: () => void;
  moveDown: () => void;
  moveLeft: () => void;
}

export default IBoardContext;
