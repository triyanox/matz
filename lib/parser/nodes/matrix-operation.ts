import { NodeType } from "lib/parser/constants/node-type";
import { MatrixOperationNode } from "lib/parser/interfaces";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";

function MatrixOperation(tokens: moo.Token[]): MatrixOperationNode {
  const fil = filterWhitespace(tokens);
  const identifier = fil.shift();
  fil.shift();
  const left = fil.shift();
  const operator = fil.shift();
  const right = fil.shift();
  if (left?.type === "identifier" && right?.type === "identifier") {
    return {
      type: NodeType.MatrixOperation,
      operator: operator?.text ?? "",
      left: {
        type: NodeType.MatrixRef,
        name: left.text,
        children: [],
      },
      right: {
        type: NodeType.MatrixRef,
        name: right.text,
        children: [],
      },
      result: {
        type: NodeType.ResultRef,
        name: identifier?.text ?? "",
        children: [],
      },
      children: [],
    };
  }
  if (left?.type === "number" && right?.type === "identifier") {
    return {
      type: NodeType.MatrixOperation,
      operator: operator?.text ?? "",
      left: {
        type: NodeType.Scalar,
        value: Number(left.text),
        children: [],
      },
      right: {
        type: NodeType.MatrixRef,
        name: right.text,
        children: [],
      },
      result: {
        type: NodeType.ResultRef,
        name: identifier?.text ?? "",
        children: [],
      },
      children: [],
    };
  }
  if (left?.type === "identifier" && right?.type === "number") {
    return {
      type: NodeType.MatrixOperation,
      operator: operator?.text ?? "",
      left: {
        type: NodeType.MatrixRef,
        name: left.text,
        children: [],
      },
      right: {
        type: NodeType.Scalar,
        value: Number(right.text),
        children: [],
      },
      result: {
        type: NodeType.ResultRef,
        name: identifier?.text ?? "",
        children: [],
      },
      children: [],
    };
  }

  if (left?.type === "number" && right?.type === "number") {
    return {
      type: NodeType.MatrixOperation,
      operator: operator?.text ?? "",
      left: {
        type: NodeType.Scalar,
        value: Number(left.text),
        children: [],
      },
      right: {
        type: NodeType.Scalar,
        value: Number(right.text),
        children: [],
      },
      result: {
        type: NodeType.ResultRef,
        name: identifier?.text ?? "",
        children: [],
      },
      children: [],
    };
  }

  throw new Error("Invalid matrix operation");
}

export default MatrixOperation;
