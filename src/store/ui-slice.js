import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
    name: "ui",
    initialState: { authentication: { status: null } },
    reducers: {
        changeStatus(state, action) {
            state.authentication.status = action.payload;
        },
    },
});
export const uiSliceActions = uiSlice.actions;
export default uiSlice;
