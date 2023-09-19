import { NodeType } from "lib/parser/constants/node-type";
import { MatrixRefNode } from "./matrix-ref-node";
import Node from "./node";
import { ResultRefNode } from "./result-ref-node";
import { ScalarNode } from "./scaler-node";

export interface MatrixOperationNode extends Node {
  type: NodeType.MatrixOperation;
  operator: string;
  left: ScalarNode | MatrixRefNode;
  right: ScalarNode | MatrixRefNode;
  result?: ResultRefNode;
}
