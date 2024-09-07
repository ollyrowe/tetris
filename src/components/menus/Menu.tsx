import React from "react";
import { styled } from "styled-components";

interface MenuProps {
  title?: string;
  children?: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ title, children }) => {
  return (
    <Overlay>
      {title && <Title>{title}</Title>}
      <Contents>{children}</Contents>
    </Overlay>
  );
};

export default Menu;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
`;

const Title = styled.h2`
  font-size: 1.6rem;
  text-transform: uppercase;
  text-align: center;
  margin: 0;
  margin-bottom: 12px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  align-items: center;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
`;
