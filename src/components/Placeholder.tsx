import { styled } from "styled-components";
import { Size } from "../types";
import { sizes } from "./Block";

interface PlaceholderProps {
  size: Size;
  borderless?: boolean;
}

const Placeholder = styled.div<PlaceholderProps>`
  width: ${(props) => `${sizes[props.size]}px`};
  height: ${(props) => `${sizes[props.size]}px`};
  border-color: #3c3c3c;
  border-top-style: ${(props) => !props.borderless && "solid"};
  border-right-style: ${(props) => !props.borderless && "solid"};
  border-width: 0.5px;
`;

export default Placeholder;
