import { ipcRenderer } from "electron";

import fs from "fs";

import React from "react";
import {
    useDispatch,
} from "react-redux";

import {
    Divider,
    Grid,
    Typography,
} from "@mui/material";

import { setGraph } from "../../redux/store/GraphSlice";

import "../../assets/style.css";
import {} from "../../assets/style";
import RelineGraphUtil from "../../services/Reline/utils/RelineGraphUtil";
import {
    createSnackBar,
    targetPage,
} from "../../redux/store/SystemStatusSlice";

function StartPage() {
    const dispatch = useDispatch();

    return (
        <div className="StartPage">
            <Grid container spacing={0} className="StartPageContainer">
                <Grid item xs={6}>
                    <Typography variant="h3">
                        Reline
                    </Typography>
                    <Typography variant="h6" fontStyle="italic" color="grey">
                        Edit and operate mind map everywhere
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h3">
                        Start
                    </Typography>
                    <Typography
                        variant="h6"
                        color="blue"
                        onClick={
                            () => {
                                dispatch(targetPage("createGraph"));
                            }
                        }
                    >
                        Create new Reline map
                    </Typography>
                    <Typography
                        variant="h6"
                        color="blue"
                        onClick={() => {
                            ipcRenderer.invoke("open-file")
                                .then(
                                    (filePaths) => fs.readFileSync(filePaths[0], { encoding: "utf-8", flag: "r" }),
                                )
                                .then((graphLikeJson) => {
                                    const graph = RelineGraphUtil.fromJson(graphLikeJson);
                                    dispatch(setGraph({
                                        graph,
                                    }));
                                    dispatch(createSnackBar({
                                        message: "Import reline graph succeeded.",
                                        severity: "success",
                                    }));
                                    dispatch(targetPage("mainView"));
                                })
                                .catch((error) => {
                                    dispatch(createSnackBar({
                                        message: `Import reline graph failed. ${JSON.stringify(error)}`,
                                        severity: "error",
                                    }));
                                });
                        }}
                    >
                        Open file ...
                    </Typography>
                    <Divider className="StartPageDivider" />
                    <Typography variant="h3">
                        Recent
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default StartPage;
