import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./store/pasteSlice";

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});