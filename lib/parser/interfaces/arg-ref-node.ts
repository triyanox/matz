import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface ArgRefNode extends Node {
  type: NodeType.ArgRef;
  name: string;
  argType: "scal" | "vec" | "mat";
  value: string;
}
