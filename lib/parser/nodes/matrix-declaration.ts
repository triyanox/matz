import { NodeType } from "lib/parser/constants/node-type";
import { MatrixDeclarationNode } from "lib/parser/interfaces";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";
import removeEmptyEl from "lib/parser/utils/rm-empty-el";
import unWrapArr from "lib/parser/utils/unwrap-array";

function MatrixDeclaration(tokens: moo.Token[]): MatrixDeclarationNode {
  const fil = filterWhitespace(tokens);
  function parseMatrix(): any {
    let values: any[] = [];
    while (fil.length > 0) {
      const token = fil.shift();

      if (token?.type === "number") {
        values.push(parseFloat(token?.text));
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
    type: NodeType.MatrixDeclaration,
    name: identifier?.text ?? "",
    values: removeEmptyEl(unWrapArr(values)),
    children: [],
  };
}

export default MatrixDeclaration;
