"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jest/no-conditional-expect */
var RelineEdgeUtil_1 = __importDefault(require("../Reline/utils/RelineEdgeUtil"));
var RelineValidator_1 = __importDefault(require("../Reline/RelineValidator"));
describe("Test class RelineElementBaseUtil", function () {
    it("Test class", function () {
        var testRelineEdgeUtil = new RelineEdgeUtil_1.default();
        expect(testRelineEdgeUtil).toEqual(new RelineEdgeUtil_1.default());
    });
    describe("Test create()", function () {
        it("Create('1') valid", function () {
            var validator = new RelineValidator_1.default();
            var testEdge = RelineEdgeUtil_1.default.create("1", { strict: false });
            if (testEdge) {
                expect(validator.isValidEdge(testEdge)).toBe(true);
                expect(testEdge.id).toBe("1");
            }
            else {
                // TODO: Dirty trick
                expect("Create('1') outputs undefined").toBe(false);
            }
        });
    });
    describe("Test isEqual()", function () {
        it("isEqual()  with same elementBases.", function () {
            var edge1 = {
                id: "1",
                target: "123",
                source: "456",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    theme: {
                        color: "red",
                    },
                },
            };
            var edge2 = {
                id: "2",
                target: "123",
                source: "456",
                metadata: {
                    basic: {
                        id: "2",
                    },
                    theme: {
                        color: "red",
                    },
                },
            };
            expect(RelineEdgeUtil_1.default.isEqual(edge1, edge2)).toBe(true);
        });
        it("isEqual() with different edges.", function () {
            var edge1 = {
                id: "1",
                target: "123",
                source: "456",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    theme: {
                        color: "red",
                    },
                },
            };
            var edge2 = {
                id: "2",
                target: "123",
                source: "456",
                metadata: {
                    basic: {
                        id: "2",
                    },
                    theme: {
                        color: "yellow",
                    },
                },
            };
            expect(RelineEdgeUtil_1.default.isEqual(edge1, edge2)).toBe(false);
        });
        it("isEqual() with different sources.", function () {
            var edge1 = {
                id: "1",
                target: "123",
                source: "456",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    theme: {
                        color: "red",
                    },
                },
            };
            var edge2 = {
                id: "2",
                target: "123",
                source: "789",
                metadata: {
                    basic: {
                        id: "2",
                    },
                    theme: {
                        color: "red",
                    },
                },
            };
            expect(RelineEdgeUtil_1.default.isEqual(edge1, edge2)).toBe(false);
        });
    });
    describe("Test updateEnds()", function () {
        it("Test updateEnds()", function () {
            var edge = RelineEdgeUtil_1.default.create("1", { strict: true });
            if (edge) {
                RelineEdgeUtil_1.default.updateEnds(edge, "2", "3");
            }
            expect(edge).toEqual({
                id: "1",
                source: "2",
                target: "3",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            });
        });
    });
});
//# sourceMappingURL=RelineEdgeUtil.test.js.map