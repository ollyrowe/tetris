import React, { useMemo, useRef } from "react";
import { styled } from "styled-components";
import { useWindowSize } from "../hooks/useWindowSize";
import { useElementSize } from "../hooks/useElementSize";

interface ContainerProps {
  children: React.ReactNode;
}

/**
 * Container component that scales to fit the window.
 */
const Container: React.FC<ContainerProps> = ({ children }) => {
  const window = useWindowSize();

  const ref = useRef<HTMLDivElement>(null);

  const element = useElementSize(ref);

  const scaleProps = useMemo<ScaleDetails>(() => {
    const { scale, origin } = getScale(window, element);

    // Prevent scaling up
    if (scale > 1) {
      return { scale: 1, origin: "left" };
    }

    return { scale, origin };
  }, [window, element]);

  return (
    <Contents ref={ref} {...scaleProps}>
      {children}
    </Contents>
  );
};

export default Container;

const getScale = (window: Dimensions, element: Dimensions): ScaleDetails => {
  const verticalScale = window.height / element.height;
  const horizontalScale = window.width / element.width;

  if (verticalScale < horizontalScale) {
    return {
      origin: "top",
      scale: verticalScale,
    };
  }

  return {
    origin: "left",
    scale: horizontalScale,
  };
};

const Contents = styled.div<ScaleDetails>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  scale: ${(props) => props.scale};
  user-select: none;
`;

type ScaleDetails = {
  scale: number;
  origin: Origin;
};

type Origin = "left" | "top";

type Dimensions = {
  width: number;
  height: number;
};
