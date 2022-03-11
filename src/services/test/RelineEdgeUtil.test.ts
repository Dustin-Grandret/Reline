/* eslint-disable jest/no-conditional-expect */
import RelineEdgeUtil from "../Reline/utils/RelineEdgeUtil";
import RelineEdgeValidator from "../Reline/RelineValidator";

describe("Test class RelineElementBaseUtil", () => {
    it("Test class", () => {
        const testRelineEdgeUtil = new RelineEdgeUtil();
        expect(testRelineEdgeUtil).toEqual(new RelineEdgeUtil());
    });
    describe("Test create()", () => {
        it("Create('1') valid", () => {
            const validator = new RelineEdgeValidator();
            const testEdge = RelineEdgeUtil.create("1", { strict: false });
            if (testEdge) {
                expect(validator.isValidEdge(testEdge)).toBe(true);
                expect(testEdge.id).toBe("1");
            } else {
                // TODO: Dirty trick
                expect("Create('1') outputs undefined").toBe(false);
            }
        });
    });
    describe("Test isEqual()", () => {
        it("isEqual()  with same elementBases.", () => {
            const edge1 = {
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
            const edge2 = {
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
            expect(RelineEdgeUtil.isEqual(edge1, edge2)).toBe(true);
        });
        it("isEqual() with different edges.", () => {
            const edge1 = {
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
            const edge2 = {
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
            expect(RelineEdgeUtil.isEqual(edge1, edge2)).toBe(false);
        });
        it("isEqual() with different sources.", () => {
            const edge1 = {
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
            const edge2 = {
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
            expect(RelineEdgeUtil.isEqual(edge1, edge2)).toBe(false);
        });
    });
    describe("Test updateEnds()", () => {
        it("Test updateEnds()", () => {
            const edge = RelineEdgeUtil.create("1", { strict: true });
            if (edge) {
                RelineEdgeUtil.updateEnds(edge, "2", "3");
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
