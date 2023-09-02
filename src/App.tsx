import React from "react";
import { styled } from "styled-components";
import Background from "./components/Background";
import Board from "./components/Board";
import Score from "./components/Score";
import Next from "./components/Next";
import Hold from "./components/Hold";
import Level from "./components/Level";
import Lines from "./components/Lines";
import { useGame } from "./hooks/useGame";
import { useControls } from "./hooks/useControls";
import { useScreenSize } from "./providers/ResponsiveContext";

const App: React.FC = () => {
  const { tiles, stats, queue, heldTetrimino, controls, over } = useGame();

  useControls(controls);

  return (
    <Background>
      <Container>
        <TopRow>
          <Score points={stats.points} />
        </TopRow>
        <BottomRow>
          <LeftColumn>
            <Hold type={heldTetrimino} />
            <Level level={stats.level} />
            <Lines lines={stats.lines} />
          </LeftColumn>
          <Board tiles={tiles} over={over} />
          <RightColumn>
            <Next queue={queue} />
          </RightColumn>
        </BottomRow>
      </Container>
    </Background>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

interface TopRowProps {
  children: React.ReactNode;
}

const TopRow: React.FC<TopRowProps> = ({ children }) => {
  const screenSize = useScreenSize();

  return (
    <Box align="center" anchor={screenSize !== "large" ? "bottom" : undefined}>
      {children}
    </Box>
  );
};

const BottomRow = styled.div`
  display: flex;
  margin: auto;
`;

interface ColumnProps {
  children: React.ReactNode;
}

const LeftColumn: React.FC<ColumnProps> = ({ children }) => {
  const screenSize = useScreenSize();

  return (
    <Column align="end" anchor={screenSize !== "large" ? "right" : undefined}>
      {children}
    </Column>
  );
};

const RightColumn: React.FC<ColumnProps> = ({ children }) => {
  const screenSize = useScreenSize();

  return (
    <Column anchor={screenSize !== "large" ? "left" : undefined}>
      {children}
    </Column>
  );
};

interface BoxProps {
  align?: string;
  anchor?: "bottom" | "left" | "right";
}

const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
  margin: ${(props) => (props.anchor ? "auto" : "16px")};
  margin-left: ${(props) => props.anchor === "left" && "-8px"};
  margin-right: ${(props) => props.anchor === "right" && "-8px"};
  margin-bottom: ${(props) => props.anchor === "bottom" && "-8px"};
`;

const Column = styled(Box)`
  height: 100%;
  margin-top: 24px;
`;
