/**
	DefaultExport:: "export default"
	VariableDeclarator:: "let"
	Identifier:: /[a-zA-Z]+/
	Number:: /[0-9]+/
	VariableAssignmentOperator:: "="
	BinaryOperator:: "+" | "-" | "*"
	LineBreak:: "\n"
*/

export type KeywordSyntaxKind =
	| SyntaxKind.EndOfFileToken
	| SyntaxKind.EndOfFileToken
	| SyntaxKind.NewLineTrivia
	| SyntaxKind.AsterixToken
	| SyntaxKind.EqualsToken


export const enum SyntaxKind {
    Identifier,
    AsterixToken,
    MinusToken,
    PlusToken,
    EqualsToken,
    NewLineTrivia,
    WhitespaceTrivia,
    EndOfFileToken,
    Unknown
}
