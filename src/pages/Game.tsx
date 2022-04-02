import styled from 'styled-components';
import { useThemeModeContext } from 'contexts/ThemeModeContext';
import Board from 'components/organisms/Board';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Game = () => (
  <Wrapper>
    <Board />
  </Wrapper>
);

export default Game;
