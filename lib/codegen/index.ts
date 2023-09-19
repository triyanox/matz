import Parser from "lib/parser";
import {
  FunctionCallNode,
  FunctionDeclarationNode,
  MatrixDeclarationNode,
  MatrixOperationNode,
  MethodOperationNode,
  PrintBlockNode,
  ReturnNode,
  ScalarDeclarationNode,
  VectorDeclarationNode,
  VectorOperationNode,
} from "lib/parser/interfaces";
import Node from "lib/parser/interfaces/node";
import Tokenizer from "lib/tokenizer";

interface ICodeGen {
  /**
   * Generates code from an AST
   * @param ast - The AST to generate code from
   */
  generate(ast: Node[]): Promise<string>;
  /**
   * Writes the generated code to a file
   * @param path - The path to write the code to
   */
  writeToFile(path: string): Promise<number>;
  /**
   * Logs the generated code to the console
   */
  log(): void;
}

class CodeGen implements ICodeGen {
  public code: string[] = [];

  public static async generate(ast: Node[]): Promise<string> {
    return await new CodeGen().generate(ast);
  }

  async generate(ast: Node[]): Promise<string> {
    const build = await Bun.build({
      entrypoints: ["lib/core/index.ts"],
    });
    const lib = await build.outputs[0].text();
    this.generateSync(ast);
    this.code.unshift(
      lib
        .replace(/export {\n  core_default as default\n};/, "")
        .replace(/var matzLib = {[^}]+};/, "")
        .replace(/var core_default = matzLib;/, "")
        .replace(/\/\/ lib\/core\/index\.ts\n/, "")
    );
    return this.codeString;
  }

  generateSync(ast: Node[]): string {
    ast.forEach((node) => {
      switch (node.type) {
        case "VectorDeclaration":
          this.code.push(
            this._genVectorDeclaration(node as VectorDeclarationNode)
          );
          break;
        case "ScalarDeclaration":
          this.code.push(
            this._genScalarDeclaration(node as ScalarDeclarationNode)
          );
          break;
        case "ComputeVectorDeclaration":
          this.code.push(
            this._genComputeVectorDeclaration(node as VectorDeclarationNode)
          );
          break;
        case "MatrixDeclaration":
          this.code.push(
            this._genMatrixDeclaration(node as MatrixDeclarationNode)
          );
          break;
        case "ComputeMatrixDeclaration":
          this.code.push(
            this._genComputeMatrixDeclaration(node as MatrixDeclarationNode)
          );
          break;
        case "VectorOperation":
          this.code.push(this._genVectorOperation(node as VectorOperationNode));
          break;
        case "MatrixOperation":
          this.code.push(this._genMatrixOperation(node as MatrixOperationNode));
          break;
        case "FunctionDeclaration":
          this.code.push(
            this._genFunctionDeclaration(node as FunctionDeclarationNode)
          );
          break;
        case "FunctionCall":
          this.code.push(this._genFunctionCall(node as FunctionCallNode));
          break;
        case "PrintBlock":
          this.code.push(this._genPrintBlock(node as PrintBlockNode));
          break;
        case "Return":
          this.code.push(this._genReturn(node as ReturnNode));
          break;
        case "MethodOperation":
          this.code.push(
            this._genMethodOperationNode(node as MethodOperationNode)
          );
          break;
      }
    });
    return this.codeString;
  }

  private _genMethodOperationNode(node: MethodOperationNode): string {
    const args = node.args
      .slice(1)
      .map((arg) => {
        if (typeof arg === "string") {
          if (arg.startsWith('"*')) {
            return `${arg.slice(2, arg.length - 1)}`;
          } else if (arg.startsWith('"')) {
            return `"${arg.slice(1, arg.length - 1)}"`;
          }
          return `${arg}`;
        } else if (typeof arg === "number") {
          return `${arg}`;
        }
      })
      .join(", ");
    console.log(args);
    return `let ${node.result.name} = ${node.args[0]}.${node.method}(${args});\n`;
  }

  get codeString(): string {
    return this.code.join("");
  }

  private _genPrintBlock(node: PrintBlockNode): string {
    const params = node.params
      .map((param) => {
        if (typeof param === "string") {
          if (param.startsWith('"*')) {
            return `${param.slice(2, param.length - 1)}`;
          } else if (param.startsWith('"')) {
            return `"${param.slice(1, param.length - 1)}"`;
          }
          return `${param}`;
        }
      })
      .join(", ");
    return `console.log(${params});\n`;
  }

  private _genVectorDeclaration(node: VectorDeclarationNode): string {
    return `let ${node.name} = vector([${node.values.join(",")}]);\n`;
  }

  private _genScalarDeclaration(node: ScalarDeclarationNode): string {
    return `let ${node.name} = ${node.value};\n`;
  }

  private _genComputeVectorDeclaration(node: VectorDeclarationNode): string {
    return `let ${node.name} = vector([${node.values.join(",")}]);\n`;
  }

  private _genMatrixDeclaration(node: MatrixDeclarationNode): string {
    return `let ${node.name} = matrix([${node.values
      .map((v) => `[${v.join(",")}]`)
      .join(",")}]);\n`;
  }

  private _genComputeMatrixDeclaration(node: MatrixDeclarationNode): string {
    return `let ${node.name} = matrix([${node.values
      .map((v: string | any) => {
        if (typeof v === "string") return v;
        return `[${v.join(",")}]`;
      })
      .join(",")}]);\n`;
  }

  public operators = new Map<string, string>([
    ["+", "add"],
    ["-", "sub"],
    ["*", "mul"],
    ["/", "div"],
    ["x", "cross"],
    [".", "dot"],
    ["_", "scale"],
  ]);

  private _genVectorOperation(node: VectorOperationNode): string {
    const operator = this.operators.get(node.operator) ?? node.operator;
    // @ts-expect-error
    return `let ${node.result.name} = ${node.left.name}.${operator}(${
      node.right.type === "Scalar" ? node.right.value : node.right.name
    });\n`;
  }

  private _genMatrixOperation(node: MatrixOperationNode): string {
    const operator = this.operators.get(node.operator) ?? node.operator;
    // @ts-expect-error
    return `let ${node.result.name} = ${node.left.name}.${operator}(${
      node.right.type === "Scalar" ? node.right.value : node.right.name
    });\n`;
  }

  private _genFunctionDeclaration(node: FunctionDeclarationNode): string {
    const args = node.args
      .map((arg, index) => {
        if (arg === "") return "";
        return arg;
      })
      .filter((arg) => arg !== "")
      .join(", ");
    const body = node.children.map((child) => this._genNode(child)).join("");
    return `function ${node.name}(${args}) {\n${body}}\n`;
  }

  private _genNode(node: Node): string {
    return new CodeGen().generateSync([node]);
  }

  private _genFunctionCall(node: FunctionCallNode): string {
    return `let ${node.name}= ${node.value}(${node.params.join(",")})\n`;
  }

  private _genReturn(node: ReturnNode): string {
    return `return ${node.value};\n`;
  }

  public async writeToFile(path: string): Promise<number> {
    return await Bun.write(path + "/" + "matz.out.js", this.codeString);
  }

  public static async readFromFile(path: string): Promise<CodeGen> {
    const input = await Bun.file(path).text();
    const gen = new CodeGen();
    await gen.generate(Parser.parse(Tokenizer.tokenize(input)));
    return gen;
  }

  public log() {
    return console.log(this.codeString);
  }

  public run() {
    eval(this.codeString);
  }
}

export default CodeGen;
