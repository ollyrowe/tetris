import React, { useState } from "react";
import { styled } from "styled-components";
import Box from "../layout/Box";
import Block from "../misc/Block";
import Placeholder from "../misc/Placeholder";
import MainMenu from "../menus/MainMenu";
import OverMenu from "../menus/OverMenu";
import PauseMenu from "../menus/PauseMenu";
import QuitMenu from "../menus/QuitMenu";
import { GameStatus } from "../../hooks/useGame";
import { useGameContext } from "../../providers";
import { Tile } from "../../types";

const Board: React.FC = () => {
  const { tiles, status } = useGameContext();

  // Whether the quit menu should be displayed
  const [displayQuit, setDisplayQuit] = useState(false);

  const onQuit = () => {
    setDisplayQuit(true);
  };

  const onCancelQuit = () => {
    setDisplayQuit(false);
  };

  const getMenu = (status: GameStatus) => {
    switch (status) {
      case "idle":
        return <MainMenu />;
      case "over":
        return <OverMenu />;
      case "paused":
        return displayQuit ? (
          <QuitMenu onCancel={onCancelQuit} />
        ) : (
          <PauseMenu onQuit={onQuit} />
        );
    }
  };

  return (
    <StyledBox>
      {tiles.map((row, i) => (
        <Row key={i}>
          {row.map((tile, j) => (
            <Placeholder key={j}>{getTileChild(tile)}</Placeholder>
          ))}
        </Row>
      ))}
      {getMenu(status)}
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
