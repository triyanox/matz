import { NodeType } from "lib/parser/constants/node-type";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";
import { StringDeclarationNode } from "lib/parser/interfaces";

function ScalarDeclaration(tokens: moo.Token[]): StringDeclarationNode {
  const fil = filterWhitespace(tokens);
  const identifier = fil.shift();
  fil.shift();
  const value = fil.shift();
  return {
    type: NodeType.StringDeclaration,
    name: identifier?.text ?? "",
    value: String(value?.text),
    children: [],
  };
}

export default ScalarDeclaration;
