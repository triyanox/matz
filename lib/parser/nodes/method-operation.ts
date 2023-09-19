import { NodeType } from "lib/parser/constants/node-type";
import { MethodOperationNode } from "lib/parser/interfaces";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";

function VectorOperation(tokens: moo.Token[]): MethodOperationNode {
  const fil = filterWhitespace(tokens);
  const identifier = fil.shift();
  fil.shift();
  const method = fil.shift();
  const args = [];
  fil.shift();
  while (fil.length > 0) {
    const token = fil.shift();
    if (token?.type === "identifier") {
      args.push(token.text);
    }
    if (token?.type === "string") {
      args.push(token.text);
    }
    if (token?.type === "number") {
      args.push(parseFloat(token.text));
    }
    if (token?.type === "rp") {
      break;
    }
  }

  return {
    type: NodeType.MethodOperation,
    args: args,
    method: method?.text ?? "",
    children: [],
    result: {
      type: NodeType.ResultRef,
      name: identifier?.text ?? "",
      children: [],
    },
  };
}

export default VectorOperation;
