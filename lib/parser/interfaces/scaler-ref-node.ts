import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface ScalarRefNode extends Node {
  type: NodeType.ScalarRef;
  name: string;
}
