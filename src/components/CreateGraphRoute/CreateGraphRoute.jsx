import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    Grid,
    TextField,
    Box,
    Typography,
    Button,
    Stack,
    Paper,
    styled,
} from "@mui/material";

import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

import { setGraphBasic, setGraphContributor } from "../../redux/store/GraphSlice";
import { targetPage } from "../../redux/store/SystemStatusSlice";

import "../../assets/style.css";

import { ButtonCreateGraphRouteStyle } from "../../assets/style";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: (theme.palette.mode === "dark") ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function CreateGraphRoute() {
    const basicData = useSelector((state) => state.graph.graph.metadata.basic);
    const contributor = basicData.contributors[0] || {};
    const dispatch = useDispatch();

    const setGraphBasicShort = (key) => (event) => dispatch(setGraphBasic(
        {
            key,
            value: event.target.value,
        },
    ));
    return (
        <Grid container spacing={2} className="CreateGraphRoute">
            <Grid item xs={12} sx={{ maxHeight: "10" }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item>
                            <Box sx={{ display: "flex", alignItems: "middle" }}>
                                <Typography variant="h6" display="block" sx={{ width: 225 }}>
                                    Graph Name
                                </Typography>
                                <TextField
                                    helperText="*Please enter graph name"
                                    label="Graph name"
                                    value={basicData.RelineGraphName || ""}
                                    onChange={setGraphBasicShort("RelineGraphName")}
                                />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <Box sx={{ display: "flex", alignItems: "middle" }}>
                                <Typography variant="h6" display="block" sx={{ width: 225 }}>
                                    Template
                                </Typography>
                                <TextField
                                    helperText="Please select the template to use"
                                    label="Template"
                                />
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item>
                            <Box sx={{ display: "flex", alignItems: "middle" }}>
                                <Typography variant="h6" display="block" sx={{ width: 225 }}>
                                    Version
                                </Typography>
                                <TextField
                                    helperText="Please enter the version of this graph"
                                    label="Version"
                                    value={basicData.version || ""}
                                    onChange={setGraphBasicShort("version")}
                                />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <Box sx={{ display: "flex", alignItems: "middle" }}>
                                <Typography variant="h6" display="block" sx={{ width: 225 }}>
                                    License
                                </Typography>
                                <TextField
                                    helperText="Please select the license to use"
                                    label="License"
                                    value={basicData.license || ""}
                                    onChange={setGraphBasicShort("license")}
                                />
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Item>
                    <Box sx={{ display: "flex", alignItems: "middle" }}>
                        <Typography variant="h6" display="block" sx={{ width: 225 }}>
                            SavePath
                        </Typography>
                        <TextField
                            sx={{ flex: 1 }}
                            label="Save Path"
                        />
                    </Box>
                </Item>
            </Grid>
            <Grid item xs={12} sx={{ }}>
                <Item>
                    <Box sx={{ display: "flex", alignItems: "middle" }}>
                        <Typography variant="h6" display="block" sx={{ width: 225 }}>
                            Description
                        </Typography>
                        <TextField
                            sx={{ flex: 1 }}
                            helperText="Please enter the description of graph"
                            label="Description"
                            value={basicData.description || ""}
                            onChange={setGraphBasicShort("description")}
                        />
                    </Box>
                </Item>
            </Grid>
            <Grid item xs={12} sx={{ }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item>
                            <Box sx={{ display: "flex", alignItems: "middle" }}>
                                <Typography variant="h6" display="block" sx={{ width: 225 }}>
                                    Contributor Name
                                </Typography>
                                <TextField
                                    helperText="Please enter the name"
                                    label="Contributor Name"
                                    value={contributor.name || ""}
                                    onChange={
                                        (
                                            event,
                                        ) => {
                                            dispatch(setGraphContributor(
                                                {
                                                    idx: 0,
                                                    key: "name",
                                                    value: event.target.value,
                                                },
                                            ));
                                        }
                                    }
                                />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <Box sx={{ display: "flex", alignItems: "middle" }}>
                                <Typography variant="h6" display="block" sx={{ width: 225 }}>
                                    Email
                                </Typography>
                                <TextField
                                    helperText="Please enter a valid Email"
                                    label="Email"
                                    value={contributor.email || ""}
                                    onChange={
                                        (
                                            event,
                                        ) => {
                                            dispatch(setGraphContributor(
                                                {
                                                    idx: 0,
                                                    key: "email",
                                                    value: event.target.value,
                                                },
                                            ));
                                        }
                                    }
                                />
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Item>
                            <Box sx={{ display: "flex", alignItems: "middle" }}>
                                <Typography variant="h6" display="block" sx={{ width: 225 }}>
                                    Description
                                </Typography>
                                <TextField
                                    helperText="Description of contributor"
                                    label="Description"
                                    value={contributor.description || ""}
                                    onChange={
                                        (
                                            event,
                                        ) => {
                                            dispatch(setGraphContributor(
                                                {
                                                    idx: 0,
                                                    key: "description",
                                                    value: event.target.value,
                                                },
                                            ));
                                        }
                                    }
                                />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction="row-reverse" spacing={2}>
                            <Button
                                variant="contained"
                                color="success"
                                sx={ButtonCreateGraphRouteStyle}
                                onClick={() => {
                                    console.log(JSON.stringify(basicData));
                                    dispatch(targetPage("mainView"));
                                }}
                            >
                                <CheckSharpIcon />
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={ButtonCreateGraphRouteStyle}
                                onClick={
                                    () => {
                                        dispatch(targetPage("startPage"));
                                    }
                                }
                            >
                                <CloseSharpIcon />
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CreateGraphRoute;
