import styled from 'styled-components';
import { useThemeModeContext } from 'contexts/ThemeModeContext';
import Board from 'components/organisms/Board';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Game = () => {
  const { toggleTheme } = useThemeModeContext() || {};

  return (
    <Wrapper>
      <button onClick={toggleTheme}>toggle theme</button>
      <Board />
    </Wrapper>
  );
};

export default Game;
