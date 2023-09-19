import { NodeType } from "lib/parser/constants/node-type";
import { FunctionCallNode } from "lib/parser/interfaces";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";

function FunctionCall(tokens: moo.Token[]): FunctionCallNode {
  const fil = filterWhitespace(tokens);
  const name = fil.shift();
  fil.shift();
  const callee = fil.shift();
  const params = [];
  while (fil.length > 0) {
    const token = fil.shift();
    if (token?.type === "identifier") {
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
    type: NodeType.FunctionCall,
    value: callee?.text ?? "",
    params,
    children: [],
    name: name?.text ?? "",
  };
}

export default FunctionCall;
