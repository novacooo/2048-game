import styled from 'styled-components';
import Board from 'components/organisms/Board';
import { useThemeModeContext } from 'contexts/ThemeModeContext';
import { useBoardContext } from 'contexts/BoardContext';
import { KeyboardEvent, useEffect, useRef } from 'react';

enum KeyCodes {
  ARROW_UP = 'ArrowUp',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft',
  KEY_R = 'KeyR',
}

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { toggleTheme } = useThemeModeContext() || {};
  const boardContext = useBoardContext();

  useEffect(() => {
    wrapperRef.current?.focus();
  }, [wrapperRef]);

  if (!boardContext) return null;
  const { generateBoard, moveUp, moveRight, moveDown, moveLeft } = boardContext;

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === KeyCodes.KEY_R) generateBoard();
    if (e.code === KeyCodes.ARROW_UP) moveUp();
    if (e.code === KeyCodes.ARROW_RIGHT) moveRight();
    if (e.code === KeyCodes.ARROW_DOWN) moveDown();
    if (e.code === KeyCodes.ARROW_LEFT) moveLeft();
  };

  return (
    <Wrapper ref={wrapperRef} onKeyDown={handleKeyboardEvent} tabIndex={0}>
      <NavigationWrapper>
        <button onClick={toggleTheme}>Toggle theme</button>
        <button onClick={generateBoard}>Generate board</button>
        <button onClick={moveUp}>Move up</button>
        <button onClick={moveDown}>Move down</button>
        <button onClick={moveRight}>Move right</button>
        <button onClick={moveLeft}>Move left</button>
      </NavigationWrapper>
      <Board />
    </Wrapper>
  );
};

export default Game;
