import React, { useMemo } from "react";
import { styled } from "styled-components";
import { useElementSize } from "../../hooks/useElementSize";
import { mergeRefs } from "../../utils/mergeRefs";
import { useGameContext } from "../../providers";
import { useControls } from "../../hooks/useControls";

interface ContainerProps {
  children?: React.ReactNode;
}

/**
 * Container component that scales its contents to fit the available space.
 */
const Container: React.FC<ContainerProps> = ({ children }) => {
  const { controls } = useGameContext();

  const controlsRef = useControls(controls);

  const outerElement = useElementSize<HTMLDivElement>();
  const innerElement = useElementSize<HTMLDivElement>();

  const scaleProps = useMemo<ScaleDetails>(() => {
    const { scale, origin } = getScale(outerElement, innerElement);

    // Prevent scaling up
    if (scale > 1) {
      return { scale: 1, origin: "left" };
    }

    return { scale, origin };
  }, [outerElement, innerElement]);

  return (
    <Wrapper ref={mergeRefs([controlsRef, outerElement.ref])}>
      <Contents ref={innerElement.ref} {...scaleProps}>
        {children}
      </Contents>
    </Wrapper>
  );
};

export default Container;

const getScale = (outer: Dimensions, inner: Dimensions): ScaleDetails => {
  const verticalScale = outer.height / inner.height;
  const horizontalScale = outer.width / inner.width;

  // If either scale is not a number (i.e. width or height are zero)
  if (isNaN(verticalScale) || isNaN(horizontalScale)) {
    return {
      origin: "left",
      scale: 1,
    };
  }

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const Contents = styled.div<ScaleDetails>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  scale: ${(props) => props.scale};
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
