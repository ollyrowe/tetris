import React from "react";
import { styled } from "styled-components";
import Background from "./components/layout/Background";
import Banner from "./components/layout/Banner";
import Container from "./components/layout/Container";
import Board from "./components/sections/Board";
import Score from "./components/sections/Score";
import Next from "./components/sections/Next";
import Hold from "./components/sections/Hold";
import Level from "./components/sections/Level";
import Lines from "./components/sections/Lines";
import Version from "./components/layout/Version";
import { GameProvider, ScreenTypeProvider, useScreenType } from "./providers";

const App: React.FC = () => {
  return (
    <ScreenTypeProvider>
      <GameProvider>
        <Background>
          <Banner />
          <Container>
            <TopRow>
              <Score />
            </TopRow>
            <BottomRow>
              <LeftColumn>
                <Hold />
                <Level />
                <Lines />
              </LeftColumn>
              <Board />
              <RightColumn>
                <Next />
              </RightColumn>
            </BottomRow>
          </Container>
          <Version />
        </Background>
      </GameProvider>
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
