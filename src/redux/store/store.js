import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./LayoutSlice";
import mainViewStatusReducer from "./MainViewStatusSlice";
import systemStatusReducer from "./SystemStatusSlice";
import graphReducer from "./GraphSlice";
import diagramReducer from "./DiagramSlice";

export default configureStore({
    reducer: {
        layout: layoutReducer,
        mainViewStatus: mainViewStatusReducer,
        systemStatus: systemStatusReducer,
        graph: graphReducer,
        diagram: diagramReducer,
    },
});
