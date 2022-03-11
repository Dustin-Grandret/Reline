import { ipcRenderer } from "electron";
import { useDispatch, useSelector } from "react-redux";

import {
    createSnackBar,
} from "../redux/store/SystemStatusSlice";

import RelineGraphUtil from "../services/Reline/utils/RelineGraphUtil";

const saveCurrentGraph = () => {
    const graph = useSelector((state) => state.graph);
    const dispatch = useDispatch();
    ipcRenderer.invoke("save-file-with-dialog", {
        data: RelineGraphUtil.toJson(graph),
        successCallback: () => {
            dispatch(
                createSnackBar({
                    message: "Export Graph Success",
                    severity: "success",
                }),
            );
        },
        failedCallback: () => {
            dispatch(
                createSnackBar({
                    message: "Export Graph Failed.",
                    severity: "error",
                }),
            );
        },
    });
};

export {
    saveCurrentGraph,
};
