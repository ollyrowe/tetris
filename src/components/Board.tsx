import React from "react";
import { styled } from "styled-components";
import Box from "./Box";
import Block from "./Block";
import Placeholder from "./Placeholder";
import { useScreenSize, ScreenSize } from "../providers";
import { Tile } from "../types";

interface Props {
  tiles: Tile[][];
  over: boolean;
}

const Board: React.FC<Props> = ({ tiles, over }) => {
  const screenSize = useScreenSize();

  const getTileChild = (tile: Tile) => {
    switch (tile.type) {
      case "block":
        return <Block {...tile.block} size={screenSize} />;
      case "guide":
        return <Block {...tile.guide} size={screenSize} transparent />;
    }
  };

  return (
    <StyledBox>
      {tiles.map((row, i) => (
        <Row key={i}>
          {row.map((tile, j) => (
            <Placeholder key={j} size={screenSize}>
              {getTileChild(tile)}
            </Placeholder>
          ))}
        </Row>
      ))}
      {over && <Over />}
    </StyledBox>
  );
};

export default Board;

const StyledBox = styled(Box)`
  z-index: 1;
`;

const Row = styled.div`
  display: flex;
`;

const Over: React.FC = () => {
  const screenSize = useScreenSize();

  return <OverText size={screenSize}>Game Over</OverText>;
};

interface OverTextProps {
  size: ScreenSize;
}

const OverText = styled.div<OverTextProps>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: ${(props) => getFontSize(props.size)};
`;

const getFontSize = (size: ScreenSize) => {
  switch (size) {
    case "small":
      return "x-large";
    case "medium":
      return "xx-large";
    case "large":
      return "xxx-large";
  }
};
