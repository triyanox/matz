import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface VectorRefNode extends Node {
  type: NodeType.VectorRef;
  name: string;
}
