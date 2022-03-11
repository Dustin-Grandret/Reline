import fs from "fs";
import path from "path";

import {
    app,
    BrowserWindow,
    dialog,
} from "electron";

const appFilePath = path.join(app.getAppPath(), "index.html");
const emptyFunc = () => {

};
const createNewWindow = (options) => {
    const windowsOptions = (options || {}).windows;
    const {
        width,
        height,
        minWidth,
        minHeight,
        webPreferences,
    } = windowsOptions || {};
    // eslint-disable-next-line prefer-const
    let window = new BrowserWindow({
        width: width || 1200,
        height: height || 1050,
        minWidth: minWidth || 800,
        minHeight: minHeight || 600,
        webPreferences: webPreferences || {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    window.on("close", () => {
        window = null;
    });
    return window;
};

const loadAppHTML = (window, filePath) => {
    window.loadFile(filePath || appFilePath);
};

const createOpenFileDialog = () => dialog.showOpenDialogSync(
    {
        title: "Open or Save a reline graph file with .json",
        filters: [
            { name: "Reline Graph", extensions: ["json", "reline"] },
        ],
        properties: ["openFile"],
    },
);

const saveFileSync = (filePath, data) => {
    return fs.writeFileSync(filePath, data);
};

const loadFile = (filePath, dataCallback, errCallback) => {
    fs.readFile(
        filePath,
        { encoding: "utf-8", flag: "r" },
        (err, data) => {
            if (err) {
                errCallback(err);
            } else {
                dataCallback(data);
            }
        },
    );
};

const saveFileWithDialogSync = (data, successCallback, failedCallback) => {
    const filePaths = createOpenFileDialog();
    if (filePaths.length > 0) {
        saveFileSync(
            filePaths[0],
            data,
        );
    }
};

const getOptions = () => JSON.parse(fs.readFileSync(
    path.join(app.getAppPath(), app.isPackaged ? "reline.config.json" : "../../reline.config.jsonc"),
    { encoding: "utf-8", flag: "r" },
));

const openPlugin = (args) => {
    const window = createNewWindow();
    loadAppHTML(
        window,
        path.join(
            app.getAppPath(),
            app.isPackaged ? "./" : "../../",
            "plugins",
            args.name,
            "target/index.html",
        ),
    );
};

export {
    createNewWindow,
    loadAppHTML,
    createOpenFileDialog,
    saveFileSync,
    loadFile,
    saveFileWithDialogSync,
    getOptions,
    openPlugin,
};
