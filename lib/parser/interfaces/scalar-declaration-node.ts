import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface ScalarDeclarationNode extends Node {
  type: NodeType.ScalarDeclaration;
  name: string;
  exp?: string;
}
