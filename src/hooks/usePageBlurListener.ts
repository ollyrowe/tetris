import { useEffect } from "react";

export const usePageBlurListener = (callback: () => void) => {
  useEffect(() => {
    window.addEventListener("blur", callback);

    return () => {
      window.removeEventListener("blur", callback);
    };
  }, [callback]);
};
