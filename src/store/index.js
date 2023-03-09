import { configureStore } from "@reduxjs/toolkit";
import book from "./bookSlice";
import auth from "./authSlice";
import report from "./reportSlice";

export default configureStore({
  reducer: { book, auth, report },
});
