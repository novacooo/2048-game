import styled from 'styled-components';
import Board from 'components/organisms/Board';
import { useThemeModeContext } from 'contexts/ThemeModeContext';
import { useBoardContext } from 'contexts/BoardContext';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 50px;
`;

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Game = () => {
  const { toggleTheme } = useThemeModeContext() || {};
  const { generateBoard, moveRight } = useBoardContext() || {};

  return (
    <Wrapper>
      <NavigationWrapper>
        <button onClick={toggleTheme}>Toggle theme</button>
        <button onClick={generateBoard}>Generate board</button>
        <button>Move up</button>
        <button>Move down</button>
        <button onClick={moveRight}>Move right</button>
        <button>Move left</button>
      </NavigationWrapper>
      <Board />
    </Wrapper>
  );
};

export default Game;
