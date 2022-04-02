import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import dimens from 'styles/dimens';
import font from 'styles/font';

interface WrapperProps {
  bgColor: string;
  textColor: string;
}

interface SquareProps {
  value: number;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: ${dimens.tileRadius};
  font-size: ${font.sizeTile};
  font-weight: ${font.weightBold};
  color: ${({ textColor }) => textColor};
  user-select: none;
`;

const Tile = ({ value }: SquareProps) => {
  const { textTileDark, textTileLight, tileColors } = useTheme();
  const [bgColor, setBgColor] = useState<string>(tileColors[0]);
  const [textColor, setTextColor] = useState<string>(textTileDark);

  useEffect(() => {
    if (value !== 0) {
      for (let i = 1; i < tileColors.length; i += 1) {
        if (value === 2 ** i) {
          setBgColor(tileColors[i]);
          break;
        }
        setBgColor(tileColors.at(-1) as string);
      }
    }

    if (value > 4) setTextColor(textTileLight);
    else setTextColor(textTileDark);
  }, [textTileDark, textTileLight, tileColors, value]);

  return (
    <Wrapper bgColor={bgColor} textColor={textColor}>
      {value > 0 && value}
    </Wrapper>
  );
};

export default Tile;
