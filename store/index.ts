import { configureStore, ThunkAction, Action, Store } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { rootReducer, RootState } from "./reducer";

export const makeStore = (): Store<RootState> =>
  configureStore({
    reducer: rootReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true });
