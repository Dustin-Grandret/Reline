import { ipcMain } from "electron";
import {
    createOpenFileDialog,
    saveFileWithDialogSync,
    openPlugin,
} from "./mainActions";
import { setApplicationMenu } from "./menu/menu";

ipcMain.handle("open-file", (event, args) => createOpenFileDialog());

ipcMain.handle("refresh-menu", (event, args) => setApplicationMenu(args.routeName || "startPage"));

ipcMain.handle("save-file-with-dialog", (event, args) => saveFileWithDialogSync(
    args.data,
));

ipcMain.handle("open-plugin", (event, args) => openPlugin(args));
