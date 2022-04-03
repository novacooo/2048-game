import BoardType from 'types/BoardType';
import TileValueType from 'types/TileValueType';

interface IBoardContext {
  board: BoardType;
  setTile: (row: number, col: number, value: TileValueType) => void;
  moveRight: () => void;
}

export default IBoardContext;
