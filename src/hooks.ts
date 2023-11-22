import { useEffect, useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppSelector<R> = (state: RootState) => R;
export type SelectorCreator<T> = <K extends keyof T>(k: K) => AppSelector<T[K]>;

export const createAppSelector = <R>(
  selector: AppSelector<R>
): AppSelector<R> => selector;

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: VoidFunction, delay: number | null) => {
  const savedCallback = useRef(() => {});

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
