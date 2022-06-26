// https://dev.to/thatgalnatalie/how-to-get-started-with-redux-toolkit-41e
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { reducer as user } from "./user";
import { reducer as widget } from "./widget";
import { reducer as entry } from "./entry";

const reducer = combineReducers({
  user,
  widget,
  entry,
});

const store = configureStore({
  reducer,
});

export default store;
