import { createSlice } from "@reduxjs/toolkit";

export const DiagramSlice = createSlice({
    name: "diagram",
    initialState: {
        size: 2,
        offsetX: 1,
        offsetY: 1,
        offsetStartX: 0,
        offsetStartY: 0,
        offsetEndX: 0,
        offsetEndY: 0,
        dragging: false,
        moveState: 0,

        editingLabel: false,
    },
    reducers: {
        scale: (state, action) => {
            state.size += action.payload.dsize || 0;
        },
        setSize: (state, action) => {
            state.size = action.payload.dsize || state.size;
        },
        setOffsetStart: (state, action) => {
            state.offsetStartX = action.payload.x;
            state.offsetStartY = action.payload.y;
        },
        setOffsetEnd: (state, action) => {
            state.offsetEndX = action.payload.x;
            state.offsetEndY = action.payload.y;
        },
        setOffsetBegin: (state, action) => {
            state.offsetStartX = action.payload.x;
            state.offsetStartY = action.payload.y;
            state.offsetEndX = action.payload.x;
            state.offsetEndY = action.payload.y;
        },
        saveOffSet: (state) => {
            state.offsetX = state.offsetX + state.offsetEndX - state.offsetStartX;
            state.offsetY = state.offsetY + state.offsetEndY - state.offsetStartY;
            state.offsetStartX = 0;
            state.offsetStartY = 0;
            state.offsetEndX = 0;
            state.offsetEndY = 0;
        },
        startDrag: (state) => {
            state.dragging = true;
        },
        endDrag: (state) => {
            state.dragging = false;
        },

        createEditingLabelBox: (state, action) => {
            state.editingLabel = true;
        },
        closeEditingLabelBox: (state) => {
            state.editingLabel = false;
        },
    },
});

export const {
    scale,
    setSize,
    setOffsetBegin,
    setOffsetEnd,
    saveOffSet,
    startDrag,
    endDrag,
    createEditingLabelBox,
    closeEditingLabelBox,
} = DiagramSlice.actions;

export default DiagramSlice.reducer;
