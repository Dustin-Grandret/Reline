/* eslint-disable no-unused-vars */
import { RelineNodeSchema } from "../interfaces/node.relineSchema";

abstract class RelineNodeVisitor {
    enterNode(node:RelineNodeSchema| undefined):void {

    }

    exitNode(node:RelineNodeSchema| undefined):void {

    }
}

export default RelineNodeVisitor;
