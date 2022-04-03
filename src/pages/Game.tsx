import styled from 'styled-components';
import Board from 'components/organisms/Board';
import { useThemeModeContext } from 'contexts/ThemeModeContext';

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
      <button onClick={toggleTheme}>Toggle theme</button>
      <Board />
    </Wrapper>
  );
};

export default Game;
