import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface ScalarNode extends Node {
  type: NodeType.Scalar;
  value: number;
}
