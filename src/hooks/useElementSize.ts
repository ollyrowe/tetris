import { useState, useLayoutEffect, useRef } from "react";

export const useElementSize = <T extends HTMLElement>() => {
  const targetRef = useRef<T>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });

      const resizeObserver = new ResizeObserver(([firstEntry]) => {
        setDimensions({
          width: firstEntry.contentRect.width,
          height: firstEntry.contentRect.height,
        });
      });

      resizeObserver.observe(targetRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [targetRef]);

  return { ref: targetRef, ...dimensions };
};
