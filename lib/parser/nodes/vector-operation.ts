import { NodeType } from "lib/parser/constants/node-type";
import { VectorOperationNode } from "lib/parser/interfaces";
import filterWhitespace from "lib/parser/utils/filter-white-scpace";

type ArgType = "scal" | "vec" | "mat";

function VectorOperation(tokens: moo.Token[]): VectorOperationNode {
  const fil = filterWhitespace(tokens);
  const identifier = fil.shift();
  fil.shift();
  const left = fil.shift();
  const operator = fil.shift();
  const right = fil.shift();
  if (left?.type === "identifier" && right?.type === "identifier") {
    return {
      type: NodeType.VectorOperation,
      operator: operator?.text ?? "",
      left: {
        type: NodeType.VectorRef,
        name: left.text,
        children: [],
      },
      right: {
        type: NodeType.VectorRef,
        name: right.text,
        children: [],
      },
      children: [],
      result: {
        type: NodeType.ResultRef,
        name: identifier?.text ?? "",
        children: [],
      },
    };
  }
  if (left?.type === "number" && right?.type === "identifier") {
    return {
      type: NodeType.VectorOperation,
      operator: operator?.text ?? "",
      left: {
        type: NodeType.Scalar,
        value: Number(left.text),
        children: [],
      },
      right: {
        type: NodeType.VectorRef,
        name: right.text,
        children: [],
      },
      children: [],
      result: {
        type: NodeType.ResultRef,
        name: identifier?.text ?? "",
        children: [],
      },
    };
  }
  if (left?.type === "identifier" && right?.type === "number") {
    return {
      type: NodeType.VectorOperation,
      operator: operator?.text ?? "",
      left: {
        type: NodeType.VectorRef,
        name: left.text,
        children: [],
      },
      right: {
        type: NodeType.Scalar,
        value: Number(right.text),
        children: [],
      },
      children: [],
      result: {
        type: NodeType.ResultRef,
        name: identifier?.text ?? "",
        children: [],
      },
    };
  }

  if (left?.type === "number" && right?.type === "number") {
    return {
      type: NodeType.VectorOperation,
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
      children: [],
      result: {
        type: NodeType.ResultRef,
        name: identifier?.text ?? "",
        children: [],
      },
    };
  }
  if ((left?.type === "arg", right?.type === "arg")) {
    const argType = left?.text.split(",")[1].split(")")[0] as ArgType;
    const argType2 = right?.text.split(",")[1].split(")")[0] as ArgType;
    return {
      type: NodeType.VectorOperation,
      operator: operator?.text ?? "",
      left: {
        type: NodeType.ArgRef,
        name: left?.text.split(",")[0].split("(")[1] ?? "",
        children: [],
        argType,
        value: left?.text.split(",")[0].split("(")[1] ?? "",
      },
      right: {
        type: NodeType.ArgRef,
        name: right?.text.split(",")[0].split("(")[1] ?? "",
        children: [],
        argType: argType2,
        value: right?.text.split(",")[0].split("(")[1] ?? "",
      },
      children: [],
      result: {
        type: NodeType.ResultRef,
        name: identifier?.text ?? "",
        children: [],
      },
    };
  }
  if ((left?.type === "arg", right?.type === "identifier")) {
    const argType = left?.text.split(",")[1].split(")")[0] as ArgType;
    return {
      type: NodeType.VectorOperation,
      operator: operator?.text ?? "",
      left: {
        type: NodeType.ArgRef,
        name: left?.text.split(",")[0].split("(")[1] ?? "",
        children: [],
        argType,
        value: left?.text.split(",")[0].split("(")[1] ?? "",
      },
      right: {
        type: NodeType.VectorRef,
        name: right.text,
        children: [],
      },
      children: [],
      result: {
        type: NodeType.ResultRef,
        name: identifier?.text ?? "",
        children: [],
      },
    };
  }
  if ((left?.type === "identifier", right?.type === "arg")) {
    const argType = right?.text.split(",")[1].split(")")[0] as ArgType;
    return {
      type: NodeType.VectorOperation,
      operator: operator?.text ?? "",
      left: {
        type: NodeType.VectorRef,
        name: left?.text ?? "",
        children: [],
      },
      right: {
        type: NodeType.ArgRef,
        name: right?.text.split(",")[0].split("(")[1] ?? "",
        children: [],
        argType,
        value: right?.text.split(",")[0].split("(")[1] ?? "",
      },
      children: [],
      result: {
        type: NodeType.ResultRef,
        name: identifier?.text ?? "",
        children: [],
      },
    };
  }

  throw new Error("Invalid vector operation");
}

export default VectorOperation;
