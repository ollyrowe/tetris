import { createContext, useContext } from "react";

export const ResponsiveContext = createContext<ScreenSize>("medium");

export const useScreenSize = () => useContext(ResponsiveContext);

export type ScreenSize = "small" | "medium" | "large";
