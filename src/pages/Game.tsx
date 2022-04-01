import { useThemeModeContext } from 'contexts/ThemeModeContext';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Board = styled.div`
  width: 70vmin;
  height: 70vmin;
  background-color: red;
`;

const Game = () => {
  const { toggleTheme } = useThemeModeContext() || {};

  return (
    <Wrapper>
      <Board onClick={toggleTheme} />
    </Wrapper>
  );
};

export default Game;
