import React from "react";
import { styled } from "styled-components";
import Menu from "./Menu";
import HighScores from "./HighScores";
import Button from "./Button";
import Logo from "../misc/Logo";
import { useGameContext } from "../../providers";
import { Level } from "../../hooks/useGame";

const MainMenu: React.FC = () => {
  const { controls, startLevel, setStartLevel } = useGameContext();

  const toggleLevel = () => {
    setStartLevel(getNextLevel(startLevel));
  };

  return (
    <Menu>
      <ButtonContainer>
        <Logo />
        <Button
          label="Play"
          colour="green"
          size="large"
          onClick={controls.start}
        />
        <Button
          label={`Level ${startLevel}`}
          colour="grey"
          onClick={toggleLevel}
        />
      </ButtonContainer>
      <HighScores />
    </Menu>
  );
};

export default MainMenu;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6px;
`;

const getNextLevel = (level: Level): Level => {
  switch (level) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 4;
    case 4:
      return 5;
    case 5:
      return 6;
    case 6:
      return 1;
  }
};
