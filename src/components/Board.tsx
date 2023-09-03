import React from "react";
import { styled } from "styled-components";
import Box from "./Box";
import Block from "./Block";
import Placeholder from "./Placeholder";
import { Tile } from "../types";

interface Props {
  tiles: Tile[][];
  over: boolean;
}

const Board: React.FC<Props> = ({ tiles, over }) => {
  return (
    <StyledBox>
      {tiles.map((row, i) => (
        <Row key={i}>
          {row.map((tile, j) => (
            <Placeholder key={j}>{getTileChild(tile)}</Placeholder>
          ))}
        </Row>
      ))}
      {over && <OverText>Game Over</OverText>}
    </StyledBox>
  );
};

export default Board;

const getTileChild = (tile: Tile) => {
  switch (tile.type) {
    case "block":
      return <Block {...tile.block} />;
    case "guide":
      return <Block {...tile.guide} transparent />;
  }
};

const StyledBox = styled(Box)`
  z-index: 1;
`;

const Row = styled.div`
  display: flex;
`;

const OverText = styled.div`
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
  font-size: xxx-large;
`;
