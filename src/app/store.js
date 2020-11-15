import { createStore } from "redux";
import rootReducer from "./reducers";

// created redux store to maintain state.
const store = createStore(
    rootReducer
  );

export default store;
