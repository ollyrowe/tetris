import { LegacyRef, MutableRefObject, RefCallback } from "react";

/**
 * Merges multiple refs into a single ref callback.
 *
 * @param refs - the refs to merge.
 */
export const mergeRefs = <T>(
  refs: Array<MutableRefObject<T> | LegacyRef<T>>
): RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref !== null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
};
