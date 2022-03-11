import menuTemplateBase, {
    saveClick,
    openFileClick,
    newWindowClick,
} from "./menuTemplateBase";

const menuTemplateStartPage = [
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
                label: "Close",
                role: "close",
                accelerator: "Alt+F4",
            },
        ],
    },
    {
        label: "View",
        submenu: [
            {
                label: "Toggle Full Screen",
                role: "togglefullscreen",
                accelerator: "F11",
            },
            {
                label: "Minimize",
                role: "minimize",
                accelerator: "Ctrl+M",
            },
        ],
    },
    {
        label: "Run",
        submenu: [
            {
                label: "Spell Checker",
                role: "toggleSpellChecker",
            },
        ],
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

export default menuTemplateStartPage;
