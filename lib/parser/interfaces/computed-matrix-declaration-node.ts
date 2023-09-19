import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface ComputeMatrixDeclarationNode extends Node {
  type: NodeType.ComputeMatrixDeclaration;
  name: string;
  values: (string | number)[][];
}
