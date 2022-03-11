/* eslint-disable quote-props */
import { Menu } from "electron";

import menuTemplateStartPage from "./menuTemplateStartPage";
import menuTemplateMainView from "./menuTemplateMainView";
import menuTemplateCreateGraphRoute from "./menuTemplateCreateGraphRoute";

const templates = {
    "startPage": menuTemplateStartPage,
    "createGraph": menuTemplateCreateGraphRoute,
    "mainView": menuTemplateMainView,
};

function setApplicationMenu(routeName) {
    const menu = Menu.buildFromTemplate(templates[routeName]);
    Menu.setApplicationMenu(menu);
}

export {
    setApplicationMenu,
};
