import Tokenizer from "lib/tokenizer";
import Parser from "lib/parser";
import CodeGen from "lib/codegen";

interface TranspilerOptions {
  input: string;
}

export default class Transpiler {
  private input: string;
  constructor(options: TranspilerOptions) {
    this.input = options.input;
  }

  public static async ast(path: string) {
    const input = await Bun.file(path).text();
    const tokens = Tokenizer.tokenize(input);
    const ast = Parser.parse(tokens);
    return ast;
  }

  public async transpile(): Promise<string> {
    const tokens = Tokenizer.tokenize(this.input);
    const ast = Parser.parse(tokens);
    const code = await CodeGen.generate(ast);
    return code;
  }

  public async saveToFile(path: string): Promise<number> {
    return Bun.write(path + "out.matz.js", await this.transpile());
  }

  public getAst() {
    const tokens = Tokenizer.tokenize(this.input);
    const ast = Parser.parse(tokens);
    return ast;
  }

  public getTokens() {
    const tokens = Tokenizer.tokenize(this.input);
    return tokens;
  }

  public getTokensAndAst() {
    const tokens = Tokenizer.tokenize(this.input);
    const ast = Parser.parse(tokens);
    return { tokens, ast };
  }

  public static async fromFile(path: string): Promise<Transpiler> {
    const input = await Bun.file(path).text();
    return new Transpiler({ input });
  }

  public async writeToFile(path: string): Promise<number> {
    const tokens = Tokenizer.tokenize(this.input);
    const ast = Parser.parse(tokens);
    const codegen = new CodeGen();
    await codegen.generate(ast);
    return await codegen.writeToFile(path);
  }

  public static async transpile(input: string): Promise<string> {
    return await new Transpiler({ input }).transpile();
  }

  public static async readFromFile(path: string): Promise<string> {
    const gen = await CodeGen.readFromFile(path);
    return gen.codeString;
  }

  public static async run(input: string) {
    const tokens = Tokenizer.tokenize(input);
    const ast = Parser.parse(tokens);
    const codegen = new CodeGen();
    await codegen.generate(ast);
    codegen.run();
  }

  public static async runFromFile(path: string) {
    const gen = await CodeGen.readFromFile(path);
    gen.run();
  }

  public async run() {
    const tokens = Tokenizer.tokenize(this.input);
    const ast = Parser.parse(tokens);
    const codegen = new CodeGen();
    await codegen.generate(ast);
    codegen.run();
  }

  public static logAst(input: string) {
    const tokens = Tokenizer.tokenize(input);
    const ast = Parser.parse(tokens);
    console.log(ast);
  }

  public static logTokens(input: string) {
    const tokens = Tokenizer.tokenize(input);
    console.log(tokens);
  }
}
