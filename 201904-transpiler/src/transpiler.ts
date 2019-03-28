/*
  DefaultExport:: "export default"
  VariableDeclarator:: "let"
  Identifier:: /[a-zA-Z]+/
  Number:: /[0-9]+/
  VariableAssignmentOperator:: "="
  BinaryOperator:: "+" | "-" | "*"
  LineBreak:: "\n"
*/
import Transpiler, {
    RawCode,
    Token,
    AST,
    Tokenizer,
    Transformer,
    Parser,
    Generator
} from "./types";


/* Parsing 1: Lexical Analysis */
const tokenizer: Tokenizer = (code: string = ""): [Token] | [] => {
    if(code === "") return [];
    const tokenizedCode: Token = {
        id: "something",
        type: "Identifier",
        value: "something"
    }
    return [tokenizedCode]; // an array  tokens in processed order
};

/* Parsing 2: Syntatic Analysis */
const parser = (tokens: any) => {
    return { ...tokens };
};
const transformer = (ast: any) => {
    return {}; // a modified AST
};

const generator = (AST: any): string => {
    return ``; // a string that is code
};

const generate = (code: any) => {
    const tokens = tokenizer(code);
    const AST = parser(tokens);
    const transformedAST = transformer(AST);
    const newCode = generator(transformedAST);
    return newCode;
};

module.exports = generate;
module.exports.tokenizer = tokenizer;
module.exports.parser = parser;
module.exports.transformer = transformer;
module.exports.generator = generator;
