import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface ReturnNode extends Node {
  type: NodeType.Return;
  value: string | number;
}
