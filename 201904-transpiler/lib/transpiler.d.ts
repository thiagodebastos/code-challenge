declare type DefaultExport = 'export default';
declare type VariableDeclarator = 'let';
declare type Identifier = string;
declare type NumberToken = number;
declare type VariableAssignmentOperator = '=';
declare type BinaryOperator = '+' | '-' | '*';
declare type LineBreak = '\n';
declare type RawCode = 'string';
interface Token {
    id: any;
    type: DefaultExport | VariableDeclarator | Identifier | NumberToken | VariableAssignmentOperator | BinaryOperator | LineBreak;
    value: string;
}
interface AST {
    Node: [Token];
}
interface Transpiler {
    Tokenizer: (code: string) => [Token] | string;
}
declare const tokenizer: Transpiler['Tokenizer'];
declare const parser: (tokens: any) => {};
declare const transformer: (AST: any) => {};
declare const generator: (AST: any) => string;
declare const generate: (code: any) => string;
