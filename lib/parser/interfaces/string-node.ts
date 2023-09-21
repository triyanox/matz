import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface StringDeclarationNode extends Node {
  type: NodeType.StringDeclaration;
  name: string;
  value: string;
}
