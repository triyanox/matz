import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface ComputeVectorDeclarationNode extends Node {
  type: NodeType.ComputeVectorDeclaration;
  name: string;
  values: (string | number)[];
}
