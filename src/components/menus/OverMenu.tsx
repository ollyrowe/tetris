import React from "react";
import { styled } from "styled-components";
import Menu from "./Menu";
import HighScores from "./HighScores";
import Button from "./Button";
import { useGameContext } from "../../providers";

const OverMenu: React.FC = () => {
  const { controls } = useGameContext();

  const restart = () => {
    controls.start();
  };

  const exit = () => {
    controls.quit();
  };

  return (
    <Menu>
      <Title>Game Over</Title>
      <HighScores />
      <ButtonContainer>
        <Button label="Restart" colour="green" onClick={restart} />
        <Button label="Exit" colour="grey" onClick={exit} />
      </ButtonContainer>
    </Menu>
  );
};

export default OverMenu;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin: 0;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;
