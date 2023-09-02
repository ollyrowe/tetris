import { useEffect } from "react";

export const useClickListener = (callback: (event: MouseEvent) => void) => {
  useEffect(() => {
    window.addEventListener("click", callback);

    return () => {
      window.removeEventListener("click", callback);
    };
  }, [callback]);
};
