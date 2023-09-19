import { NodeType } from "lib/parser/constants/node-type";
import Node from "./node";
import { VectorRefNode } from "./vector-ref-node";
import { ScalarNode } from "./scaler-node";
import { ArgRefNode } from "./arg-ref-node";
import { ResultRefNode } from "./result-ref-node";

export interface VectorOperationNode extends Node {
  type: NodeType.VectorOperation;
  operator: string;
  left: ScalarNode | VectorRefNode | ArgRefNode;
  right: ScalarNode | VectorRefNode | ArgRefNode;
  result?: ResultRefNode;
}
