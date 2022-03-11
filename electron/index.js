/* eslint-disable import/no-extraneous-dependencies */
import { app, BrowserWindow, globalShortcut } from "electron";

import global from "./global.js";

import {
    createNewWindow,
    loadAppHTML,
} from "./mainActions";

import { setApplicationMenu } from "./menu/menu";
import "./ipcMainHandler";

const {
    options,
} = global.shared;

// Initiate menu
setApplicationMenu("startPage", options);

let mainWindow = null;

app.whenReady().then(() => {
    globalShortcut.register("Ctrl+R", () => {
        mainWindow.reload();
    });
});

app.on("ready", () => {
    mainWindow = createNewWindow(options);
    loadAppHTML(mainWindow);
    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools();
    }
});

app.on("window-all-closed", () => {
    app.quit();
});
