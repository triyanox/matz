import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";
import { ResultRefNode } from "./result-ref-node";

export interface MethodOperationNode extends Node {
  type: NodeType.MethodOperation;
  method: string;
  args: (number | number[] | string)[];
  result: ResultRefNode;
}
