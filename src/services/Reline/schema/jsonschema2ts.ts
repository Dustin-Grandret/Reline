// eslint-disable-next-line import/no-extraneous-dependencies
import { compileFromFile } from "json-schema-to-typescript";
import fs from "fs";

// Use this routine in current directory

const entryDir:string = "./";
const outputDir:string = "../interfaces/";
const schemaPathList:string[] = [
    "node.relineSchema",
    "edge.relineSchema",
    "graph.relineSchema",
    "graphs.relineSchema",
    "elementBase.relineSchema",
];

// eslint-disable-next-line no-restricted-syntax
for (const schemaPath of schemaPathList) {
    compileFromFile(`${entryDir}${schemaPath}.json`)
        .then((ts) => fs.writeFileSync(`${outputDir}${schemaPath}.ts`, ts));
}
