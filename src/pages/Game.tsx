import styled from 'styled-components';
import GameInfo from 'components/molecules/GameInfo';
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
  KEY_T = 'KeyT',
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 30px;
`;

const Game = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { toggleTheme } = useThemeModeContext();
  const { resetGame, moveUp, moveRight, moveDown, moveLeft } =
    useBoardContext();

  useEffect(() => {
    wrapperRef.current?.focus();
  }, [wrapperRef]);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === KeyCodes.KEY_R) resetGame();
    if (e.code === KeyCodes.KEY_T) toggleTheme();
    if (e.code === KeyCodes.ARROW_UP) moveUp();
    if (e.code === KeyCodes.ARROW_RIGHT) moveRight();
    if (e.code === KeyCodes.ARROW_DOWN) moveDown();
    if (e.code === KeyCodes.ARROW_LEFT) moveLeft();
  };

  return (
    <Wrapper ref={wrapperRef} onKeyDown={handleKeyboardEvent} tabIndex={0}>
      <GameInfo />
      <Board />
    </Wrapper>
  );
};

export default Game;
