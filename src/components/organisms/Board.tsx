import Tile from 'components/atoms/Tile';
import styled from 'styled-components';

const boardArray = [
  [2, 4, 8, 16],
  [32, 64, 128, 256],
  [512, 1024, 2048, 4096],
  [0, 0, 0, 0],
];

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 500px;
  height: 500px;
  background-color: yellow;
`;

const Board = () => (
  <Wrapper>
    {boardArray.map((row) =>
      row.map((number, index) => <Tile key={index} value={number} />),
    )}
  </Wrapper>
);

export default Board;
