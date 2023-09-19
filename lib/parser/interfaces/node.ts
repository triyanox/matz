import { NodeType } from "lib/parser/constants/node-type";

interface Node {
  type: NodeType;
  children: Node[];
  left?: Node | null;
  right?: Node | null;
  value?: string | number;
}

export default Node;
