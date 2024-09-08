import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { trailAnimationLength } from "../../constants";

interface Props {
  length: number;
}

const Trail: React.FC<Props> = ({ length }) => {
  const [opacity, setOpacity] = useState(1);

  /**
   * Set the opacity to 0 once the component is mounted.
   */
  useEffect(() => {
    setTimeout(() => {
      setOpacity(0);
    });
  }, []);

  return <Shadow $length={length} style={{ opacity }} />;
};

export default Trail;

interface ShadowProps {
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
  opacity: 1;
`;
