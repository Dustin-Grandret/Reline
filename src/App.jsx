/* eslint-disable quote-props */
import React from "react";
import { useSelector } from "react-redux";

// import RelineDiagram from "./components/RelineDiagram/RelineDiagram";

// import RelineGraphUtil from "./services/Reline/utils/RelineGraphUtil";
// import RelineNodeUtil from "./services/Reline/utils/RelineNodeUtil";

import CreateGraphRoute from "./components/CreateGraphRoute/CreateGraphRoute";

// import SidebarContainer from "./components/SidebarContainer/SidebarContainer";

import MainView from "./components/MainView/MainView";
import StartPage from "./components/StartPage/StartPage";

import RelineSnackBar from "./components/RelineSnackBar/RelineSnackBar";

const routes = {
    "startPage": <StartPage />,
    "createGraph": <CreateGraphRoute />,
    "mainView": <MainView />,
};

function App() {
    const {
        currentRoute,
    } = useSelector((state) => state.systemStatus);

    return (
        <>
            {routes[currentRoute]}
            <RelineSnackBar />
        </>
    );
}
export default App;
