import { RelineGraphSchema } from "../interfaces/graphs.relineSchema";

export default class LayoutBase {
    options:any;

    constructor(options:any) {
        this.options = options;
    }

    run(graph:RelineGraphSchema):RelineGraphSchema|undefined {
        return graph;
    }
}
