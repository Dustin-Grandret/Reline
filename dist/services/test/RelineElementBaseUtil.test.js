"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jest/no-conditional-expect */
var RelineElementBaseUtil_1 = __importDefault(require("../Reline/utils/RelineElementBaseUtil"));
var RelineValidator_1 = __importDefault(require("../Reline/RelineValidator"));
describe("Test class RelineElementBaseUtil", function () {
    it("Test class", function () {
        var testRelineElementBaseUtil = new RelineElementBaseUtil_1.default();
        expect(testRelineElementBaseUtil).toEqual(new RelineElementBaseUtil_1.default());
    });
    describe("Test create()", function () {
        it("Create('') invalid, strict-mode", function () {
            expect(function () {
                RelineElementBaseUtil_1.default.create("", { strict: true });
            }).toThrow(Error);
        });
        it("Create('') invalid, non strict-mode", function () {
            expect(RelineElementBaseUtil_1.default.create("", { strict: false })).toBeUndefined();
        });
        it("Create('1') valid", function () {
            var validator = new RelineValidator_1.default();
            var testElementBase = RelineElementBaseUtil_1.default.create("1", { strict: false });
            if (testElementBase) {
                expect(validator.isValidElementBase(testElementBase)).toBe(true);
                expect(testElementBase.id).toBe("1");
            }
            else {
                // TODO: Dirty trick
                expect("Create('1') outputs undefined").toBe(false);
            }
        });
    });
    describe("Test copy()", function () {
        it("Copy() valid elementBase", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineElementBaseUtil_1.default.copy(testElementBase)).toEqual(testElementBase);
        });
    });
    describe("Test isEqual()", function () {
        it("isEqual()  with same elementBases.", function () {
            var elementBase1 = {
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
            var elementBase2 = {
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
            expect(RelineElementBaseUtil_1.default.isEqual(elementBase1, elementBase2)).toBe(true);
        });
        it("isEqual() with different elementBases.", function () {
            var elementBase1 = {
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
            var elementBase2 = {
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
            expect(RelineElementBaseUtil_1.default.isEqual(elementBase1, elementBase2)).toBe(false);
        });
    });
    describe("Test updateField()", function () {
        it("fieldName is empty and option.strict is true", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(function () {
                RelineElementBaseUtil_1.default.updateField(testElementBase, "", { color: "red" }, { strict: true });
            }).toThrow(Error(RelineElementBaseUtil_1.default.FIELD_NAME_EMPTY));
        });
        it("fieldName is empty and option.strict is false", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            var a = RelineElementBaseUtil_1.default.updateField(testElementBase, "", { color: "red" }, { strict: false });
            expect(a).toEqual(testElementBase);
        });
        it("fieldName is not founded in elementBase and option.strict is true", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(function () {
                RelineElementBaseUtil_1.default.updateField(testElementBase, "theme", { color: "red" }, { strict: true });
            }).toThrow(Error(RelineElementBaseUtil_1.default.FIELD_NAME_NOT_FOUNDED));
        });
        it("fieldName is not founded in elementBase and option.strict is false", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineElementBaseUtil_1.default.updateField(testElementBase, "theme", { color: "red" }, { strict: false })).toEqual({
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
        it("fieldName is founded in elementBase and option.strict is true", function () {
            var testElementBase = {
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
            expect(RelineElementBaseUtil_1.default.updateField(testElementBase, "prop", { attr: "3" }, { strict: true })).toEqual({
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
        it("fieldName is founded in elementBase and option.strict is false", function () {
            var testElementBase = {
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
            expect(RelineElementBaseUtil_1.default.updateField(testElementBase, "prop", { attr: "3" }, { strict: false })).toEqual({
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
    describe("Test createField()", function () {
        it("fieldName is empty and option.strict is true", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(function () {
                RelineElementBaseUtil_1.default.createField(testElementBase, "", { strict: true });
            }).toThrow(Error(RelineElementBaseUtil_1.default.FIELD_NAME_EMPTY));
        });
        it("fieldName is empty and option.strict is false", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            var a = RelineElementBaseUtil_1.default.createField(testElementBase, "", { strict: false });
            expect(a).toEqual(testElementBase);
        });
        it("fieldName is not founded in elementBase and option.strict is true", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineElementBaseUtil_1.default.createField(testElementBase, "theme", { strict: true })).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    theme: {},
                },
            });
        });
        it("fieldName is not founded in elementBase and option.strict is false", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineElementBaseUtil_1.default.createField(testElementBase, "theme", { strict: false })).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    theme: {},
                },
            });
        });
        it("fieldName is founded in elementBase and option.strict is true", function () {
            var testElementBase = {
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
            expect(function () {
                RelineElementBaseUtil_1.default.createField(testElementBase, "prop", { strict: true });
            }).toThrow(Error(RelineElementBaseUtil_1.default.FIELD_NAME_DUPLICATED));
        });
        it("fieldName is founded in elementBase and option.strict is false", function () {
            var testElementBase = {
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
            expect(RelineElementBaseUtil_1.default.createField(testElementBase, "prop", { strict: false })).toEqual(testElementBase);
        });
    });
    describe("Test deleteField()", function () {
        it("fieldName is empty and option.strict is true", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(function () {
                RelineElementBaseUtil_1.default.deleteField(testElementBase, "", { strict: true });
            }).toThrow(Error(RelineElementBaseUtil_1.default.FIELD_NAME_EMPTY));
        });
        it("fieldName is empty and option.strict is false", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            var a = RelineElementBaseUtil_1.default.deleteField(testElementBase, "", { strict: false });
            expect(a).toEqual(testElementBase);
        });
        it("fieldName is not founded in elementBase and option.strict is true", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(function () {
                RelineElementBaseUtil_1.default.deleteField(testElementBase, "theme", { strict: true });
            }).toThrow(Error(RelineElementBaseUtil_1.default.FIELD_NAME_NOT_FOUNDED));
        });
        it("fieldName is not founded in elementBase and option.strict is false", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineElementBaseUtil_1.default.deleteField(testElementBase, "theme", { strict: false })).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            });
        });
        it("fieldName is founded in elementBase and option.strict is true", function () {
            var testElementBase = {
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
            expect(RelineElementBaseUtil_1.default.deleteField(testElementBase, "prop", { strict: true })).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            });
        });
        it("fieldName is founded in elementBase and option.strict is false", function () {
            var testElementBase = {
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
            expect(RelineElementBaseUtil_1.default.deleteField(testElementBase, "prop", { strict: false })).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            });
        });
    });
    describe("Test isEqualField()", function () {
        it("different fields", function () {
            expect(RelineElementBaseUtil_1.default.isEqualField({
                a: 1,
            }, {
                a: 2,
            })).toBe(false);
        });
        it("same fields", function () {
            expect(RelineElementBaseUtil_1.default.isEqualField({
                a: 1,
            }, {
                a: 1,
            })).toBe(true);
        });
    });
    describe("Test updateId()", function () {
        it("updating elementBase with empty string", function () {
            expect(function () {
                var testElementBase = {
                    id: "1",
                    metadata: {
                        basic: {
                            id: "1",
                        },
                    },
                };
                RelineElementBaseUtil_1.default.updateId(testElementBase, "");
            }).toThrow(Error(RelineElementBaseUtil_1.default.ID_EMPTY));
        });
        it("updating elementBase with non-empty(valid) string", function () {
            var testElementBase = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineElementBaseUtil_1.default.updateId(testElementBase, "2"))
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
//# sourceMappingURL=RelineElementBaseUtil.test.js.map