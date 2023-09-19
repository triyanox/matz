import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface ResultRefNode extends Node {
  type: NodeType.ResultRef;
  name: string;
}
