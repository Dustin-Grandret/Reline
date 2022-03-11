import { identity } from "underscore";
import RelineValidator from "../Reline/RelineValidator";

describe("Test RelineValidator", () => {
    it("isValidElementBase() without field:basic", () => {
        const relineValidator = new RelineValidator();
        const testElementBase = {
            id: "123",
        };
        expect(relineValidator.isValidElementBase(testElementBase)).toBe(false);
    });

    it("isValidElementBase() with field:basic and valid node", () => {
        const relineValidator = new RelineValidator();
        const testElementBase = {
            id: "123",
            metadata: {
                basic: {
                    id: "123",
                },
            },
        };
        expect(relineValidator.isValidElementBase(testElementBase)).toBe(true);
    });

    it("isValidElementBase() with field:basic and incompatible ElementBase id", () => {
        const relineValidator = new RelineValidator();
        const testElementBase = {
            id: "123",
            metadata: {
                basic: {
                    id: "456",
                },
            },
        };
        expect(relineValidator.isValidElementBase(testElementBase)).toBe(false);
    });

    it("isValidNode() without field:basic", () => {
        const relineValidator = new RelineValidator();
        const testNode = {
            id: "123",
        };
        expect(relineValidator.isValidNode(testNode)).toBe(false);
    });

    it("isValidNode() with field:basic and valid node", () => {
        const relineValidator = new RelineValidator();
        const testNode = {
            id: "123",
            metadata: {
                basic: {
                    id: "123",
                },
            },
        };
        expect(relineValidator.isValidNode(testNode)).toBe(true);
    });

    it("isValidNode() with field:basic and inValid node", () => {
        const relineValidator = new RelineValidator();
        const testNode = {
            id: "123",
            metadata: {
                basic: {
                    id: "456",
                },
            },
        };
        expect(relineValidator.isValidNode(testNode)).toBe(false);
    });

    it("isValidEdge(),invalid edge.", () => {
        const relineValidator = new RelineValidator();
        const testEdge = {
            id: "1",
            source: "123",
        };
        expect(relineValidator.isValidEdge(testEdge)).toBe(false);
    });
    it("isValidEdge(),invalid edge with incompatible id.", () => {
        const relineValidator = new RelineValidator();
        const testEdge = {
            id: "1",
            source: "123",
            target: "456",
            basic: {
                id: "2",
            },
        };
        expect(relineValidator.isValidEdge(testEdge)).toBe(false);
    });
    it("isValidEdge()", () => {
        const relineValidator = new RelineValidator();
        const testEdge = {
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
    it("isValidGraph() without nodes and edges", () => {
        const relineValidator = new RelineValidator();
        const testGraph = {
            id: "1",
        };
        expect(relineValidator.isValidGraph(testGraph)).toBe(false);
    });
    it("isValidGraph() with nodes", () => {
        const relineValidator = new RelineValidator();
        const testGraph = {
            id: "1",
            nodes: {
                node1: {
                    id: "123",
                },
            },
        };
        expect(relineValidator.isValidGraph(testGraph)).toBe(false);
    });
    it("isValidGraph() with nodes and edges, invalid graph. Node.id is incompatible with key.", () => {
        const relineValidator = new RelineValidator();
        const testGraph = {
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
    it("isValidGraph() with nodes and edges, valid graph", () => {
        const relineValidator = new RelineValidator();
        const testGraph = {
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
    it("isValidGraph() with nodes and edges, inValid graph", () => {
        const relineValidator = new RelineValidator();
        const testGraph = {
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
    it("isValidGraphs(),invalid graph", () => {
        const relineValidator = new RelineValidator();
        const testGraphs = {};
        expect(relineValidator.isValidGraphs(testGraphs)).toBe(false);
    });
    it("isValidGraphs()", () => {
        const relineValidator = new RelineValidator();
        const testGraphs = [
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
