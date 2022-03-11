import global from "../global";
import {
    createOpenFileDialog,
    createNewWindow,
    loadAppHTML,
    saveFileWithDialogSync,
} from "../mainActions";

const {
    options,
} = global.shared;

const newWindowClick = () => {
    const window = createNewWindow(options);
    loadAppHTML(window);
};

const openFileClick = () => {
    const filePath = createOpenFileDialog();
    if (filePath) {
        console.log(filePath);
    }
};

const saveClick = saveFileWithDialogSync;

const menuTemplateBase = [
    {
        label: "File",
        submenu: [
            {
                label: "New Window",
                accelerator: "Ctrl+Shift+N",
                click: newWindowClick,
            },
            {
                type: "separator",
            },
            {
                label: "Preferences",
            },
            {
                type: "separator",
            },
            {
                label: "Exit",
                accelerator: "Ctrl+Q",
            },
        ],
    },
    {
        label: "View",
        submenu: [
            {
                label: "Toggle Full Screen",
                accelerator: "F11",
            },
            {
                label: "Minimize",
                accelerator: "Ctrl+M",
            },
        ],
    },
    {
        label: "Run",
        submenu: [],
    },
    {
        label: "Help",
        submenu: [
            {
                label: "Learn More",
            },
            {
                label: "Documentation",
            },
            {
                label: "Community Discussion",
            },
            {
                label: "About Author",
            },
        ],
    },
];

export default menuTemplateBase;
export {
    openFileClick,
    newWindowClick,
    saveClick,
};
