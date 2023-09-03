import React from "react";
import { styled } from "styled-components";
import Block from "./Block";
import Placeholder from "./Placeholder";
import { useScreenSize } from "../providers";
import { Tetrimino, TetriminoType, createTetrimino } from "../model";
import { Tile } from "../types";

interface Props {
  type?: TetriminoType;
}

const Preview: React.FC<Props> = ({ type }) => {
  const screenSize = useScreenSize();

  const tetrimino = type ? createTetrimino(type) : undefined;

  const tiles = tetrimino ? createTiles(tetrimino) : [];

  return (
    <Container pad={screenSize === "large"}>
      {tiles.map((row, i) => (
        <Row key={i}>
          {row.map((tile, j) => (
            <Placeholder key={j} size="small" borderless>
              {tile.type === "block" && <Block {...tile.block} size="small" />}
            </Placeholder>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Preview;

const createTiles = (tetrimino: Tetrimino) => {
  const { startX, endX, startY, endY } = getTetriminoBounds(tetrimino);

  const width = endX - startX + 1;
  const height = endY - startY + 1;

  const tiles: Tile[][] = [];

  for (let y = 0; y < height; y++) {
    const row: Tile[] = [];

    for (let x = 0; x < width; x++) {
      const block = tetrimino.blocks.find(
        (block) => block.x === x + startX && block.y === y + startY
      );

      if (block) {
        row.push({ type: "block", block });
      } else {
        row.push({ type: "empty" });
      }
    }

    tiles.push(row);
  }

  return tiles;
};

const getTetriminoBounds = (tetrimino: Tetrimino) => {
  const firstBlock = tetrimino.blocks[0];

  let startX = firstBlock.x;
  let endX = firstBlock.x;

  let startY = firstBlock.y;
  let endY = firstBlock.y;

  for (const block of tetrimino.blocks) {
    if (block.x < startX) startX = block.x;

    if (block.x > endX) endX = block.x;

    if (block.y < startY) startY = block.y;

    if (block.y > endY) endY = block.y;
  }

  return { startX, endX, startY, endY };
};

interface ContainerProps {
  pad: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  min-width: 48px;
  padding: ${(props) => `8px ${props.pad ? "8px" : "0px"}`};
`;

const Row = styled.div`
  display: flex;
`;
