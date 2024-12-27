import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { countryReducer } from "./reducers/countryReducer";
import paginationReducer from "./reducers/paginationReducer.js";


// import other reducers here
const rootReducer = {
  country: countryReducer,
  pagination: paginationReducer,
    // add other reducers here
};

const store = configureStore({
  reducer: rootReducer,
  devTools: composeWithDevTools(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;