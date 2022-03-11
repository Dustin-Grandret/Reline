"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastCopy_1 = __importStar(require("../utils/fastCopy"));
describe("Test fastCopy with json", function () {
    it("test class", function () {
        var testClass = new fastCopy_1.FastCopyClass();
        expect(testClass).toEqual(new fastCopy_1.FastCopyClass());
    });
    it("Simple json", function () {
        expect((0, fastCopy_1.default)({ a: 1 })).toEqual({ a: 1 });
    });
    // eslint-disable-next-line jest/no-commented-out-tests
    /* 51ms,46047ms
    it("Huge json", () => {
        const hugeJson:any = {};
        for (let i = 0; i < 10000; i += 1) {
            hugeJson[i.toString()] = i;
        }
        console.time("hugeJsonCopyTime");
        expect(fastCopy(hugeJson)).toEqual(hugeJson);
        console.timeEnd("hugeJsonCopyTime");
    });
    it("Huge-Huge json", () => {
        const hugeJson:any = {};
        for (let i = 0; i < 10000000; i += 1) {
            hugeJson[i.toString()] = i;
        }
        console.time("hugeJsonCopyTime");
        expect(fastCopy(hugeJson)).toEqual(hugeJson);
        console.timeEnd("hugeJsonCopyTime");
    });
    */
});
//# sourceMappingURL=utils.jsonCopy.fastCopy.test.js.map