import React from "react";
import { styled } from "styled-components";

interface Props {
  label: string;
  colour: Colour;
  size?: Size;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  label,
  colour,
  size = "medium",
  onClick,
}) => {
  return (
    <StyledButton $colour={colour} $size={size} onClick={onClick}>
      {label}
    </StyledButton>
  );
};

export default Button;

interface StyledButtonProps {
  $colour: Colour;
  $size: Size;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  padding: 12px;
  margin: 6px;
  font-weight: bold;
  font-size: ${(props) => (props.$size === "medium" ? "0.9rem" : "1.4rem")};
  color: white;
  background-color: ${(props) => backgroundColours[props.$colour]};
  width: ${(props) => (props.$size === "medium" ? "120px" : "150px")};
  height: ${(props) => (props.$size === "medium" ? "25px" : "35px")};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => hoverColours[props.$colour]};
  }
`;

const backgroundColours = {
  green: "#4d8835",
  grey: "dimgrey",
};

const hoverColours = {
  green: "#63a04a",
  grey: "grey",
};

type Colour = "green" | "grey";

type Size = "medium" | "large";
