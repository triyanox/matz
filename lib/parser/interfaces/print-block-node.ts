import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface PrintBlockNode extends Node {
  type: NodeType.PrintBlock;
  name: string;
  params: (number | number[] | string)[];
}
