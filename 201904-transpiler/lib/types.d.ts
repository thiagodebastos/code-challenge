export declare type DefaultExport = "export default";
export declare type VariableDeclarator = "let";
export declare type Identifier = string;
export declare type NumberToken = number;
export declare type VariableAssignmentOperator = "=";
export declare type BinaryOperator = "+" | "-" | "*";
export declare type LineBreak = "\n";
export declare type RawCode = "string";
export interface Token {
    id: string;
    type: DefaultExport | VariableDeclarator | Identifier | NumberToken | VariableAssignmentOperator | BinaryOperator | LineBreak;
    value: string;
}
export interface AST {
    Node: [Token];
}
export declare type Tokenizer = (code: RawCode) => [Token] | [];
export declare type Parser = (tokens: Token[] | []) => AST;
export declare type Transformer = (ast: AST) => AST;
export declare type Generator = (ast: AST) => string;
export default interface Transpiler {
    Tokenizer: Tokenizer;
    Parser: Parser;
    Transformer: Transformer;
    Generator: Generator;
}
