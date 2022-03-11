"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
var json_schema_to_typescript_1 = require("json-schema-to-typescript");
var fs_1 = __importDefault(require("fs"));
// Use this routine in current directory
var entryDir = "./";
var outputDir = "../interfaces/";
var schemaPathList = [
    "node.relineSchema",
    "edge.relineSchema",
    "graph.relineSchema",
    "graphs.relineSchema",
    "elementBase.relineSchema",
];
var _loop_1 = function (schemaPath) {
    (0, json_schema_to_typescript_1.compileFromFile)("".concat(entryDir).concat(schemaPath, ".json"))
        .then(function (ts) { return fs_1.default.writeFileSync("".concat(outputDir).concat(schemaPath, ".ts"), ts); });
};
// eslint-disable-next-line no-restricted-syntax
for (var _i = 0, schemaPathList_1 = schemaPathList; _i < schemaPathList_1.length; _i++) {
    var schemaPath = schemaPathList_1[_i];
    _loop_1(schemaPath);
}
//# sourceMappingURL=jsonschema2ts.js.map