/* eslint-disable jest/no-conditional-expect */
import RelineGraphUtil from '../Reline/utils/RelineGraphUtil';
import RelineValidator from '../Reline/RelineValidator';
import { RelineGraphSchema } from '../Reline/interfaces/graph.relineSchema';

describe("Test class RelineGraphUtil", () => {
    it("Test class", () => {
        const testRelineEdgeUtil = new RelineGraphUtil();
        expect(testRelineEdgeUtil).toEqual(new RelineGraphUtil());
    });
    describe("Test create()", () => {
        it("Create('1') valid", () => {
            const validator = new RelineValidator();
            const testGraph = RelineGraphUtil.create("1", { strict: true });
            console.log(testGraph);
            if (testGraph) {
                expect(validator.isValidGraph(testGraph)).toBe(true);
                expect(testGraph.id).toBe("1");
            } else {
                // TODO: Dirty trick
                expect("Create('1') outputs undefined").toBe(false);
            }
        });
    });
    describe("Test isEqual()", () => {
        it("isEqual()  with same graph.", () => {
            const graph1:RelineGraphSchema = {
                id: "1",
                nodes: {},
                edges: [],
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            const graph2:RelineGraphSchema = {
                id: "2",
                nodes: {},
                edges: [],
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineGraphUtil.isEqual(graph1, graph2)).toBe(true);
        });
        it("isEqual() with different edges.", () => {
            const graph1 = {
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
            const graph2 = {
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
            expect(RelineGraphUtil.isEqual(graph1, graph2)).toBe(false);
        });
    });
});
