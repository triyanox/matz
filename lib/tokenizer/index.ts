import { ErrorRule, Token } from "moo";
import lexer from "./lexer";

class Tokenizer {
  tokens: moo.Token[] = [];
  constructor(public lexer: moo.Lexer) {}

  tokenize(input: string): moo.Token[] {
    this.lexer.reset(input);
    this.tokens = [];
    let token: Token | undefined;
    while ((token = this.lexer.next())) this.tokens.push(token);
    return this.tokens;
  }

  static tokenize(input: string): moo.Token[] {
    return new Tokenizer(lexer).tokenize(input);
  }
}

export default Tokenizer;
