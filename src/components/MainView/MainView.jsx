import React, { useEffect } from "react";
import { Grid } from "@mui/material";

import RelineDiagram from "../RelineDiagram/RelineDiagram";
import SidebarContainer from "../SidebarContainer/SidebarContainer";

import "../../assets/style.css";

function MainView() {
    useEffect(() => {
        const preventDefault = (event) => {
            if (event.ctrlKey) {
                event.preventDefault();
            }
        };

        document.getElementById("root").addEventListener("wheel", preventDefault, true);

        return () => {
            document.getElementById("root").removeEventListener("wheel", preventDefault, true);
        };
    }, []);
    return (
        <Grid container spacing={0} className="MainViewContainer">
            <Grid item xs={12} className="MainViewWorkStationContainer">
                <Grid container className="GridItemMax">
                    <Grid item xs={9} className="GridItemMax">
                        <RelineDiagram />
                    </Grid>
                    <Grid item xs={3} className="GridItemMax">
                        <SidebarContainer />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MainView;
