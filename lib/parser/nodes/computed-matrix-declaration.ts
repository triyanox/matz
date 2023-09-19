import { NodeType } from "lib/parser/constants/node-type";
import { ComputeMatrixDeclarationNode } from "lib/parser/interfaces";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";
import removeEmptyEl from "lib/parser/utils/rm-empty-el";
import unWrapArr from "lib/parser/utils/unwrap-array";

function ComputeMatrixDeclaration(
  tokens: moo.Token[]
): ComputeMatrixDeclarationNode {
  const fil = filterWhitespace(tokens);
  function parseMatrix(): any {
    let values: any[] = [];
    while (fil.length > 0) {
      const token = fil.shift();
      if (token?.type === "number") {
        values.push(parseFloat(token?.text));
      }
      if (token?.type === "identifier") {
        values.push(token?.text);
      } else if (token?.type === "lbk") {
        values.push(parseMatrix());
      } else if (token?.type === "rbk") {
        break;
      }
    }
    return values;
  }

  const identifier = fil.shift();
  fil.shift();
  fil.shift();
  const values = parseMatrix();
  return {
    type: NodeType.ComputeMatrixDeclaration,
    name: identifier?.text ?? "",
    values: removeEmptyEl(unWrapArr(values)),
    children: [],
  };
}

export default ComputeMatrixDeclaration;
