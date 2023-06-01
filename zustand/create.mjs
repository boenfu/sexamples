// import { useSyncExternalStore } from "use-sync-external-store/shim";

// export function useSyncExternalStore<Snapshot>(
//     subscribe: (onStoreChange: () => void) => () => void,
//     getSnapshot: () => Snapshot,
//     getServerSnapshot?: () => Snapshot,
// ): Snapshot;

const useSyncExternalStore = () => {};

export const create = (createState) => {
  const getState = () => state;
  const listeners = new Set();

  const subscribe = (callback) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
  };

  const setState = (fn) => {
    const nextState = typeof fn === "function" ? fn(state) : fn;

    state = Object.assign({}, state, nextState);

    listeners.forEach((listener) => listener());
  };

  let state = createState(setState, getState);

  const useStore = (selector) =>
    useSyncExternalStore(subscribe, () => selector(getState()));

  Object.assign(useStore, { getState, setState });

  return useStore;
};
