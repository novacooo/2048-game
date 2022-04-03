import BoardType from 'types/BoardType';

interface IBoardContext {
  board: BoardType;
  generateBoard: () => void;
  moveUp: () => void;
  moveRight: () => void;
  moveDown: () => void;
  moveLeft: () => void;
}

export default IBoardContext;
