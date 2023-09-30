import React from "react";
import { styled } from "styled-components";
import { version } from "../../package.json";

const Version: React.FC = () => {
  return <Container>{`v${version}`}</Container>;
};

export default Version;

const Container = styled.div`
  font-family: monospace;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.5em 1em;
  font-size: 0.8em;
  color: #ffffffcc;
`;
