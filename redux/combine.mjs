export function combineReducers(reducerDict) {
  const reducerKeys = Object.keys(reducerDict);

  const reducer = (state = {}, action) => {
    const newState = {};

    reducerKeys.forEach((reducerKey) => {
      newState[reducerKey] = reducerDict[reducerKey](state[reducerKey], action);
    });

    return newState;
  };

  return reducer;
}
