import BoardType from 'types/BoardType';

interface IBoardContext {
  board: BoardType;
  score: number;
  resetGame: () => void;
  moveUp: () => void;
  moveRight: () => void;
  moveDown: () => void;
  moveLeft: () => void;
}

export default IBoardContext;
