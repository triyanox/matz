import moo from "moo";
import Node from "./interfaces/node";
import {
  ComputeMatrixDeclaration,
  ComputeVectorDeclaration,
  FunctionCall,
  FunctionDeclaration,
  MatrixDeclaration,
  MatrixOperation,
  MethodOperation,
  Print,
  Return,
  ScalarDeclaration,
  VectorDeclaration,
  VectorOperation,
} from "./nodes";

class Parser {
  static parse(tokens: moo.Token[]): Node[] {
    const ast: Node[] = [];

    while (tokens.length > 0) {
      const token = tokens.shift();
      if (token?.type === "keyword") {
        if (token.text === "function") {
          const functionTokens: moo.Token[] = [];
          while (tokens.length > 0) {
            const token = tokens.shift();
            if (token?.value === "return") {
              functionTokens.push(token);
              tokens.shift();
              const returnVal = tokens.shift()!;
              functionTokens.push(returnVal);
              break;
            }
            if (token) {
              functionTokens.push(token);
            }
          }

          ast.push(FunctionDeclaration(functionTokens));
          continue;
        } else {
          switch (token.text) {
            case "vector":
              ast.push(VectorDeclaration(tokens));
              break;
            case "computeVector":
              ast.push(ComputeVectorDeclaration(tokens));
              break;
            case "matrix":
              ast.push(MatrixDeclaration(tokens));
              break;
            case "computeMatrix":
              ast.push(ComputeMatrixDeclaration(tokens));
              break;
            case "scaler":
              ast.push(ScalarDeclaration(tokens));
              break;
            case "calcVec":
              ast.push(VectorOperation(tokens));
              break;
            case "calcMat":
              ast.push(MatrixOperation(tokens));
              break;
            case "return":
              ast.push(Return(tokens));
              break;
            case "result":
              ast.push(FunctionCall(tokens));
              break;
            case "print":
              ast.push(Print(tokens));
              break;
            case "calc":
              ast.push(MethodOperation(tokens));
              break;
            default:
              throw new Error(`Unknown keyword ${token.text}`);
          }
        }
      }
    }

    return ast;
  }
}

export default Parser;
