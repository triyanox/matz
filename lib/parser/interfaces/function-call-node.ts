import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface FunctionCallNode extends Node {
  type: NodeType.FunctionCall;
  name: string;
  params: (number | number[] | string)[];
}
