// import { configureStore } from '@reduxjs/toolkit'
import { createStore } from "./create.mjs";
import { combineReducers } from "./combine.mjs";

function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case "counter/incremented":
      return { value: state.value + 1 };
    case "counter/decremented":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const store = createStore(counterReducer);

store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: "counter/incremented" });
// {value: 1}
store.dispatch({ type: "counter/incremented" });
// {value: 2}
store.dispatch({ type: "counter/decremented" });

const store2 = createStore(
  combineReducers({
    foo: counterReducer,
    bar: counterReducer,
  })
);

store2.subscribe(() => console.log(store2.getState()));

store2.dispatch({ type: "counter/incremented" });

// createStore = (reducer, state) => ({ dispatch: action => state = reducer(state, action) });