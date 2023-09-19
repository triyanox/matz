import { NodeType } from "lib/parser/constants/node-type";
import { ReturnNode } from "lib/parser/interfaces";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";

function Return(tokens: moo.Token[]): ReturnNode {
  const fil = filterWhitespace(tokens);
  const identifier = fil.shift();

  return {
    type: NodeType.Return,
    value: identifier?.text ?? "",
    children: [],
  };
}

export default Return;
