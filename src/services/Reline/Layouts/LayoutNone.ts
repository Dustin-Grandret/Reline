import LayoutBase from "./LayoutBase";
import { RelineGraphSchema } from "../interfaces/graph.relineSchema";
import RelineNodeUtil from "../utils/RelineNodeUtil";
import RelineEdgeUtil from "../utils/RelineEdgeUtil";

export default class LayoutNone extends LayoutBase {
    run(graph:RelineGraphSchema) :RelineGraphSchema|undefined {
        for (const nodeId in graph.nodes) {
            RelineNodeUtil.updateField(graph.nodes[nodeId], "show", {
                x: 0,
                y: 0,
            }, { strict: false });
        }
        for (const edge of graph.edges) {
            RelineEdgeUtil.updateField(edge, "show", {
                headx: graph.nodes[edge.source].metadata.show.x,
                heady: graph.nodes[edge.source].metadata.show.y,
                tailx: <number>graph.nodes[edge.target].metadata.show.x + 1,
                taily: graph.nodes[edge.target].metadata.show.y,
            }, { strict: false });
        }
        return graph;
    }
}
