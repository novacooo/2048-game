import BoardType from 'types/BoardType';

interface IBoardContext {
  board: BoardType;
  generateBoard: () => void;
  moveRight: () => void;
}

export default IBoardContext;
