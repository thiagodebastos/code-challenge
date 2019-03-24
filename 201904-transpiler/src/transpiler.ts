/*
  DefaultExport:: "export default"
  VariableDeclarator:: "let"
  Identifier:: /[a-zA-Z]+/
  Number:: /[0-9]+/
  VariableAssignmentOperator:: "="
  BinaryOperator:: "+" | "-" | "*"
  LineBreak:: "\n"
*/

type DefaultExport = 'export default';
type VariableDeclarator = 'let';
type Identifier = string;
type NumberToken = number;
type VariableAssignmentOperator = '=';
type BinaryOperator = '+' | '-' | '*';
type LineBreak = '\n';

type RawCode = 'string';

interface Token {
    id: any;
    type:
    | DefaultExport
    | VariableDeclarator
    | Identifier
    | NumberToken
    | VariableAssignmentOperator
    | BinaryOperator
    | LineBreak;
    value: string;
}

interface AST {
    Node: [Token];
}

// interface Parser {
//
// }

interface Transpiler {
    Tokenizer: (code: string) => [Token] | string;
}

// Parsing 1: Lexical Analysis
const tokenizer: Transpiler['Tokenizer'] = code => {
    return ""; // an array  tokens in processed order
};

// Parsing 2: Syntatic Analysis
const parser = (tokens: any) => {
    /* ... */
    return {}; // an object which is our AST - we can actually refer back to the tree traversal stuff we did
};
const transformer = (AST: any) => {
    /* ... */
    return {}; // a modified AST
};

const generator = (AST: any) => {
    /* ... */
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
