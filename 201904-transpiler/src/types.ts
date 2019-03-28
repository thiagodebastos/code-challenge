export type DefaultExport = "export default";
export type VariableDeclarator = "let";
export type Identifier = string;
export type NumberToken = number;
export type VariableAssignmentOperator = "=";
export type BinaryOperator = "+" | "-" | "*";
export type LineBreak = "\n";

export type RawCode = "string";

export interface Token {
    id: string;
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

export interface AST {
    Node: [Token];
}

export type Tokenizer = (code: RawCode) => [Token] | [];
export type Parser = (tokens: Token[] | []) => AST;
export type Transformer = (ast: AST) => AST;
export type Generator = (ast: AST) => string;

export default interface Transpiler {
    Tokenizer: Tokenizer;
    Parser: Parser;
    Transformer: Transformer;
    Generator: Generator;
}
