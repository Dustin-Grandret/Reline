import { createSlice } from "@reduxjs/toolkit";
import { ipcRenderer } from "electron";

export const SystemStatusSlice = createSlice({
    name: "systemStatus",
    initialState: {
        currentRoute: "startPage",
        savePath: "~/Docuements/out.reline",
        relineSnackBarOpen: false,
        relineSnackBarMessage: "",
        relineSnackBarSeverity: "success",
        loading: false,
    },
    reducers: {
        changeSavePath: (state, action) => {
            state.savePath = action.payload;
        },
        createSnackBar: (state, action) => {
            const {
                message,
                severity,
            } = action.payload;
            state.relineSnackBarMessage = message;
            state.relineSnackBarSeverity = severity;
            state.relineSnackBarOpen = true;
        },
        closeSnackBar: (state) => {
            state.relineSnackBarMessage = "";
            state.relineSnackBarSeverity = "success";
            state.relineSnackBarOpen = false;
        },
        setLoading: (state, action) => {
            const {
                curLoadingState,
            } = action.payload;
            state.loading = curLoadingState;
        },
        setSavePath: (state, action) => {
            const {
                savePath,
            } = action.payload;
            state.payload = savePath;
        },
        targetPage: (state, action) => {
            state.currentRoute = action.payload;

            // pass action.payload(routeName) to ipcRenderer
            ipcRenderer.invoke("refresh-menu", {
                routeName: state.currentRoute,
            });
        },
    },
});

export const {
    changeSavePath,
    createSnackBar,
    closeSnackBar,
    setLoading,
    setSavePath,
    targetPage,
} = SystemStatusSlice.actions;
export default SystemStatusSlice.reducer;
