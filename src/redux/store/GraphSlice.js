import { createSlice } from "@reduxjs/toolkit";
import RelineElementBaseUtil from "../../services/Reline/utils/RelineElementBaseUtil";
import RelineGraphUtil from "../../services/Reline/utils/RelineGraphUtil";

import RelineNodeUtil from "../../services/Reline/utils/RelineNodeUtil";

import LayoutManager from "../../services/Reline/LayoutManager/LayoutManager";

const graph = RelineGraphUtil.create("0", { strict: true });
RelineGraphUtil.addContributor(graph);
if (graph) {
    const node1 = RelineNodeUtil.create("root", { strict: true });

    RelineNodeUtil.updateField(node1, "basic", {
        id: node1.id,
        label: "",
    }, { strict: true });
    RelineGraphUtil.insertNode(graph, node1, { strict: true }, "");
}
export const GraphSlice = createSlice({
    name: "graph",
    initialState: {
        graph,
    },
    reducers: {
        setGraph: (state, action) => {
            state.graph = action.payload.graph;
        },
        setGraphBasic: (state, action) => {
            const { key, value } = action.payload;
            RelineGraphUtil.updateBasic(
                state.graph,
                key,
                value,
            );
        },
        setGraphContributor: (state, action) => {
            const { idx, key, value } = action.payload;
            RelineGraphUtil.updateContributor(
                state.graph,
                idx,
                key,
                value,
            );
        },
        setGraphMetadata: (state, action) => {
            RelineGraphUtil.setMetadata(state.graph, action.payload);
        },
        setGraphElementMetadata: (state, action) => {
            const { id, metadata } = action.payload;
            const element = RelineGraphUtil.getElementById(state.graph, id);
            if (element) {
                RelineElementBaseUtil.setMetadata(element, metadata);
            }
        },
        layoutGraph: (state, action) => {
            const {
                layoutId,
                options,
            } = action.payload;
            if (layoutId) {
                const layout = new LayoutManager[layoutId](
                    options || {
                        width: 1, height: 1, offsetX: -0.5, offsetY: -0.5,
                    },
                );
                layout.run(state.graph);
            }
        },
        insertNewNodeToNode: (state, action) => {
            const { parentId } = action.payload;
            if (parentId !== "") {
                RelineGraphUtil.insertNewNodeToNode(
                    state.graph,
                    parentId,
                );
            }
        },
        changeElementLabel: (state, action) => {
            const { id, value } = action.payload;
            RelineGraphUtil.changeElementLabel(state.graph, id, value);
        },
        deleteNode: (state, action) => {
            const {
                id,
            } = action.payload;
            RelineGraphUtil.deleteNode(state.graph, id);
        },
    },
});

export const {
    setGraph,
    setGraphBasic,
    setGraphContributor,
    setGraphMetadata,
    setGraphElementMetadata,
    layoutGraph,
    insertNewNodeToNode,
    changeElementLabel,
    deleteNode,
} = GraphSlice.actions;
export default GraphSlice.reducer;
