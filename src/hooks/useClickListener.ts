import { useEffect } from "react";

export const useClickListener = (
  target: HTMLElement | null,
  callback: (event: MouseEvent) => void
) => {
  useEffect(() => {
    if (target !== null) {
      target.addEventListener("click", callback);

      return () => {
        target.removeEventListener("click", callback);
      };
    }
  }, [target, callback]);
};
