/* eslint-disable jest/no-conditional-expect */
import RelineElementBaseUtil from "../Reline/utils/RelineElementBaseUtil";
import RelineElementsValidator from "../Reline/RelineValidator";
import { RelineElementBaseSchema } from "../Reline/interfaces/elementBase.relineSchema";

describe("Test class RelineElementBaseUtil", () => {
    it("Test class", () => {
        const testRelineElementBaseUtil = new RelineElementBaseUtil();
        expect(testRelineElementBaseUtil).toEqual(new RelineElementBaseUtil());
    });
    describe("Test create()", () => {
        it("Create('') invalid, strict-mode", () => {
            expect(() => {
                RelineElementBaseUtil.create("", { strict: true });
            }).toThrow(Error);
        });
        it("Create('') invalid, non strict-mode", () => {
            expect(RelineElementBaseUtil.create("", { strict: false })).toBeUndefined();
        });
        it("Create('1') valid", () => {
            const validator = new RelineElementsValidator();
            const testElementBase = RelineElementBaseUtil.create("1", { strict: false });
            if (testElementBase) {
                expect(validator.isValidElementBase(testElementBase)).toBe(true);
                expect(testElementBase.id).toBe("1");
            } else {
                // TODO: Dirty trick
                expect("Create('1') outputs undefined").toBe(false);
            }
        });
    });
    describe("Test copy()", () => {
        it("Copy() valid elementBase", () => {
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineElementBaseUtil.copy(testElementBase)).toEqual(testElementBase);
        });
    });
    describe("Test isEqual()", () => {
        it("isEqual()  with same elementBases.", () => {
            const elementBase1 = {
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
            const elementBase2 = {
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
            expect(RelineElementBaseUtil.isEqual(elementBase1, elementBase2)).toBe(true);
        });
        it("isEqual() with different elementBases.", () => {
            const elementBase1 = {
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
            const elementBase2 = {
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
            expect(RelineElementBaseUtil.isEqual(elementBase1, elementBase2)).toBe(false);
        });
    });
    describe("Test updateField()", () => {
        it("fieldName is empty and option.strict is true", () => {
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(() => {
                RelineElementBaseUtil.updateField(
                    testElementBase,
                    "",
                    { color: "red" },
                    { strict: true },
                );
            }).toThrow(Error(RelineElementBaseUtil.FIELD_NAME_EMPTY));
        });
        it("fieldName is empty and option.strict is false", () => {
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            const a = RelineElementBaseUtil.updateField(
                testElementBase,
                "",
                { color: "red" },
                { strict: false },
            );
            expect(a).toEqual(testElementBase);
        });
        it("fieldName is not founded in elementBase and option.strict is true", () => {
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(() => {
                RelineElementBaseUtil.updateField(
                    testElementBase,
                    "theme",
                    { color: "red" },
                    { strict: true },
                );
            }).toThrow(Error(RelineElementBaseUtil.FIELD_NAME_NOT_FOUNDED));
        });
        it("fieldName is not founded in elementBase and option.strict is false", () => {
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineElementBaseUtil.updateField(
                testElementBase,
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
        it("fieldName is founded in elementBase and option.strict is true", () => {
            const testElementBase: RelineElementBaseSchema = {
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
            expect(RelineElementBaseUtil.updateField(
                testElementBase,
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
        it("fieldName is founded in elementBase and option.strict is false", () => {
            const testElementBase: RelineElementBaseSchema = {
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
            expect(RelineElementBaseUtil.updateField(
                testElementBase,
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
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(() => {
                RelineElementBaseUtil.createField(
                    testElementBase,
                    "",
                    { strict: true },
                );
            }).toThrow(Error(RelineElementBaseUtil.FIELD_NAME_EMPTY));
        });
        it("fieldName is empty and option.strict is false", () => {
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            const a = RelineElementBaseUtil.createField(
                testElementBase,
                "",
                { strict: false },
            );
            expect(a).toEqual(testElementBase);
        });
        it("fieldName is not founded in elementBase and option.strict is true", () => {
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineElementBaseUtil.createField(
                testElementBase,
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
        it("fieldName is not founded in elementBase and option.strict is false", () => {
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineElementBaseUtil.createField(
                testElementBase,
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
        it("fieldName is founded in elementBase and option.strict is true", () => {
            const testElementBase: RelineElementBaseSchema = {
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
                    RelineElementBaseUtil.createField(
                        testElementBase,
                        "prop",
                        { strict: true },
                    );
                },
            ).toThrow(Error(RelineElementBaseUtil.FIELD_NAME_DUPLICATED));
        });
        it("fieldName is founded in elementBase and option.strict is false", () => {
            const testElementBase: RelineElementBaseSchema = {
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
            expect(RelineElementBaseUtil.createField(
                testElementBase,
                "prop",
                { strict: false },
            )).toEqual(testElementBase);
        });
    });
    describe("Test deleteField()", () => {
        it("fieldName is empty and option.strict is true", () => {
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(() => {
                RelineElementBaseUtil.deleteField(
                    testElementBase,
                    "",
                    { strict: true },
                );
            }).toThrow(Error(RelineElementBaseUtil.FIELD_NAME_EMPTY));
        });
        it("fieldName is empty and option.strict is false", () => {
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            const a = RelineElementBaseUtil.deleteField(
                testElementBase,
                "",
                { strict: false },
            );
            expect(a).toEqual(testElementBase);
        });
        it("fieldName is not founded in elementBase and option.strict is true", () => {
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(() => {
                RelineElementBaseUtil.deleteField(
                    testElementBase,
                    "theme",
                    { strict: true },
                );
            }).toThrow(Error(RelineElementBaseUtil.FIELD_NAME_NOT_FOUNDED));
        });
        it("fieldName is not founded in elementBase and option.strict is false", () => {
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineElementBaseUtil.deleteField(
                testElementBase,
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
        it("fieldName is founded in elementBase and option.strict is true", () => {
            const testElementBase: RelineElementBaseSchema = {
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
            expect(RelineElementBaseUtil.deleteField(
                testElementBase,
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
        it("fieldName is founded in elementBase and option.strict is false", () => {
            const testElementBase: RelineElementBaseSchema = {
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
            expect(RelineElementBaseUtil.deleteField(
                testElementBase,
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
            expect(RelineElementBaseUtil.isEqualField({
                a: 1,
            }, {
                a: 2,
            })).toBe(false);
        });
        it("same fields", () => {
            expect(RelineElementBaseUtil.isEqualField({
                a: 1,
            }, {
                a: 1,
            })).toBe(true);
        });
    });
    describe("Test updateId()", () => {
        it("updating elementBase with empty string", () => {
            expect(() => {
                const testElementBase: RelineElementBaseSchema = {
                    id: "1",
                    metadata: {
                        basic: {
                            id: "1",
                        },
                    },
                };
                RelineElementBaseUtil.updateId(testElementBase, "");
            }).toThrow(Error(RelineElementBaseUtil.ID_EMPTY));
        });
        it("updating elementBase with non-empty(valid) string", () => {
            const testElementBase: RelineElementBaseSchema = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineElementBaseUtil.updateId(testElementBase, "2"))
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
