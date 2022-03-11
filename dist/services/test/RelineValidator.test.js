"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RelineValidator_1 = __importDefault(require("../Reline/RelineValidator"));
describe("Test RelineValidator", function () {
    it("isValidElementBase() without field:basic", function () {
        var relineValidator = new RelineValidator_1.default();
        var testElementBase = {
            id: "123",
        };
        expect(relineValidator.isValidElementBase(testElementBase)).toBe(false);
    });
    it("isValidElementBase() with field:basic and valid node", function () {
        var relineValidator = new RelineValidator_1.default();
        var testElementBase = {
            id: "123",
            metadata: {
                basic: {
                    id: "123",
                },
            },
        };
        expect(relineValidator.isValidElementBase(testElementBase)).toBe(true);
    });
    it("isValidElementBase() with field:basic and incompatible ElementBase id", function () {
        var relineValidator = new RelineValidator_1.default();
        var testElementBase = {
            id: "123",
            metadata: {
                basic: {
                    id: "456",
                },
            },
        };
        expect(relineValidator.isValidElementBase(testElementBase)).toBe(false);
    });
    it("isValidNode() without field:basic", function () {
        var relineValidator = new RelineValidator_1.default();
        var testNode = {
            id: "123",
        };
        expect(relineValidator.isValidNode(testNode)).toBe(false);
    });
    it("isValidNode() with field:basic and valid node", function () {
        var relineValidator = new RelineValidator_1.default();
        var testNode = {
            id: "123",
            metadata: {
                basic: {
                    id: "123",
                },
            },
        };
        expect(relineValidator.isValidNode(testNode)).toBe(true);
    });
    it("isValidNode() with field:basic and inValid node", function () {
        var relineValidator = new RelineValidator_1.default();
        var testNode = {
            id: "123",
            metadata: {
                basic: {
                    id: "456",
                },
            },
        };
        expect(relineValidator.isValidNode(testNode)).toBe(false);
    });
    it("isValidEdge(),invalid edge.", function () {
        var relineValidator = new RelineValidator_1.default();
        var testEdge = {
            id: "1",
            source: "123",
        };
        expect(relineValidator.isValidEdge(testEdge)).toBe(false);
    });
    it("isValidEdge(),invalid edge with incompatible id.", function () {
        var relineValidator = new RelineValidator_1.default();
        var testEdge = {
            id: "1",
            source: "123",
            target: "456",
            basic: {
                id: "2",
            },
        };
        expect(relineValidator.isValidEdge(testEdge)).toBe(false);
    });
    it("isValidEdge()", function () {
        var relineValidator = new RelineValidator_1.default();
        var testEdge = {
            id: "1",
            source: "123",
            target: "456",
            metadata: {
                basic: {
                    id: "1",
                },
            },
        };
        expect(relineValidator.isValidEdge(testEdge)).toBe(true);
    });
    it("isValidGraph() without nodes and edges", function () {
        var relineValidator = new RelineValidator_1.default();
        var testGraph = {
            id: "1",
        };
        expect(relineValidator.isValidGraph(testGraph)).toBe(false);
    });
    it("isValidGraph() with nodes", function () {
        var relineValidator = new RelineValidator_1.default();
        var testGraph = {
            id: "1",
            nodes: {
                node1: {
                    id: "123",
                },
            },
        };
        expect(relineValidator.isValidGraph(testGraph)).toBe(false);
    });
    it("isValidGraph() with nodes and edges, invalid graph. Node.id is incompatible with key.", function () {
        var relineValidator = new RelineValidator_1.default();
        var testGraph = {
            id: "1",
            nodes: {
                node1: {
                    id: "123",
                    metadata: {
                        basic: {
                            id: "123",
                        },
                    },
                },
                node2: {
                    id: "456",
                    metadata: {
                        basic: {
                            id: "456",
                        },
                    },
                },
            },
            edges: [
                {
                    id: "1",
                    source: "node1",
                    target: "node2",
                },
            ],
        };
        expect(relineValidator.isValidGraph(testGraph)).toBe(false);
    });
    it("isValidGraph() with nodes and edges, valid graph", function () {
        var relineValidator = new RelineValidator_1.default();
        var testGraph = {
            id: "1",
            metadata: {
                basic: {
                    id: "1",
                },
            },
            nodes: {
                node1: {
                    id: "node1",
                    metadata: {
                        basic: {
                            id: "node1",
                        },
                    },
                },
                node2: {
                    id: "node2",
                    metadata: {
                        basic: {
                            id: "node2",
                        },
                    },
                },
            },
            edges: [
                {
                    id: "1",
                    source: "node1",
                    target: "node2",
                    metadata: {
                        basic: {
                            id: "1",
                        },
                    },
                },
            ],
        };
        expect(relineValidator.isValidGraph(testGraph)).toBe(true);
    });
    it("isValidGraph() with nodes and edges, inValid graph", function () {
        var relineValidator = new RelineValidator_1.default();
        var testGraph = {
            id: "1",
            nodes: {
                node1: {
                    id: "node1",
                    metadata: {
                        basic: {
                            id: "node1",
                        },
                    },
                },
                node2: {
                    id: "node2",
                    metadata: {
                        basic: {
                            id: "node2",
                        },
                    },
                },
            },
            edges: [
                {
                    id: "1",
                    source: "node1",
                    target: "node3",
                },
            ],
        };
        expect(relineValidator.isValidGraph(testGraph)).toBe(false);
    });
    it("isValidGraphs(),invalid graph", function () {
        var relineValidator = new RelineValidator_1.default();
        var testGraphs = {};
        expect(relineValidator.isValidGraphs(testGraphs)).toBe(false);
    });
    it("isValidGraphs()", function () {
        var relineValidator = new RelineValidator_1.default();
        var testGraphs = [
            {
                id: "1",
                metadata: {
                    basic: {
                        id: "1",
                    },
                },
                nodes: {
                    node1: {
                        id: "node1",
                        metadata: {
                            basic: {
                                id: "node1",
                            },
                        },
                    },
                    node2: {
                        id: "node2",
                        metadata: {
                            basic: {
                                id: "node2",
                            },
                        },
                    },
                },
                edges: [
                    {
                        id: "1",
                        source: "node1",
                        target: "node2",
                        metadata: {
                            basic: {
                                id: "1",
                            },
                        },
                    },
                ],
            },
        ];
        expect(relineValidator.isValidGraphs(testGraphs)).toBe(true);
    });
});
//# sourceMappingURL=RelineValidator.test.js.map