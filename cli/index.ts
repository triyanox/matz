const version = await import("../package.json").then((pkg) => pkg.version);

import * as commander from "commander";
import chalk from "chalk";
import Transpiler from "lib/transpiler";

const program = new commander.Command();

program
  .name("matz")
  .version(version)
  .description("Matz Experimental Programming Language");

program
  .command("run <file>")
  .description("Run a matz file")
  .action(async (file) => {
    await Transpiler.runFromFile(file);
  });

program
  .command("transpile <file> <path>")
  .description("Transpile a matz file to javascript")
  .action(async (file, path) => {
    const input = await Bun.file(file).text();
    await new Transpiler({ input: input }).writeToFile(path);
  });

program
  .command("ast <file>")
  .description("Print the AST of a matz file")
  .action(async (file) => {
    const ast = await Transpiler.ast(file);
    console.log(chalk.green(JSON.stringify(ast, null, 2)));
  });

program.parse(process.argv);
