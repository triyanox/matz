import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface FunctionDeclarationNode extends Node {
  type: NodeType.FunctionDeclaration;
  name: string;
  args: string[];
}
