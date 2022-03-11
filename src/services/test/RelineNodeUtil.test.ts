/* eslint-disable jest/no-conditional-expect */
import RelineNodeUtil from "../Reline/utils/RelineNodeUtil";
import RelineElementsValidator from "../Reline/RelineValidator";
import { RelineNodeSchema } from "../Reline/interfaces/node.relineSchema";

describe("Test class RelineNodeUtil", () => {
    it("Test class", () => {
        const testRelineNodeUtil = new RelineNodeUtil();
        expect(testRelineNodeUtil).toEqual(new RelineNodeUtil());
    });
    describe("Test create()", () => {
        it("Create('') invalid, strict-mode", () => {
            expect(() => {
                RelineNodeUtil.create("", { strict: true });
            }).toThrow(Error);
        });
        it("Create('') invalid, non strict-mode", () => {
            expect(RelineNodeUtil.create("", { strict: false })).toBeUndefined();
        });
        it("Create('1') valid", () => {
            const validator = new RelineElementsValidator();
            const testNode = RelineNodeUtil.create("1", { strict: false });
            if (testNode) {
                expect(validator.isValidNode(testNode)).toBe(true);
                expect(testNode.id).toBe("1");
            } else {
                // TODO: Dirty trick
                expect("Create('1') outputs undefined").toBe(false);
            }
        });
    });
    describe("Test copy()", () => {
        it("Copy() valid node", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineNodeUtil.copy(testNode)).toEqual(testNode);
        });
    });
    describe("Test isEqual()", () => {
        it("isEqual()  with same nodes.", () => {
            const node1 = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    theme: {
                        color: "red",
                    },
                },
            };
            const node2 = {
                id: "2",
                metadata: {
                    basic: {
                        id: "2",
                    },
                    theme: {
                        color: "red",
                    },
                },
            };
            expect(RelineNodeUtil.isEqual(node1, node2)).toBe(true);
        });
        it("isEqual() with different nodes.", () => {
            const node1 = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    theme: {
                        color: "red",
                    },
                },
            };
            const node2 = {
                id: "2",
                metadata: {
                    basic: {
                        id: "2",
                    },
                    theme: {
                        color: "yellow",
                    },
                },
            };
            expect(RelineNodeUtil.isEqual(node1, node2)).toBe(false);
        });
    });
    describe("Test updateField()", () => {
        it("fieldName is empty and option.strict is true", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(() => {
                RelineNodeUtil.updateField(
                    testNode,
                    "",
                    { color: "red" },
                    { strict: true },
                );
            }).toThrow(Error(RelineNodeUtil.FIELD_NAME_EMPTY));
        });
        it("fieldName is empty and option.strict is false", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            const a = RelineNodeUtil.updateField(
                testNode,
                "",
                { color: "red" },
                { strict: false },
            );
            expect(a).toEqual(testNode);
        });
        it("fieldName is not founded in node and option.strict is true", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(() => {
                RelineNodeUtil.updateField(
                    testNode,
                    "theme",
                    { color: "red" },
                    { strict: true },
                );
            }).toThrow(Error(RelineNodeUtil.FIELD_NAME_NOT_FOUNDED));
        });
        it("fieldName is not founded in node and option.strict is false", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineNodeUtil.updateField(
                testNode,
                "theme",
                { color: "red" },
                { strict: false },
            )).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    theme: {
                        color: "red",
                    },
                },
            });
        });
        it("fieldName is founded in node and option.strict is true", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    prop: {
                        attr: "2",
                    },
                },
            };
            expect(RelineNodeUtil.updateField(
                testNode,
                "prop",
                { attr: "3" },
                { strict: true },
            )).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    prop: {
                        attr: "3",
                    },
                },
            });
        });
        it("fieldName is founded in node and option.strict is false", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    prop: {
                        attr: "2",
                    },
                },
            };
            expect(RelineNodeUtil.updateField(
                testNode,
                "prop",
                { attr: "3" },
                { strict: false },
            )).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    prop: {
                        attr: "3",
                    },
                },
            });
        });
    });
    describe("Test createField()", () => {
        it("fieldName is empty and option.strict is true", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(() => {
                RelineNodeUtil.createField(
                    testNode,
                    "",
                    { strict: true },
                );
            }).toThrow(Error(RelineNodeUtil.FIELD_NAME_EMPTY));
        });
        it("fieldName is empty and option.strict is false", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            const a = RelineNodeUtil.createField(
                testNode,
                "",
                { strict: false },
            );
            expect(a).toEqual(testNode);
        });
        it("fieldName is not founded in node and option.strict is true", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineNodeUtil.createField(
                testNode,
                "theme",
                { strict: true },
            )).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    theme: {

                    },
                },
            });
        });
        it("fieldName is not founded in node and option.strict is false", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineNodeUtil.createField(
                testNode,
                "theme",
                { strict: false },
            )).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    theme: {

                    },
                },
            });
        });
        it("fieldName is founded in node and option.strict is true", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    prop: {
                        attr: "2",
                    },
                },
            };
            expect(
                () => {
                    RelineNodeUtil.createField(
                        testNode,
                        "prop",
                        { strict: true },
                    );
                },
            ).toThrow(Error(RelineNodeUtil.FIELD_NAME_DUPLICATED));
        });
        it("fieldName is founded in node and option.strict is false", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    prop: {
                        attr: "2",
                    },
                },
            };
            expect(RelineNodeUtil.createField(
                testNode,
                "prop",
                { strict: false },
            )).toEqual(testNode);
        });
    });
    describe("Test deleteField()", () => {
        it("fieldName is empty and option.strict is true", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(() => {
                RelineNodeUtil.deleteField(
                    testNode,
                    "",
                    { strict: true },
                );
            }).toThrow(Error(RelineNodeUtil.FIELD_NAME_EMPTY));
        });
        it("fieldName is empty and option.strict is false", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            const a = RelineNodeUtil.deleteField(
                testNode,
                "",
                { strict: false },
            );
            expect(a).toEqual(testNode);
        });
        it("fieldName is not founded in node and option.strict is true", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(() => {
                RelineNodeUtil.deleteField(
                    testNode,
                    "theme",
                    { strict: true },
                );
            }).toThrow(Error(RelineNodeUtil.FIELD_NAME_NOT_FOUNDED));
        });
        it("fieldName is not founded in node and option.strict is false", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineNodeUtil.deleteField(
                testNode,
                "theme",
                { strict: false },
            )).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            });
        });
        it("fieldName is founded in node and option.strict is true", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    prop: {
                        attr: "2",
                    },
                },
            };
            expect(RelineNodeUtil.deleteField(
                testNode,
                "prop",
                { strict: true },
            )).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            });
        });
        it("fieldName is founded in node and option.strict is false", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    prop: {
                        attr: "2",
                    },
                },
            };
            expect(RelineNodeUtil.deleteField(
                testNode,
                "prop",
                { strict: false },
            )).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            });
        });
    });
    describe("Test isEqualField()", () => {
        it("different fields", () => {
            expect(RelineNodeUtil.isEqualField({
                a: 1,
            }, {
                a: 2,
            })).toBe(false);
        });
        it("same fields", () => {
            expect(RelineNodeUtil.isEqualField({
                a: 1,
            }, {
                a: 1,
            })).toBe(true);
        });
    });
    describe("Test updateId()", () => {
        it("updating node with empty string", () => {
            expect(() => {
                const testNode: RelineNodeSchema = {
                    id: "1",
                    metadata: {
                        basic: {
                            id: "1",
                        },
                    },
                };
                RelineNodeUtil.updateId(testNode, "");
            }).toThrow(Error(RelineNodeUtil.ID_EMPTY));
        });
        it("updating node with non-empty(valid) string", () => {
            const testNode: RelineNodeSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineNodeUtil.updateId(testNode, "2"))
                .toEqual({
                    id: "2",
                    metadata: {
                        basic: {
                            id: "2",
                        },
                    },
                });
        });
    });
});
