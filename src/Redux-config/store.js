// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { resettableRootReducer } from "./app/rootReducer";

const store = configureStore({
  reducer: resettableRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
