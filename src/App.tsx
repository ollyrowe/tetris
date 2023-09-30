import React from "react";
import { styled } from "styled-components";
import Background from "./components/Background";
import Banner from "./components/Banner";
import Container from "./components/Container";
import Board from "./components/Board";
import Score from "./components/Score";
import Next from "./components/Next";
import Hold from "./components/Hold";
import Level from "./components/Level";
import Lines from "./components/Lines";
import Version from "./components/Version";
import { ScreenTypeProvider, useScreenType } from "./providers";
import { useGame } from "./hooks/useGame";
import { useControls } from "./hooks/useControls";

const App: React.FC = () => {
  const { tiles, stats, queue, heldTetrimino, controls, over, paused } =
    useGame();

  const containerRef = useControls(controls);

  return (
    <ScreenTypeProvider>
      <Background>
        <Banner paused={paused} pause={controls.pause} play={controls.play} />
        <Container ref={containerRef}>
          <TopRow>
            <Score points={stats.points} />
          </TopRow>
          <BottomRow>
            <LeftColumn>
              <Hold type={heldTetrimino} />
              <Level level={stats.level} />
              <Lines lines={stats.lines} />
            </LeftColumn>
            <Board tiles={tiles} over={over} paused={paused} />
            <RightColumn>
              <Next queue={queue} />
            </RightColumn>
          </BottomRow>
        </Container>
        <Version />
      </Background>
    </ScreenTypeProvider>
  );
};

export default App;

interface TopRowProps {
  children: React.ReactNode;
}

const TopRow: React.FC<TopRowProps> = ({ children }) => {
  const screenType = useScreenType();

  return (
    <Box
      align="center"
      anchor={screenType !== "desktop" ? "bottom" : undefined}
    >
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
  const screenType = useScreenType();

  return (
    <Column align="end" anchor={screenType !== "desktop" ? "right" : undefined}>
      {children}
    </Column>
  );
};

const RightColumn: React.FC<ColumnProps> = ({ children }) => {
  const screenType = useScreenType();

  return (
    <Column anchor={screenType !== "desktop" ? "left" : undefined}>
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
