const generate = require("./just-the-basics");
const { tokenizer, parser, transformer, generator } = generate;

// Other fun one: const a = 3 + 4 + 6 - shows nesting

describe("tokenizer", () => {
	it("should tokenize an empty string", () => {
		expect(tokenizer("")).toEqual([]);
	});
	it("should tokenize a simple assignment", () => {
		expect(tokenizer("let a = 3")).toEqual([
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "3" }
		]);
	});
	it("should tokenize a more complicated assignment", () => {
		expect(tokenizer("let a = 33 + 44")).toEqual([
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "33" },
			{ type: "BinaryOperator", value: "+" },
			{ type: "Number", value: "44" }
		]);
	});
	it("should tokenize a simple equals expresion", () => {
		expect(tokenizer("5 + 3 ")).toEqual([
			{ type: "Number", value: "5" },
			{ type: "BinaryOperator", value: "+" },
			{ type: "Number", value: "3" }
		]);
	});
	it("should tokenize a two line statement", () => {
		const token = `let a = 5
		let b = a`;
		expect(tokenizer(token)).toEqual([
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" },
			{ type: "LineBreak" },
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "b" },
			{ type: "VariableAssignment" },
			{ type: "Identifier", value: "a" }
		]);
	});
	it("should tokenize a long variable name", () => {
		expect(tokenizer("let supercallifragellisticexpialedocious = 5")).toEqual([
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "supercallifragellisticexpialedocious" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" }
		]);
	});
	it("should tokenize two variable declarations", () => {
		const token = `let a = 33
		let b = 5`;

		expect(tokenizer(token)).toEqual([
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "33" },
			{ type: "LineBreak" },
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "b" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" }
		]);
	});
	it("should tokenize variable reassignment", () => {
		const token = `let a = 33
		let b = 5
		a + b`;

		expect(tokenizer(token)).toEqual([
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "33" },
			{ type: "LineBreak" },
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "b" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" },
			{ type: "LineBreak" },
			{ type: "Identifier", value: "a" },
			{ type: "BinaryOperator", value: "+" },
			{ type: "Identifier", value: "b" }
		]);
	});
	it("more complex variable declaration", () => {
		const token = `let a = 33
		let b = 5
		let c = a + b`;

		expect(tokenizer(token)).toEqual([
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "33" },
			{ type: "LineBreak" },
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "b" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" },
			{ type: "LineBreak" },
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "c" },
			{ type: "VariableAssignment" },
			{ type: "Identifier", value: "a" },
			{ type: "BinaryOperator", value: "+" },
			{ type: "Identifier", value: "b" }
		]);
	});
});

describe("parser", () => {
	it("should create an empty ast from no tokens", () => {
		expect(parser([])).toEqual({ type: "Program", statements: [] });
	});
	it("should parse a simple variable declaration", () => {
		const tokens = [
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" }
		];
		expect(parser(tokens)).toEqual({
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					declaration: {
						id: { type: "Identifier", value: "a" },
						initialValue: {
							type: "Number",
							value: "5"
						}
					}
				}
			]
		});
	});
	it("should parse a simple binaryDeclaration", () => {
		const tokens = [
			{ type: "Number", value: "5" },
			{ type: "BinaryOperator", value: "+" },
			{ type: "Number", value: "4" }
		];

		expect(parser(tokens)).toEqual({
			type: "Program",
			statements: [
				{
					type: "BinaryExpression",
					operator: "+",
					left: { type: "Number", value: "5" },
					right: { type: "Number", value: "4" }
				}
			]
		});
	});
	it("should handle variable variable assignment with an operator", () => {
		const tokens = [
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" },
			{ type: "BinaryOperator", value: "+" },
			{ type: "Number", value: "4" }
		];

		expect(parser(tokens)).toEqual({
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					declaration: {
						id: { type: "Identifier", value: "a" },
						initialValue: {
							type: "BinaryExpression",
							operator: "+",
							left: { type: "Number", value: "5" },
							right: { type: "Number", value: "4" }
						}
					}
				}
			]
		});
	});
	it("should handle multiple expressions in a line", () => {
		const tokens = [
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" },
			{ type: "BinaryOperator", value: "+" },
			{ type: "Number", value: "4" },
			{ type: "BinaryOperator", value: "+" },
			{ type: "Number", value: "3" },
			{ type: "BinaryOperator", value: "+" },
			{ type: "Number", value: "2" }
		];

		expect(parser(tokens)).toEqual({
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					declaration: {
						id: { type: "Identifier", value: "a" },
						initialValue: {
							type: "BinaryExpression",
							operator: "+",
							left: { type: "Number", value: "5" },
							right: {
								type: "BinaryExpression",
								operator: "+",
								left: { type: "Number", value: "4" },
								right: {
									type: "BinaryExpression",
									operator: "+",
									left: { type: "Number", value: "3" },
									right: { type: "Number", value: "2" }
								}
							}
						}
					}
				}
			]
		});
	});
	it("should handle variable multiple expressions", () => {
		const tokens = [
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" },
			{ type: "LineBreak" },
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "b" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "6" },
			{ type: "LineBreak" }
		];
		expect(parser(tokens)).toEqual({
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					declaration: {
						id: { type: "Identifier", value: "a" },
						initialValue: {
							type: "Number",
							value: "5"
						}
					}
				},
				{
					type: "VariableDeclaration",
					declaration: {
						id: { type: "Identifier", value: "b" },
						initialValue: {
							type: "Number",
							value: "6"
						}
					}
				}
			]
		});
	});
});

describe("generator", () => {
	it("should convert an empty program", () => {
		const AST = {
			type: "Program",
			statements: []
		};

		expect(generator(AST)).toEqual("");
	});
	it("should convert an AST of a simple variable", () => {
		const AST = {
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					declaration: {
						id: { type: "Identifier", value: "a" },
						initialValue: {
							type: "Number",
							value: "5"
						}
					}
				}
			]
		};

		expect(generator(AST)).toEqual("let a = 5");
	});
	it("should convert an AST of a simple expression", () => {
		const AST = {
			type: "Program",
			statements: [
				{
					type: "BinaryExpression",
					operator: "+",
					left: { type: "Number", value: "5" },
					right: { type: "Number", value: "4" }
				}
			]
		};

		expect(generator(AST)).toEqual("5 + 4");
	});
	it("should convert an AST of a variable declaration with a binary operator", () => {
		const AST = {
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					declaration: {
						id: { type: "Identifier", value: "a" },
						initialValue: {
							type: "BinaryExpression",
							operator: "+",
							left: { type: "Number", value: "5" },
							right: { type: "Number", value: "4" }
						}
					}
				}
			]
		};

		expect(generator(AST)).toEqual("let a = 5 + 4");
	});
});

describe("transformer", () => {
	it("should be a thing that exists because this is what makes this fun");
});

describe("generate", () => {
	it("should pass things straight through", () => {
		expect(generate("let a = 5")).toEqual("let a = 5");
		expect(generate("5 - 4")).toEqual("5 - 4");
		expect(generate("let ascii = 5 - 4")).toEqual("let ascii = 5 - 4");
		expect(generate("let conjoined = 5 + 4 - 3 * 2")).toEqual(
			"let conjoined = 5 + 4 - 3 * 2"
		);
	});
});
