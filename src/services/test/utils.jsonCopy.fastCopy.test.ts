import fastCopy, { FastCopyClass } from "../utils/fastCopy";

describe("Test fastCopy with json", () => {
    it("test class", () => {
        const testClass = new FastCopyClass();
        expect(testClass).toEqual(new FastCopyClass());
    });
    it("Simple json", () => {
        expect(fastCopy({ a: 1 })).toEqual({ a: 1 });
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
