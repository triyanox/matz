import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface MatrixRefNode extends Node {
  type: NodeType.MatrixRef;
  name: string;
}
