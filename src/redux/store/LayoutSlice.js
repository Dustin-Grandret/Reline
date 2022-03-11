import { createSlice } from "@reduxjs/toolkit";

export const LayoutSlice = createSlice({
    name: "layout",
    initialState: {
        value: "hierarchy",
    },
    reducers: {
        changeLayout: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { changeLayout } = LayoutSlice.actions;

export default LayoutSlice.reducer;
