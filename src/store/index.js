import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authentication-slice.js";
import uiSlice from "./ui-slice.js";
const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        authentication: authenticationSlice.reducer,
    },
});
export default store;
