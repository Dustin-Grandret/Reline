/* eslint-disable quote-props */
import fs from "fs";
import {
    ipcRenderer,
} from "electron";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/system";
import {
    Button,
    Divider,
} from "@mui/material";
import {
    TabsUnstyled,
    TabUnstyled,
    buttonUnstyledClasses,
    TabsListUnstyled,
    TabPanelUnstyled,
    tabUnstyledClasses,
} from "@mui/base";

import {
    setGraphMetadata,
    setGraphElementMetadata,
    insertNewNodeToNode,
    deleteNode,
    setGraph,
} from "../../redux/store/GraphSlice";

import JsonEditor from "../JsonEditor/JsonEditor";
import RelineGraphUtil from "../../services/Reline/utils/RelineGraphUtil";

import {
    targetPage,
    createSnackBar,
} from "../../redux/store/SystemStatusSlice";

import "../../assets/style.css";

import {
    ButtonMaxStyle,
} from "../../assets/style";

import {
    saveCurrentGraph,
} from "../../utils/rendererActions";

const options = {
    "width": 1200,
    "height": 1050,
    "minWidth": 1200,
    "minHeight": 1050,
    "webPreferences": {
        "nodeIntegration": true,
        "contextIsolation": false,
    },
};

const blue = {
    50: "#F0F7FF",
    100: "#C2E0FF",
    200: "#80BFFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0059B2",
    800: "#004C99",
    900: "#003A75",
};

const Tab = styled(TabUnstyled)`
    font-family: IBM Plex Sans, sans-serif;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent;
    width: 100%;
    padding: 12px 16px;
    margin: 6px 6px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;

&:hover {
    background-color: ${blue[400]};
}

&:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
}

&.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
}

&.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
}
`;

const TabPanel = styled(TabPanelUnstyled)({
    width: "100%",
    fontFamily: "IBM Plex Sans, sans-serif",
    fontSize: "0.875rem",
});

const TabsList = styled(TabsListUnstyled)({
    minWidth: "320px",
    backgroundColor: `${blue[500]}`,
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-between",
});

/**
 * Component for SidebarContainer.
 * @module SidebarContainer
 * @summary Contains full functions page
 * @extends React.Component
 */
function SidebarContainer() {
    const { mainViewStatus, graph } = useSelector((state) => state);
    const { curActivElemId } = mainViewStatus;
    const curGraph = graph.graph;
    const { metadata } = curGraph;
    const dispatch = useDispatch();

    return (
        <div
            className="SidebarContainer"
        >
            <TabsUnstyled defaultValue={0}>
                <TabsList>
                    <Tab>Graph</Tab>
                    <Tab>Element</Tab>
                    <Tab>Run</Tab>
                    <Tab>Setting</Tab>
                </TabsList>
                <TabPanel value={0}>
                    <JsonEditor
                        src={metadata}
                        setData={(edit) => {
                            dispatch(setGraphMetadata(edit.updated_src));
                        }}
                    />

                    <Button
                        color="primary"
                        variant="contained"
                        sx={ButtonMaxStyle}
                        onClick={() => {
                            ipcRenderer.invoke("open-file")
                                .then(
                                    (filePaths) => fs.readFileSync(filePaths[0], { encoding: "utf-8", flag: "r" }),
                                )
                                .then((graphLikeJson) => {
                                    dispatch(setGraph({
                                        graph: RelineGraphUtil.fromJson(graphLikeJson),
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
                        Import Reline Graph
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        sx={ButtonMaxStyle}
                        onClick={() => {
                            const mpromise = ipcRenderer.invoke("save-file-with-dialog", {
                                data: RelineGraphUtil.toJson(graph.graph),
                            });
                            mpromise.then(
                                () => {
                                    dispatch(
                                        createSnackBar({
                                            message: "Export Graph Success",
                                            severity: "success",
                                        }),
                                    );
                                },
                            ).catch(
                                () => {
                                    dispatch(
                                        createSnackBar({
                                            message: "Export Graph Failed.",
                                            severity: "error",
                                        }),
                                    );
                                },
                            );
                        }}
                    >
                        Export Reline Graph
                    </Button>
                </TabPanel>
                <TabPanel value={1}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={
                            () => {
                                dispatch(insertNewNodeToNode(
                                    {
                                        parentId: curActivElemId,
                                    },
                                ));
                            }
                        }
                        sx={ButtonMaxStyle}
                    >
                        insert new node to this node
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={
                            () => {
                                dispatch(deleteNode(
                                    {
                                        id: curActivElemId,
                                    },
                                ));
                            }
                        }
                        sx={{
                            minWidth: "100%",
                            maxWidth: "100%",
                        }}
                    >
                        delete this node
                    </Button>
                    <Divider sx={{ padding: "10px" }} />

                    <JsonEditor
                        src={RelineGraphUtil.getElementById(curGraph, curActivElemId)}
                        setData={(edit) => {
                            dispatch(setGraphElementMetadata(edit.updated_src));
                        }}
                    />
                </TabPanel>
                <TabPanel value={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={ButtonMaxStyle}
                        onClick={
                            () => {
                                ipcRenderer.invoke("open-plugin", {
                                    name: "toMarkdown",
                                    data: curGraph,
                                });
                            }
                        }
                    >
                        Run Plugin
                    </Button>
                </TabPanel>
                <TabPanel value={3}>
                    <JsonEditor
                        src={options}
                        setData={() => {}}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        sx={ButtonMaxStyle}
                        onClick={
                            () => {
                                dispatch(targetPage("startPage"));
                            }
                        }
                    >
                        Exit
                    </Button>
                </TabPanel>
            </TabsUnstyled>
        </div>
    );
}
export default SidebarContainer;
