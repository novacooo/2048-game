import { useBoardContext } from 'contexts/BoardContext';
import styled from 'styled-components';
import dimens from 'styles/dimens';
import font from 'styles/font';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${dimens.boardSize};
`;

const Header = styled.h1`
  font-size: ${font.sizeHeader};
  font-weight: ${font.weightBold};
  color: ${({ theme }) => theme.textPrimary};
`;

const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 10px 30px;
  min-width: 150px;
  border-radius: ${dimens.scoreRadius};
  background-color: ${({ theme }) => theme.bgBoard};
`;

const ScoreHeader = styled.p`
  font-size: ${font.sizeScoreHeader};
  font-weight: ${font.weightBold};
  color: ${({ theme }) => theme.textSecondary};
`;

const Score = styled.h2`
  font-size: ${font.sizeScore};
  font-weight: ${font.weightBold};
  color: ${({ theme }) => theme.textWhite};
`;

const GameInfo = () => {
  const { score } = useBoardContext();

  return (
    <Wrapper>
      <Header>2048</Header>
      <ScoreWrapper>
        <ScoreHeader>Score</ScoreHeader>
        <Score>{score}</Score>
      </ScoreWrapper>
    </Wrapper>
  );
};

export default GameInfo;
