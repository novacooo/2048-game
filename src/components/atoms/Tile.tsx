import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';

interface WrapperProps {
  color: string;
}

interface SquareProps {
  value: number;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
`;

const Tile = ({ value }: SquareProps) => {
  const { tileColors } = useTheme();
  const [color, setColor] = useState<string>(tileColors[0]);

  useEffect(() => {
    if (value !== 0) {
      for (let i = 1; i < tileColors.length; i += 1) {
        if (value === 2 ** i) {
          setColor(tileColors[i]);
          return;
        }
        setColor(tileColors.at(-1) as string);
      }
    }
  }, [tileColors, value]);

  return <Wrapper color={color}>{value}</Wrapper>;
};

export default Tile;
