import { createContext, useContext } from "react";

export const ScreenTypeContext = createContext<ScreenType>("desktop");

export const useScreenType = () => useContext(ScreenTypeContext);

export type ScreenType = "mobile" | "desktop";
