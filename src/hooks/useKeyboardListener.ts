import { useEffect } from "react";

export const useKeydownListener = (
  callback: (event: KeyboardEvent) => void
) => {
  useEffect(() => {
    window.addEventListener("keydown", callback);

    return () => {
      window.removeEventListener("keydown", callback);
    };
  }, [callback]);
};
