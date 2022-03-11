const { validate } = require("jsonschema");
/*
let v=new Validator();
let instance='a';
let schema={
    "type":"number"
};
console.log(123);
console.log(v.validate(instance,schema)); */
const fs = require("fs");
const path = require("path");
// 构造一个函数，这个函数从test与本目录下读取
// A:=test/$var$/test.json
// B:$var$.schema.json
// 并检测A是否满足B
/**
 * Generate paths from a given schemaName, load schema and test instance,
 * and return the result of testing the instance.
 * "./$schemaName.schema.json" and "./test/$schemaName/test.json" will be generated.
 * @param {string} schemaName  The name of the schema
 * @returns {object} The result of testing instance, attribute error included.
 */
function testSchema(schemaName) {
    const testInstancePath = path.join(__dirname, "test", schemaName, "test.json");
    let testInstance = fs.readFileSync(testInstancePath, { encoding: "utf-8", flag: "r" });
    testInstance = JSON.parse(testInstance);

    const schemaPath = path.join(__dirname, `${schemaName}.schema.json`);
    let schema = fs.readFileSync(schemaPath, { encoding: "utf-8", flag: "r" });
    schema = JSON.parse(schema);

    return validate(testInstance, schema, { nestedErrors: true });
}

console.log(testSchema("mindgraph").toString());
