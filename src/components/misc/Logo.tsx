import React from "react";
import { styled } from "styled-components";

const Logo: React.FC = () => {
  return <Image alt="Tetris" src="/tetris/logo.png" />;
};

export default Logo;

const Image = styled.img`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 24px;
`;
