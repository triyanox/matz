const filterWhitespace = (tokens: moo.Token[]): moo.Token[] => {
  return tokens.filter((token) => token.type !== "ws" && token.type !== "nl");
};

export default filterWhitespace;
