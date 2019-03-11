const { tokenizer, parser, transformer, generator } = require("./cheats");

// Other fun one: const a = 3 + 4 + 6 - shows nesting

describe("tokenizer", () => {
	it("should tokenize an empty string", () => {
		expect(tokenizer("")).toEqual([]);
	});
	it("should tokenize a simple assignment", () => {
		expect(tokenizer("let a = 3 ")).toEqual([
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "3" }
		]);
	});
	it("should tokenize a more complicated assignment", () => {
		expect(tokenizer("let a = 33 + 44 ")).toEqual([
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
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "b" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" },
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
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "b" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" },
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
});

const letAEqualFive = [
	{ type: "VariableDeclaration" },
	{ type: "Identifier", value: "a" },
	{ type: "VariableAssignment" },
	{ type: "Number", value: "5" }
];

const BinaryInVariableDeclarator = [
	{ type: "VariableDeclaration" },
	{ type: "Identifier", value: "a" },
	{ type: "VariableAssignment" },
	{ type: "Number", value: "5" },
	{ tye: "BinaryOperator", value: "+" },
	{ tye: "Number", value: "5" }
];

const testParser = () => {};
