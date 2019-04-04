import { Token } from './types';

export interface RawToken {
    type: Token;
    value: string | number;
    lineNumber: number;
    lineStart: number;
    start: number;
    end: number;
}

interface ScannerState {
    index: number;
    lineNumber: number;
    lineStart: number;
}

export class Scanner {

    public readonly source: string;
    public readonly errorHandler: any; // TODO: create an error handler

    /** Track position */
    public index: number;
    public lineNumber: number;
    public lineStart: number;
    private readonly length: number;

    public constructor ( code: string, handler: any /**TODO ErrorHandler */ ) {
        this.source = code;
        this.errorHandler = handler;

        this.length = code.length;
        this.index = 0;
        this.lineNumber = ( code.length > 0 ) ? 1 : 0;
        this.lineStart = 0;
    }

    public saveState(): ScannerState {
        return {
            index: this.index,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart
        }
    }

    public restoreState( state: ScannerState ): void {
        this.index = state.index;
        this.lineNumber = state.lineNumber;
        this.lineStart = state.lineStart;
    }

    public eof(): boolean {
        return this.index >= this.length;
    }

    /** TODO create error messages */
    public throwUnexpectedToken( message: string ): never {
        /** Return a useful error message */
        throw Error( `
            ${this.index},
            ${this.lineNumber},
            ${this.index - this.lineStart + 1},
            ${message}
        `);
    }

    /** TODO create error message */
    public tolerateUnexpectedToken( message: string ): never {
        /** Return a useful error message */
        throw Error( `
            ${this.index},
            ${this.lineNumber},
            ${this.index - this.lineStart + 1},
            ${message}
        `);
    }
    /** Potential reserved words for future iterations of code challenge */
    public isFutureReservedWord( id: string ): boolean {
        switch ( id ) {
            case 'var':
            case 'const':
            case 'function':
            case 'if':
            case 'while':
            case 'for':
            case 'return':
                return true;
            default:
                return false;
        }
    }

    private isKeyword( id: string ): boolean {
        switch ( id.length ) {
            case 3:
                return ( id === 'let' )
            default:
                return false
        }
    }

    private codePointAt( i: number ): number {
        let cp = this.source.charCodeAt( i )

    }


}
