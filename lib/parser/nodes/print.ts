import { NodeType } from "lib/parser/constants/node-type";
import { PrintBlockNode } from "lib/parser/interfaces";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";

function Print(tokens: moo.Token[]): PrintBlockNode {
  const fil = filterWhitespace(tokens);
  fil.shift();
  const params = [];
  while (fil.length > 0) {
    const token = fil.shift();
    if (token?.type === "identifier") {
      params.push(token.text);
    }
    if (token?.type === "string") {
      params.push(token.text);
    }
    if (token?.type === "number") {
      params.push(parseFloat(token.text));
    }
    if (token?.type === "rp") {
      break;
    }
  }

  return {
    type: NodeType.PrintBlock,
    name: "print",
    params,
    children: [],
  };
}

export default Print;
