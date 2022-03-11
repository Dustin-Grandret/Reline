"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jest/no-conditional-expect */
var RelineNodeUtil_1 = __importDefault(require("../Reline/utils/RelineNodeUtil"));
var RelineValidator_1 = __importDefault(require("../Reline/RelineValidator"));
describe("Test class RelineNodeUtil", function () {
    it("Test class", function () {
        var testRelineNodeUtil = new RelineNodeUtil_1.default();
        expect(testRelineNodeUtil).toEqual(new RelineNodeUtil_1.default());
    });
    describe("Test create()", function () {
        it("Create('') invalid, strict-mode", function () {
            expect(function () {
                RelineNodeUtil_1.default.create("", { strict: true });
            }).toThrow(Error);
        });
        it("Create('') invalid, non strict-mode", function () {
            expect(RelineNodeUtil_1.default.create("", { strict: false })).toBeUndefined();
        });
        it("Create('1') valid", function () {
            var validator = new RelineValidator_1.default();
            var testNode = RelineNodeUtil_1.default.create("1", { strict: false });
            if (testNode) {
                expect(validator.isValidNode(testNode)).toBe(true);
                expect(testNode.id).toBe("1");
            }
            else {
                // TODO: Dirty trick
                expect("Create('1') outputs undefined").toBe(false);
            }
        });
    });
    describe("Test copy()", function () {
        it("Copy() valid node", function () {
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineNodeUtil_1.default.copy(testNode)).toEqual(testNode);
        });
    });
    describe("Test isEqual()", function () {
        it("isEqual()  with same nodes.", function () {
            var node1 = {
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
            var node2 = {
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
            expect(RelineNodeUtil_1.default.isEqual(node1, node2)).toBe(true);
        });
        it("isEqual() with different nodes.", function () {
            var node1 = {
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
            var node2 = {
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
            expect(RelineNodeUtil_1.default.isEqual(node1, node2)).toBe(false);
        });
    });
    describe("Test updateField()", function () {
        it("fieldName is empty and option.strict is true", function () {
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(function () {
                RelineNodeUtil_1.default.updateField(testNode, "", { color: "red" }, { strict: true });
            }).toThrow(Error(RelineNodeUtil_1.default.FIELD_NAME_EMPTY));
        });
        it("fieldName is empty and option.strict is false", function () {
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            var a = RelineNodeUtil_1.default.updateField(testNode, "", { color: "red" }, { strict: false });
            expect(a).toEqual(testNode);
        });
        it("fieldName is not founded in node and option.strict is true", function () {
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(function () {
                RelineNodeUtil_1.default.updateField(testNode, "theme", { color: "red" }, { strict: true });
            }).toThrow(Error(RelineNodeUtil_1.default.FIELD_NAME_NOT_FOUNDED));
        });
        it("fieldName is not founded in node and option.strict is false", function () {
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineNodeUtil_1.default.updateField(testNode, "theme", { color: "red" }, { strict: false })).toEqual({
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
        it("fieldName is founded in node and option.strict is true", function () {
            var testNode = {
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
            expect(RelineNodeUtil_1.default.updateField(testNode, "prop", { attr: "3" }, { strict: true })).toEqual({
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
        it("fieldName is founded in node and option.strict is false", function () {
            var testNode = {
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
            expect(RelineNodeUtil_1.default.updateField(testNode, "prop", { attr: "3" }, { strict: false })).toEqual({
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
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(function () {
                RelineNodeUtil_1.default.createField(testNode, "", { strict: true });
            }).toThrow(Error(RelineNodeUtil_1.default.FIELD_NAME_EMPTY));
        });
        it("fieldName is empty and option.strict is false", function () {
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            var a = RelineNodeUtil_1.default.createField(testNode, "", { strict: false });
            expect(a).toEqual(testNode);
        });
        it("fieldName is not founded in node and option.strict is true", function () {
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineNodeUtil_1.default.createField(testNode, "theme", { strict: true })).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    theme: {},
                },
            });
        });
        it("fieldName is not founded in node and option.strict is false", function () {
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineNodeUtil_1.default.createField(testNode, "theme", { strict: false })).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                    theme: {},
                },
            });
        });
        it("fieldName is founded in node and option.strict is true", function () {
            var testNode = {
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
                RelineNodeUtil_1.default.createField(testNode, "prop", { strict: true });
            }).toThrow(Error(RelineNodeUtil_1.default.FIELD_NAME_DUPLICATED));
        });
        it("fieldName is founded in node and option.strict is false", function () {
            var testNode = {
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
            expect(RelineNodeUtil_1.default.createField(testNode, "prop", { strict: false })).toEqual(testNode);
        });
    });
    describe("Test deleteField()", function () {
        it("fieldName is empty and option.strict is true", function () {
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(function () {
                RelineNodeUtil_1.default.deleteField(testNode, "", { strict: true });
            }).toThrow(Error(RelineNodeUtil_1.default.FIELD_NAME_EMPTY));
        });
        it("fieldName is empty and option.strict is false", function () {
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            var a = RelineNodeUtil_1.default.deleteField(testNode, "", { strict: false });
            expect(a).toEqual(testNode);
        });
        it("fieldName is not founded in node and option.strict is true", function () {
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(function () {
                RelineNodeUtil_1.default.deleteField(testNode, "theme", { strict: true });
            }).toThrow(Error(RelineNodeUtil_1.default.FIELD_NAME_NOT_FOUNDED));
        });
        it("fieldName is not founded in node and option.strict is false", function () {
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineNodeUtil_1.default.deleteField(testNode, "theme", { strict: false })).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            });
        });
        it("fieldName is founded in node and option.strict is true", function () {
            var testNode = {
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
            expect(RelineNodeUtil_1.default.deleteField(testNode, "prop", { strict: true })).toEqual({
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            });
        });
        it("fieldName is founded in node and option.strict is false", function () {
            var testNode = {
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
            expect(RelineNodeUtil_1.default.deleteField(testNode, "prop", { strict: false })).toEqual({
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
            expect(RelineNodeUtil_1.default.isEqualField({
                a: 1,
            }, {
                a: 2,
            })).toBe(false);
        });
        it("same fields", function () {
            expect(RelineNodeUtil_1.default.isEqualField({
                a: 1,
            }, {
                a: 1,
            })).toBe(true);
        });
    });
    describe("Test updateId()", function () {
        it("updating node with empty string", function () {
            expect(function () {
                var testNode = {
                    id: "1",
                    metadata: {
                        basic: {
                            id: "1",
                        },
                    },
                };
                RelineNodeUtil_1.default.updateId(testNode, "");
            }).toThrow(Error(RelineNodeUtil_1.default.ID_EMPTY));
        });
        it("updating node with non-empty(valid) string", function () {
            var testNode = {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
            };
            expect(RelineNodeUtil_1.default.updateId(testNode, "2"))
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
//# sourceMappingURL=RelineNodeUtil.test.js.map