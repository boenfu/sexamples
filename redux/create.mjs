export function createStore(reducer, initState) {
  let state = initState;

  const getState = () => state;
  const listeners = new Set();

  const subscribe = (callback) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
  };

  const dispatch = (action) => {
    state = reducer(state, action);

    listeners.forEach((listener) => listener());

    return action;
  };

  return {
    dispatch,
    subscribe,
    getState,
  };
}
