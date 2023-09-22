import { NodeType } from "lib/parser/constants/node-type";
import { ScalarDeclarationNode } from "lib/parser/interfaces";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";

const allowedTokenTypes = [
  "number",
  "plus",
  "minus",
  "times",
  "divide",
  "mod",
  "power",
  "lp",
  "rp",
];

function ScalarDeclaration(tokens: moo.Token[]): ScalarDeclarationNode {
  const filteredTokens = filterWhitespace(tokens);
  const identifier = filteredTokens.shift();
  filteredTokens.shift();
  const calcs = [];
  for (const token of filteredTokens) {
    if (allowedTokenTypes.includes(token.type as string)) {
      calcs.push(token);
    } else if (token.type === "endel") {
      break;
    } else {
      if (calcs.length === 1) {
        break;
      }
      throw `Unexpected token ${token.type} in scalar declaration at line ${token.line} column ${token.col}\n Probably a missing semicolon`;
    }
  }
  const evalCalcs = eval(calcs.map((c) => c.value).join(""));
  return {
    type: NodeType.ScalarDeclaration,
    name: identifier?.text ?? "",
    value: evalCalcs,
    exp: calcs.join(""),
    children: [],
  };
}

export default ScalarDeclaration;
