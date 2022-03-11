"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jest/no-conditional-expect */
var RelineGraphUtil_1 = __importDefault(require("../Reline/utils/RelineGraphUtil"));
var RelineValidator_1 = __importDefault(require("../Reline/RelineValidator"));
describe("Test class RelineGraphUtil", function () {
    it("Test class", function () {
        var testRelineEdgeUtil = new RelineGraphUtil_1.default();
        expect(testRelineEdgeUtil).toEqual(new RelineGraphUtil_1.default());
    });
    describe("Test create()", function () {
        it("Create('1') valid", function () {
            var validator = new RelineValidator_1.default();
            var testGraph = RelineGraphUtil_1.default.create("1", { strict: true });
            console.log(testGraph);
            if (testGraph) {
                expect(validator.isValidGraph(testGraph)).toBe(true);
                expect(testGraph.id).toBe("1");
            }
            else {
                // TODO: Dirty trick
                expect("Create('1') outputs undefined").toBe(false);
            }
        });
    });
    describe("Test isEqual()", function () {
        it("isEqual()  with same graph.", function () {
            var graph1 = {
                id: "1",
                nodes: {},
                edges: [],
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            var graph2 = {
                id: "2",
                nodes: {},
                edges: [],
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineGraphUtil_1.default.isEqual(graph1, graph2)).toBe(true);
        });
        it("isEqual() with different edges.", function () {
            var graph1 = {
                id: "1",
                nodes: {},
                edges: [{
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
                    }],
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            var graph2 = {
                id: "1",
                nodes: {},
                edges: [{
                        id: "1",
                        target: "789",
                        source: "456",
                        metadata: {
                            basic: {
                                id: "1",
                            },
                            theme: {
                                color: "red",
                            },
                        },
                    }],
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineGraphUtil_1.default.isEqual(graph1, graph2)).toBe(false);
        });
    });
});
//# sourceMappingURL=RelineGraphUtil.test.js.map