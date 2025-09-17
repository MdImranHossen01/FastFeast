"use client";

import { Provider } from "react-redux";
import store from "@/app/[redux]/redux/store";

const newstore = store;

export function ReduxProviders({ children, store }) {
  return <Provider store={newstore}>{children}</Provider>;
}
