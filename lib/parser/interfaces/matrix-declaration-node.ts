import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";

export interface MatrixDeclarationNode extends Node {
  type: NodeType.MatrixDeclaration;
  name: string;
  values: any[][];
}
