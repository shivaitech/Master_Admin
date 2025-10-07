// app/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice.js";
import miscSlice from "../slices/miscSlice";
import listingsSlice from "../slices/listingsSlice.js";
import widgetSlice from "../slices/widgetSlice.js"

const rootReducer = combineReducers({
  auth: authSlice,
  misc: miscSlice,
  listings: listingsSlice,
  widget: widgetSlice
});

export const resettableRootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default rootReducer;
