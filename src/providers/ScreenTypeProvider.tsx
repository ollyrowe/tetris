import React, { useEffect, useState } from "react";
import { ScreenTypeContext, ScreenType } from "./ScreenTypeContext";

interface Props {
  children: React.ReactNode;
}

const ScreenTypeProvider: React.FC<Props> = ({ children }) => {
  // The current size of the user's display
  const [size, setSize] = useState(getScreenType());

  useEffect(() => {
    const handleResize = () => {
      setSize(getScreenType());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ScreenTypeContext.Provider value={size}>
      {children}
    </ScreenTypeContext.Provider>
  );
};

export default ScreenTypeProvider;

const getScreenType = (): ScreenType => {
  if (window.innerWidth <= 550) {
    return "mobile";
  }

  return "desktop";
};
