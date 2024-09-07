import React from "react";
import { styled } from "styled-components";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const Box: React.FC<Props> = ({ title, children, ...otherProps }) => {
  return (
    <Container $pad={!!title} {...otherProps}>
      {title && <Title>{title}</Title>}
      <Contents $pad={!!title}>{children}</Contents>
    </Container>
  );
};

export default Box;

interface ContainerProps {
  $pad: boolean;
}

const Container = styled.div<ContainerProps>`
  font-family: sans-serif;
  position: relative;
  border: 6px solid #cecece;
  border-radius: 6px;
  width: fit-content;
  color: white;
  background-color: #3a3a3a;
  box-shadow: 1px 1px 12px 0px black;
  padding: ${(props) => props.$pad && "8px"};
`;

interface ContentsProps {
  $pad: boolean;
}

const Contents = styled.div<ContentsProps>`
  font-family: monospace;
  padding: ${(props) => props.$pad && "8px"};
  border-radius: 8px;
  background-color: black;
`;

const Title = styled.h3`
  text-transform: uppercase;
  font-size: small;
  margin: 0;
  text-align: center;
  margin-bottom: 4px;
`;
