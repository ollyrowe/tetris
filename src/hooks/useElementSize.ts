import { useState, useLayoutEffect } from "react";

export const useElementSize = (
  targetRef: React.MutableRefObject<HTMLElement | null>
) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, [targetRef]);

  return dimensions;
};
