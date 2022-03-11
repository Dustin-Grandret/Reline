// eslint-disable-next-line import/no-extraneous-dependencies
const { compileFromFile } = require("json-schema-to-typescript");

const fs = require("fs");

const path = require("path");

compileFromFile(path.join(__dirname, "./mindgraph.schema.json"))
    .then((ts) => fs.writeFileSync(path.join(__dirname, "./mindgraph.schema.ts"), ts));
