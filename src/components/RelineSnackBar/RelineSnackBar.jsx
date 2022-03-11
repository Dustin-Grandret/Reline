import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";

import {
    closeSnackBar,
} from "../../redux/store/SystemStatusSlice";

import "../../assets/style.css";

function RelineSnackBar() {
    const {
        relineSnackBarOpen,
        relineSnackBarMessage,
        relineSnackBarSeverity,
    } = useSelector((state) => state.systemStatus);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeSnackBar());
    };

    return (
        <Snackbar
            open={relineSnackBarOpen}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={relineSnackBarSeverity}
                className="Alert"
            >
                {relineSnackBarMessage}
            </Alert>
        </Snackbar>
    );
}

export default RelineSnackBar;
