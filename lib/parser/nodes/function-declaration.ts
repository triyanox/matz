import { NodeType } from "lib/parser/constants/node-type";
import { FunctionDeclarationNode } from "lib/parser/interfaces";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";
import Parser from "..";

function FunctionDeclaration(tokens: moo.Token[]): FunctionDeclarationNode {
  const fil = filterWhitespace(tokens);
  const identifier = fil.shift();
  fil.shift();
  const args = [];
  while (fil.length > 0) {
    const token = fil.shift();
    if (token?.type === "identifier") {
      args.push(token.text);
    }
    if (token?.type === "rp") {
      break;
    }
  }
  fil.shift();
  fil.shift();
  fil.shift();

  const body = Parser.parse(fil);

  return {
    type: NodeType.FunctionDeclaration,
    name: identifier?.text ?? "",
    args,
    children: body,
  };
}

export default FunctionDeclaration;
