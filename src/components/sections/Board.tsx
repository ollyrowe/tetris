import React, { useState } from "react";
import { styled } from "styled-components";
import Box from "../layout/Box";
import Block from "../misc/Block";
import Trail from "../misc/Trail";
import Placeholder from "../misc/Placeholder";
import MainMenu from "../menus/MainMenu";
import OverMenu from "../menus/OverMenu";
import PauseMenu from "../menus/PauseMenu";
import QuitMenu from "../menus/QuitMenu";
import { GameStatus } from "../../hooks/useGame";
import { useGameContext } from "../../providers";
import { Tile } from "../../types";

const Board: React.FC = () => {
  const { tiles, status, controls } = useGameContext();

  // Whether the confirm quit menu should be displayed
  const [displayConfirmQuit, setDisplayConfirmQuit] = useState(false);

  const onPlay = () => {
    controls.play();
  };

  const onQuit = () => {
    setDisplayConfirmQuit(true);
  };

  const onConfirmQuit = () => {
    controls.quit();

    setDisplayConfirmQuit(false);
  };

  const onCancelQuit = () => {
    setDisplayConfirmQuit(false);
  };

  const getMenu = (status: GameStatus) => {
    switch (status) {
      case "idle":
        return <MainMenu />;
      case "over":
        return <OverMenu />;
      case "paused":
        return displayConfirmQuit ? (
          <QuitMenu onConfirm={onConfirmQuit} onCancel={onCancelQuit} />
        ) : (
          <PauseMenu onPlay={onPlay} onQuit={onQuit} />
        );
    }
  };

  return (
    <StyledBox>
      {tiles.map((row, i) => (
        <Row key={i}>
          {row.map((tile, j) => (
            <Placeholder key={j}>
              {getTileChild(tile)}
              {getTileTrail(tile)}
            </Placeholder>
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

const getTileTrail = (tile: Tile) => {
  const { trail } = tile;

  if (trail) {
    return <Trail key={trail.id} length={trail.length} />;
  }
};

const StyledBox = styled(Box)`
  z-index: 1;
`;

const Row = styled.div`
  display: flex;
`;
