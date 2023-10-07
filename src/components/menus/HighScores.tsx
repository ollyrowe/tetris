import React from "react";
import { styled } from "styled-components";
import { useGameContext } from "../../providers";

const HighScores: React.FC = () => {
  const { highScores } = useGameContext();

  return (
    <Container>
      <Title>High Scores</Title>
      <List>
        {new Array(5).fill(0).map((_, index) => (
          <Item key={index} index={index}>
            {highScores[index] || "-"}
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default HighScores;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ffffffcc;
  border-radius: 5px;
  color: white;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  margin-bottom: 12px;
  text-transform: uppercase;
  text-align: center;
`;

const List = styled.ol`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 0.9rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

interface ItemProps {
  index: number;
}

const Item = styled.li<ItemProps>`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ index }) =>
    index % 2 === 0 ? "#3a3a3a64" : "#3a3a3a"};
  padding: 4px;
`;
