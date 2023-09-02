import React, { useEffect, useState } from "react";
import { ResponsiveContext, ScreenSize } from "./ResponsiveContext";

interface Props {
  children: React.ReactNode;
}

const ResponsiveProvider: React.FC<Props> = ({ children }) => {
  // The current size of the user's display
  const [size, setSize] = useState(getScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={size}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export default ResponsiveProvider;

const getScreenSize = (): ScreenSize => {
  const width = window.innerWidth;

  if (width <= 390) {
    return "small";
  }

  if (width <= 550) {
    return "medium";
  }

  return "large";
};
