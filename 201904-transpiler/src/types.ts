/* All nodes extend from TextRange
 * reporting each node's starting and ending position
 * within the code string would later help with error reporting and source mapping
 * */
export interface TextRange {
    pos: number;
    end: number;
}


type LetKeyword = "let"
type EqualsToken = "="
type PlusToken = "+"
type MinusToken = "-"
type AsterixToken = "*"

export const enum SyntaxKind {
    LetKeyword
}

export type DefaultExport = "export default";
export type VariableDeclarator = LetKeyword;
export type Identifier = string;
export type NumberToken = string;
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

interface Node {
    type: "VariableDeclaration",
    id: { type: Identifier, value: string | number },
    initialValue: {
        type: "Number",
        value: "7"
    }
}

export interface AST {
    Node: [Token];
}

export type Tokenizer = ( code: RawCode ) => [Token] | [];
export type Parser = ( tokens: Token[] | [] ) => AST;
export type Transformer = ( ast: AST ) => AST;
export type Generator = ( ast: AST ) => string;

export default interface Transpiler {
    Tokenizer: Tokenizer;
    Parser: Parser;
    Transformer: Transformer;
    Generator: Generator;

