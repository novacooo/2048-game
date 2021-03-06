import styled from 'styled-components';
import dimens from 'styles/dimens';
import Tile from 'components/atoms/Tile';
import { useBoardContext } from 'contexts/BoardContext';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: ${dimens.boardGap};
  padding: ${dimens.boardPadding};
  width: ${dimens.boardSize};
  height: ${dimens.boardSize};
  background-color: ${({ theme }) => theme.bgBoard};
  border-radius: ${dimens.boardRadius};
`;

const Board = () => {
  const { board } = useBoardContext() || {};

  return (
    <Wrapper>
      {board?.map((row) =>
        row.map((number, index) => <Tile key={index} value={number} />),
      )}
    </Wrapper>
  );
};

export default Board;
