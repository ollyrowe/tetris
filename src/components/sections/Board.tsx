import React from "react";
import { styled } from "styled-components";
import Box from "../layout/Box";
import Block from "../misc/Block";
import Placeholder from "../misc/Placeholder";
import { useGameContext } from "../../providers";
import { Tile } from "../../types";

const Board: React.FC = () => {
  const { tiles, over, paused } = useGameContext();

  return (
    <StyledBox>
      {tiles.map((row, i) => (
        <Row key={i}>
          {row.map((tile, j) => (
            <Placeholder key={j}>{getTileChild(tile)}</Placeholder>
          ))}
        </Row>
      ))}
      {over ? (
        <Overlay>Game Over</Overlay>
      ) : paused ? (
        <Overlay>Paused</Overlay>
      ) : null}
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

const Overlay = styled.div`
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
