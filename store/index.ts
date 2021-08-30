import { configureStore, ThunkAction, Action, Store } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { reducer, RootState } from "./reducer";

export const makeStore = (): Store<RootState> =>
  configureStore({
    reducer: reducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true });
