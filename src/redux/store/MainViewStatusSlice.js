import { createSlice } from "@reduxjs/toolkit";

export const MainViewStatusSlice = createSlice({
    name: "mainViewStatus",
    initialState: {
        curActivElemId: "",
        curActivPanelId: 0,
    },
    reducers: {
        changeCurActivPanel: (state, action) => {
            state.curActivPanelId = action.payload;
        },
        changeCurActivElem: (state, action) => {
            state.curActivElemId = action.payload;
        },
    },
});

export const {
    changeCurActivPanel,
    changeCurActivElem,
} = MainViewStatusSlice.actions;
export default MainViewStatusSlice.reducer;
