import React from "react";
import { Grid } from "@mui/material";

function SidebarTab() {
    return 123;
}
function Sidebar() {
    return (
        <div className="Sidebar">
            <Grid container>
                <SidebarTab>123</SidebarTab>
                <SidebarTab>123</SidebarTab>
                <SidebarTab>123</SidebarTab>
                <SidebarTab>123</SidebarTab>
            </Grid>
            <div className="SidebarBody">asd</div>
        </div>
    );
}

export default Sidebar;
