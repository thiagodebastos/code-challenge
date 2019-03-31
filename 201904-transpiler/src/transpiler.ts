/*
  DefaultExport:: "export default"
  VariableDeclarator:: "let"
  Identifier:: /[a-zA-Z]+/
  Number:: /[0-9]+/
  VariableAssignmentOperator:: "="
  BinaryOperator:: "+" | "-" | "*"
  LineBreak:: "\n"

	-	let as the only variable type
	-	numbers and identifiers (variable names) as the only values/data types
	-	Basic math operators (+, -, *) as the only kinds of operation (no functions yet)
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

const isOperator = (c: string) => /[+\-*\/\^%=(),]/.test(c);
const isDigit = (c: string) => /[0-9]/.test(c);
const isWhiteSpace = (c: string) =>  /\s/.test(c);
const isIdentifier = (c: string) =>  typeof c === "string" && !isOperator(c) && !isDigit(c) && !isWhiteSpace(c);


/* Parsing 1: Lexical Analysis */
const tokenizer: Tokenizer = (code: string = ""): [Token] | [] => {
    if(code === "") return [];
    const codeArr = code.split(" ");

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
