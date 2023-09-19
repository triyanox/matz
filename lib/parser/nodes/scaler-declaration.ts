import { NodeType } from "lib/parser/constants/node-type";
import { ScalarDeclarationNode } from "lib/parser/interfaces";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";

function ScalarDeclaration(tokens: moo.Token[]): ScalarDeclarationNode {
  const fil = filterWhitespace(tokens);
  const identifier = fil.shift();
  fil.shift();
  const value = fil.shift();
  return {
    type: NodeType.ScalarDeclaration,
    name: identifier?.text ?? "",
    value: Number(value?.text),
    children: [],
  };
}

export default ScalarDeclaration;
