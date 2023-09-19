import { NodeType } from "lib/parser/constants/node-type";
import { VectorDeclarationNode } from "lib/parser/interfaces";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";

function VectorDeclaration(tokens: moo.Token[]): VectorDeclarationNode {
  const fil = filterWhitespace(tokens);
  const identifier = fil.shift();
  fil.shift();
  fil.shift();
  const values: number[] = [];

  while (fil.length > 0) {
    const token = fil.shift();
    if (token?.type === "rbk") {
      break;
    } else {
      if (token?.type === "number") {
        values.push(parseFloat(token?.text));
      } else if (token?.type === ",") {
        continue;
      }
    }
  }

  return {
    type: NodeType.VectorDeclaration,
    name: identifier?.text ?? "",
    values: values.filter((value) => !isNaN(value)),
    children: [],
  };
}

export default VectorDeclaration;
