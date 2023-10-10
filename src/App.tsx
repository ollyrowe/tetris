import React from "react";
import { styled } from "styled-components";
import Background from "./components/layout/Background";
import Container from "./components/layout/Container";
import Board from "./components/sections/Board";
import Score from "./components/sections/Score";
import Next from "./components/sections/Next";
import Hold from "./components/sections/Hold";
import Level from "./components/sections/Level";
import Lines from "./components/sections/Lines";
import Version from "./components/layout/Version";
import PauseButton from "./components/misc/PauseButton";
import { GameProvider, ScreenTypeProvider, useScreenType } from "./providers";

const App: React.FC = () => {
  return (
    <ScreenTypeProvider>
      <GameProvider>
        <Background>
          <Container>
            <Grid>
              <TopRow>
                <Score />
              </TopRow>
              <TopRight>
                <PauseButton />
              </TopRight>
              <LeftColumn>
                <Hold />
                <Level />
                <Lines />
              </LeftColumn>
              <Center>
                <Board />
              </Center>
              <RightColumn>
                <Next />
              </RightColumn>
            </Grid>
          </Container>
          <Version />
        </Background>
      </GameProvider>
    </ScreenTypeProvider>
  );
};

export default App;

const Grid = styled.div`
  display: grid;
  grid-template-areas:
    "top-left top-row top-right"
    "left-column center right-column"
    "left-column center right-column"
    "left-column center right-column";
`;

interface TopRowProps {
  children: React.ReactNode;
}

const TopRow: React.FC<TopRowProps> = ({ children }) => {
  const screenType = useScreenType();

  return (
    <Box
      align="center"
      gridArea="top-row"
      anchor={screenType !== "desktop" ? "bottom" : undefined}
    >
      {children}
    </Box>
  );
};

const TopRight = styled.div`
  grid-area: top-right;
  display: flex;
  justify-content: center;
`;

const Center = styled.div`
  grid-area: center;
`;

interface ColumnProps {
  children: React.ReactNode;
}

const LeftColumn: React.FC<ColumnProps> = ({ children }) => {
  const screenType = useScreenType();

  return (
    <Column
      align="end"
      gridArea="left-column"
      anchor={screenType !== "desktop" ? "right" : undefined}
    >
      {children}
    </Column>
  );
};

const RightColumn: React.FC<ColumnProps> = ({ children }) => {
  const screenType = useScreenType();

  return (
    <Column
      gridArea="right-column"
      anchor={screenType !== "desktop" ? "left" : undefined}
    >
      {children}
    </Column>
  );
};

interface BoxProps {
  align?: string;
  gridArea?: string;
  anchor?: "bottom" | "left" | "right";
}

const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
  grid-area: ${(props) => props.gridArea};
  margin: ${(props) => (props.anchor ? "auto" : "16px")};
  margin-left: ${(props) => props.anchor === "left" && "-8px"};
  margin-right: ${(props) => props.anchor === "right" && "-8px"};
  margin-bottom: ${(props) => props.anchor === "bottom" && "-8px"};
`;

const Column = styled(Box)`
  margin-top: 24px;
`;
