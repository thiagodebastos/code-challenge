import { SyntaxKind, KeywordSyntaxKind } from './token'

// import { Syntax } from './syntax';

export class VariableDeclarator {

    public readonly type: "VariableDeclarator";
    public constructor ( type: string ) {
        this.type = type
    }
}

export class VariableAssignmentOperator {

    public readonly type: VariableAssignmentOperator;
    public constructor ( type: VariableAssignmentOperator ) {
        this.type = type
    }
}

export class Number {

    public readonly value: NumberToken;
    public constructor ( value: NumberToken ) {
        this.value = value
    }

}

export class BinaryOperator {

    public readonly value: BinaryOperator;
    public constructor ( value: BinaryOperator ) {
        this.value = value
    }
}

export class LineBreak { }
export class Identifier { }
export class DefaultExport { }
