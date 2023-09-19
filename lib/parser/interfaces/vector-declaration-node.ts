import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface VectorDeclarationNode extends Node {
  type: NodeType.VectorDeclaration;
  name: string;
  values: number[];
}
