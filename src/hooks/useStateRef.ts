import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * Wrapper around useState which also returns a ref to the current state value.
 */
export const useStateRef = <T>(
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, MutableRefObject<T>] => {
  const [state, setState] = useState(initialValue);

  const ref = useRef(state);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return [state, setState, ref];
};
