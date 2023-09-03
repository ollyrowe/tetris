import React from "react";
import { styled } from "styled-components";
import { TetriminoType } from "../model";

interface Props {
  type: TetriminoType;
  size?: BlockSize;
  transparent?: boolean;
}

const Block: React.FC<Props> = ({
  type,
  size = "medium",
  transparent = false,
}) => {
  return <Box type={type} size={size} transparent={transparent} />;
};

export default Block;

interface BoxProps {
  type: TetriminoType;
  size: BlockSize;
  transparent: boolean;
}

const Box = styled.div<BoxProps>`
  width: calc(${(props) => getSize(props)});
  height: calc(${(props) => getSize(props)});
  border-style: solid;
  margin: auto;
  border-color: ${(props) => boxBorderColours[props.type]};
  border-radius: 2px;
  border-width: ${(props) => props.transparent && "2px"};
  background: ${(props) => !props.transparent && boxColours[props.type]};
  box-shadow: ${(props) =>
    !props.transparent &&
    `inset 0.1em 0.1em 0.1em 0 rgba(255, 255, 255, 0.5),
    inset -0.1em -0.1em 0.1em 0 rgba(0, 0, 0, 0.5)`};
`;

const boxColours: { [T in TetriminoType]: string } = {
  I: "#65c7dc",
  O: "#f1d959",
  T: "#a528cf",
  J: "#3d7cd4",
  L: "#daa545",
  S: "#73e167",
  Z: "#c32f23",
};

const boxBorderColours: { [T in TetriminoType]: string } = {
  I: "#336576",
  O: "#7b722b",
  T: "#51136d",
  J: "#1c3a71",
  L: "#704e22",
  S: "#3b7733",
  Z: "#691913",
};

const getSize = (props: BoxProps) => {
  return `${sizes[props.size]}px - ${props.transparent ? 4 : 3}px`;
};

// eslint-disable-next-line react-refresh/only-export-components
export const sizes: { [size in BlockSize]: number } = {
  small: 12,
  medium: 25,
};

export type BlockSize = "small" | "medium";
