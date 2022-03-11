/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./electron/global.js":
/*!****************************!*\
  !*** ./electron/global.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _mainActions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainActions */ \"./electron/mainActions.js\");\n\nconst global = {\n  shared: {}\n};\nglobal.shared.options = (0,_mainActions__WEBPACK_IMPORTED_MODULE_0__.getOptions)();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (global);\n\n//# sourceURL=webpack://reline/./electron/global.js?");

/***/ }),

/***/ "./electron/index.js":
/*!***************************!*\
  !*** ./electron/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.js */ \"./electron/global.js\");\n/* harmony import */ var _mainActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mainActions */ \"./electron/mainActions.js\");\n/* harmony import */ var _menu_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu/menu */ \"./electron/menu/menu.js\");\n/* harmony import */ var _ipcMainHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ipcMainHandler */ \"./electron/ipcMainHandler.js\");\n/* eslint-disable import/no-extraneous-dependencies */\n\n\n\n\n\nconst {\n  options\n} = _global_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].shared; // Initiate menu\n\n(0,_menu_menu__WEBPACK_IMPORTED_MODULE_3__.setApplicationMenu)(\"startPage\", options);\nlet mainWindow = null;\nelectron__WEBPACK_IMPORTED_MODULE_0__.app.whenReady().then(() => {\n  electron__WEBPACK_IMPORTED_MODULE_0__.globalShortcut.register(\"Ctrl+R\", () => {\n    mainWindow.reload();\n  });\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__.app.on(\"ready\", () => {\n  mainWindow = (0,_mainActions__WEBPACK_IMPORTED_MODULE_2__.createNewWindow)(options);\n  (0,_mainActions__WEBPACK_IMPORTED_MODULE_2__.loadAppHTML)(mainWindow);\n\n  if (!electron__WEBPACK_IMPORTED_MODULE_0__.app.isPackaged) {\n    mainWindow.webContents.openDevTools();\n  }\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__.app.on(\"window-all-closed\", () => {\n  electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();\n});\n\n//# sourceURL=webpack://reline/./electron/index.js?");

/***/ }),

/***/ "./electron/ipcMainHandler.js":
/*!************************************!*\
  !*** ./electron/ipcMainHandler.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mainActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mainActions */ \"./electron/mainActions.js\");\n/* harmony import */ var _menu_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu/menu */ \"./electron/menu/menu.js\");\n\n\n\nelectron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle(\"open-file\", (event, args) => (0,_mainActions__WEBPACK_IMPORTED_MODULE_1__.createOpenFileDialog)());\nelectron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle(\"refresh-menu\", (event, args) => (0,_menu_menu__WEBPACK_IMPORTED_MODULE_2__.setApplicationMenu)(args.routeName || \"startPage\"));\nelectron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle(\"save-file-with-dialog\", (event, args) => (0,_mainActions__WEBPACK_IMPORTED_MODULE_1__.saveFileWithDialogSync)(args.data));\nelectron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle(\"open-plugin\", (event, args) => (0,_mainActions__WEBPACK_IMPORTED_MODULE_1__.openPlugin)(args));\n\n//# sourceURL=webpack://reline/./electron/ipcMainHandler.js?");

/***/ }),

/***/ "./electron/mainActions.js":
/*!*********************************!*\
  !*** ./electron/mainActions.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createNewWindow\": () => (/* binding */ createNewWindow),\n/* harmony export */   \"createOpenFileDialog\": () => (/* binding */ createOpenFileDialog),\n/* harmony export */   \"getOptions\": () => (/* binding */ getOptions),\n/* harmony export */   \"loadAppHTML\": () => (/* binding */ loadAppHTML),\n/* harmony export */   \"loadFile\": () => (/* binding */ loadFile),\n/* harmony export */   \"openPlugin\": () => (/* binding */ openPlugin),\n/* harmony export */   \"saveFileSync\": () => (/* binding */ saveFileSync),\n/* harmony export */   \"saveFileWithDialogSync\": () => (/* binding */ saveFileWithDialogSync)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst appFilePath = path__WEBPACK_IMPORTED_MODULE_1___default().join(electron__WEBPACK_IMPORTED_MODULE_2__.app.getAppPath(), \"index.html\");\n\nconst emptyFunc = () => {};\n\nconst createNewWindow = options => {\n  const windowsOptions = (options || {}).windows;\n  const {\n    width,\n    height,\n    minWidth,\n    minHeight,\n    webPreferences\n  } = windowsOptions || {}; // eslint-disable-next-line prefer-const\n\n  let window = new electron__WEBPACK_IMPORTED_MODULE_2__.BrowserWindow({\n    width: width || 1200,\n    height: height || 1050,\n    minWidth: minWidth || 800,\n    minHeight: minHeight || 600,\n    webPreferences: webPreferences || {\n      nodeIntegration: true,\n      contextIsolation: false\n    }\n  });\n  window.on(\"close\", () => {\n    window = null;\n  });\n  return window;\n};\n\nconst loadAppHTML = (window, filePath) => {\n  window.loadFile(filePath || appFilePath);\n};\n\nconst createOpenFileDialog = () => electron__WEBPACK_IMPORTED_MODULE_2__.dialog.showOpenDialogSync({\n  title: \"Open or Save a reline graph file with .json\",\n  filters: [{\n    name: \"Reline Graph\",\n    extensions: [\"json\", \"reline\"]\n  }],\n  properties: [\"openFile\"]\n});\n\nconst saveFileSync = (filePath, data) => {\n  return fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(filePath, data);\n};\n\nconst loadFile = (filePath, dataCallback, errCallback) => {\n  fs__WEBPACK_IMPORTED_MODULE_0___default().readFile(filePath, {\n    encoding: \"utf-8\",\n    flag: \"r\"\n  }, (err, data) => {\n    if (err) {\n      errCallback(err);\n    } else {\n      dataCallback(data);\n    }\n  });\n};\n\nconst saveFileWithDialogSync = (data, successCallback, failedCallback) => {\n  const filePaths = createOpenFileDialog();\n\n  if (filePaths.length > 0) {\n    saveFileSync(filePaths[0], data);\n  }\n};\n\nconst getOptions = () => JSON.parse(fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_1___default().join(electron__WEBPACK_IMPORTED_MODULE_2__.app.getAppPath(), electron__WEBPACK_IMPORTED_MODULE_2__.app.isPackaged ? \"reline.config.json\" : \"../../reline.config.jsonc\"), {\n  encoding: \"utf-8\",\n  flag: \"r\"\n}));\n\nconst openPlugin = args => {\n  const window = createNewWindow();\n  loadAppHTML(window, path__WEBPACK_IMPORTED_MODULE_1___default().join(electron__WEBPACK_IMPORTED_MODULE_2__.app.getAppPath(), electron__WEBPACK_IMPORTED_MODULE_2__.app.isPackaged ? \"./\" : \"../../\", \"plugins\", args.name, \"target/index.html\"));\n};\n\n\n\n//# sourceURL=webpack://reline/./electron/mainActions.js?");

/***/ }),

/***/ "./electron/menu/menu.js":
/*!*******************************!*\
  !*** ./electron/menu/menu.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setApplicationMenu\": () => (/* binding */ setApplicationMenu)\n/* harmony export */ });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _menuTemplateStartPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menuTemplateStartPage */ \"./electron/menu/menuTemplateStartPage.js\");\n/* harmony import */ var _menuTemplateMainView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menuTemplateMainView */ \"./electron/menu/menuTemplateMainView.js\");\n/* harmony import */ var _menuTemplateCreateGraphRoute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menuTemplateCreateGraphRoute */ \"./electron/menu/menuTemplateCreateGraphRoute.js\");\n/* eslint-disable quote-props */\n\n\n\n\nconst templates = {\n  \"startPage\": _menuTemplateStartPage__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  \"createGraph\": _menuTemplateCreateGraphRoute__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  \"mainView\": _menuTemplateMainView__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n};\n\nfunction setApplicationMenu(routeName) {\n  const menu = electron__WEBPACK_IMPORTED_MODULE_0__.Menu.buildFromTemplate(templates[routeName]);\n  electron__WEBPACK_IMPORTED_MODULE_0__.Menu.setApplicationMenu(menu);\n}\n\n\n\n//# sourceURL=webpack://reline/./electron/menu/menu.js?");

/***/ }),

/***/ "./electron/menu/menuTemplateBase.js":
/*!*******************************************!*\
  !*** ./electron/menu/menuTemplateBase.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"newWindowClick\": () => (/* binding */ newWindowClick),\n/* harmony export */   \"openFileClick\": () => (/* binding */ openFileClick),\n/* harmony export */   \"saveClick\": () => (/* binding */ saveClick)\n/* harmony export */ });\n/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ \"./electron/global.js\");\n/* harmony import */ var _mainActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mainActions */ \"./electron/mainActions.js\");\n\n\nconst {\n  options\n} = _global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].shared;\n\nconst newWindowClick = () => {\n  const window = (0,_mainActions__WEBPACK_IMPORTED_MODULE_1__.createNewWindow)(options);\n  (0,_mainActions__WEBPACK_IMPORTED_MODULE_1__.loadAppHTML)(window);\n};\n\nconst openFileClick = () => {\n  const filePath = (0,_mainActions__WEBPACK_IMPORTED_MODULE_1__.createOpenFileDialog)();\n\n  if (filePath) {\n    console.log(filePath);\n  }\n};\n\nconst saveClick = _mainActions__WEBPACK_IMPORTED_MODULE_1__.saveFileWithDialogSync;\nconst menuTemplateBase = [{\n  label: \"File\",\n  submenu: [{\n    label: \"New Window\",\n    accelerator: \"Ctrl+Shift+N\",\n    click: newWindowClick\n  }, {\n    type: \"separator\"\n  }, {\n    label: \"Preferences\"\n  }, {\n    type: \"separator\"\n  }, {\n    label: \"Exit\",\n    accelerator: \"Ctrl+Q\"\n  }]\n}, {\n  label: \"View\",\n  submenu: [{\n    label: \"Toggle Full Screen\",\n    accelerator: \"F11\"\n  }, {\n    label: \"Minimize\",\n    accelerator: \"Ctrl+M\"\n  }]\n}, {\n  label: \"Run\",\n  submenu: []\n}, {\n  label: \"Help\",\n  submenu: [{\n    label: \"Learn More\"\n  }, {\n    label: \"Documentation\"\n  }, {\n    label: \"Community Discussion\"\n  }, {\n    label: \"About Author\"\n  }]\n}];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuTemplateBase);\n\n\n//# sourceURL=webpack://reline/./electron/menu/menuTemplateBase.js?");

/***/ }),

/***/ "./electron/menu/menuTemplateCreateGraphRoute.js":
/*!*******************************************************!*\
  !*** ./electron/menu/menuTemplateCreateGraphRoute.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _menuTemplateStartPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menuTemplateStartPage */ \"./electron/menu/menuTemplateStartPage.js\");\n\nconst menuTemplateCreateGraphRoute = _menuTemplateStartPage__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuTemplateCreateGraphRoute);\n\n//# sourceURL=webpack://reline/./electron/menu/menuTemplateCreateGraphRoute.js?");

/***/ }),

/***/ "./electron/menu/menuTemplateMainView.js":
/*!***********************************************!*\
  !*** ./electron/menu/menuTemplateMainView.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _mainActions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mainActions */ \"./electron/mainActions.js\");\n/* harmony import */ var _menuTemplateBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menuTemplateBase */ \"./electron/menu/menuTemplateBase.js\");\n\n\nconst menuTemplateMainView = _menuTemplateBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuTemplateMainView);\n\n//# sourceURL=webpack://reline/./electron/menu/menuTemplateMainView.js?");

/***/ }),

/***/ "./electron/menu/menuTemplateStartPage.js":
/*!************************************************!*\
  !*** ./electron/menu/menuTemplateStartPage.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _menuTemplateBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menuTemplateBase */ \"./electron/menu/menuTemplateBase.js\");\n\nconst menuTemplateStartPage = [{\n  label: \"File\",\n  submenu: [{\n    label: \"New Window\",\n    accelerator: \"Ctrl+Shift+N\",\n    click: _menuTemplateBase__WEBPACK_IMPORTED_MODULE_0__.newWindowClick\n  }, {\n    type: \"separator\"\n  }, {\n    label: \"Preferences\"\n  }, {\n    type: \"separator\"\n  }, {\n    label: \"Close\",\n    role: \"close\",\n    accelerator: \"Alt+F4\"\n  }]\n}, {\n  label: \"View\",\n  submenu: [{\n    label: \"Toggle Full Screen\",\n    role: \"togglefullscreen\",\n    accelerator: \"F11\"\n  }, {\n    label: \"Minimize\",\n    role: \"minimize\",\n    accelerator: \"Ctrl+M\"\n  }]\n}, {\n  label: \"Run\",\n  submenu: [{\n    label: \"Spell Checker\",\n    role: \"toggleSpellChecker\"\n  }]\n}, {\n  label: \"Help\",\n  submenu: [{\n    label: \"Learn More\"\n  }, {\n    label: \"Documentation\"\n  }, {\n    label: \"Community Discussion\"\n  }, {\n    label: \"About Author\"\n  }]\n}];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuTemplateStartPage);\n\n//# sourceURL=webpack://reline/./electron/menu/menuTemplateStartPage.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./electron/index.js");
/******/ 	
/******/ })()
;