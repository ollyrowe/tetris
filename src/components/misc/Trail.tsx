import React, { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { trailAnimationLength } from "../../constants";

interface Props {
  length: number;
  createdAt: Date;
}

const Trail: React.FC<Props> = ({ length, createdAt }) => {
  // Calculate the initial opacity of the trail
  const initialOpacity = useMemo(
    () => calculateInitialOpacity(createdAt),
    [createdAt]
  );

  const [opacity, setOpacity] = useState(initialOpacity);

  /**
   * Set the opacity to 0 once the component is mounted.
   */
  useEffect(() => {
    setTimeout(() => {
      setOpacity(0);
    });
  }, []);

  return (
    <Shadow $opacity={initialOpacity} $length={length} style={{ opacity }} />
  );
};

export default Trail;

/**
 * Calculates the initial opacity of the trail based on the time elapsed since the trail was created
 */
const calculateInitialOpacity = (createdAt: Date) => {
  const timeElapsed = Date.now() - createdAt.getTime();

  const opacity = 1 - timeElapsed / trailAnimationLength;

  return opacity < 0 ? 0 : opacity;
};

interface ShadowProps {
  $opacity: number;
  $length: number;
}

const Shadow = styled.div<ShadowProps>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${(props) => `calc(${props.$length} * 100%)`};
  background-image: linear-gradient(transparent, rgba(255, 255, 255, 0.25));
  border-radius: 2px;
  transition: opacity ${trailAnimationLength}ms linear;
  opacity: ${(props) => props.$opacity};
`;
