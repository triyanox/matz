import { NodeType } from "lib/parser/constants/node-type";
import { ComputeVectorDeclarationNode } from "lib/parser/interfaces";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";

function ComputeVectorDeclaration(
  tokens: moo.Token[]
): ComputeVectorDeclarationNode {
  const fil = filterWhitespace(tokens);
  const identifier = fil.shift();
  fil.shift();
  fil.shift();
  const values: (number | string)[] = [];

  while (fil.length > 0) {
    const token = fil.shift();
    if (token?.type === "rbk") {
      break;
    } else {
      if (token?.type === "number") {
        values.push(parseFloat(token?.text));
      } else if (token?.type === "identifier") {
        values.push(token?.text);
      } else if (token?.type === ",") {
        continue;
      }
    }
  }

  return {
    type: NodeType.ComputeVectorDeclaration,
    name: identifier?.text ?? "",
    values: values,
    children: [],
  };
}

export default ComputeVectorDeclaration;
