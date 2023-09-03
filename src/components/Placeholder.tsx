import { styled } from "styled-components";
import { BlockSize, sizes } from "./Block";

interface PlaceholderProps {
  size?: BlockSize;
  borderless?: boolean;
  children?: React.ReactNode;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  size = "medium",
  borderless = false,
  children,
}) => {
  return (
    <Box size={size} borderless={borderless}>
      {children}
    </Box>
  );
};

interface BoxProps {
  size: BlockSize;
  borderless: boolean;
}

const Box = styled.div<BoxProps>`
  width: ${(props) => `${sizes[props.size]}px`};
  height: ${(props) => `${sizes[props.size]}px`};
  border-color: #3c3c3c;
  border-top-style: ${(props) => !props.borderless && "solid"};
  border-right-style: ${(props) => !props.borderless && "solid"};
  border-width: 0.5px;
`;

export default Placeholder;
