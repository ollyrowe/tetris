import React, { useState } from "react";
import { styled } from "styled-components";
import Menu from "./Menu";
import HighScores from "./HighScores";
import Button from "./Button";
import { useGameContext } from "../../providers";
import { Level } from "../../hooks/useGame";

const MainMenu: React.FC = () => {
  const { controls } = useGameContext();

  const [selectedLevel, setSelectedLevel] = useState<Level>(1);

  const start = () => {
    controls.start(selectedLevel);
  };

  const toggleLevel = () => {
    setSelectedLevel(getNextLevel(selectedLevel));
  };

  return (
    <Menu>
      <ButtonContainer>
        <Button label="Play" colour="green" size="large" onClick={start} />
        <Button
          label={`Level ${selectedLevel}`}
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
