const generate = require("./cheats");
const { tokenizer, parser, transformer, generator } = generate;

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
	it("should handle actual variable reassignment", () => {
		const token = `let a = 33
		a = 13`;

		expect(tokenizer(token)).toEqual([
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "33" },
			{ type: "LineBreak" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "13" }
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
	it("should parse export default", () => {
		expect(tokenizer("export default 5")).toEqual([
			{ type: "DefaultExport" },
			{ type: "Number", value: "5" }
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
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "5"
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
					id: { type: "Identifier", value: "a" },
					value: {
						type: "BinaryExpression",
						operator: "+",
						left: { type: "Number", value: "5" },
						right: { type: "Number", value: "4" }
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
					id: { type: "Identifier", value: "a" },
					value: {
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
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "5"
					}
				},
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "b" },
					value: {
						type: "Number",
						value: "6"
					}
				}
			]
		});
	});
	it("should handle variable reassignment", () => {
		const tokens = [
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "33" },
			{ type: "LineBreak" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "13" }
		];

		expect(parser(tokens)).toEqual({
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "33"
					}
				},
				{
					type: "VariableAssignment",
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "13"
					}
				}
			]
		});
	});
	it("should handle a default export", () => {
		const tokens = [{ type: "DefaultExport" }, { type: "Number", value: "5" }];
		expect(parser(tokens)).toEqual({
			type: "Program",
			statements: [
				{ type: "DefaultExport", value: { type: "Number", value: "5" } }
			]
		});
	});
	it("should handle dangling identifiers and number", () => {
		const tokens = [
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" },
			{ type: "LineBreak" },
			{ type: "Number", value: "1" },
			{ type: "LineBreak" },
			{ type: "Number", value: "365" },
			{ type: "LineBreak" },
			{ type: "Identifier", value: "a" }
		];
		expect(parser(tokens)).toEqual({
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "5"
					}
				},
				{
					type: "Number",
					value: "1"
				},
				{
					type: "Number",
					value: "365"
				},
				{
					type: "Identifier",
					value: "a"
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
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "5"
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
					id: { type: "Identifier", value: "a" },
					value: {
						type: "BinaryExpression",
						operator: "+",
						left: { type: "Number", value: "5" },
						right: { type: "Number", value: "4" }
					}
				}
			]
		};

		expect(generator(AST)).toEqual("let a = 5 + 4");
	});
});

describe("transformer", () => {
	it("should be a thing that exists because this is what makes this fun", () => {});
});

describe("generate", () => {});

const fullTransformSnippets = [
	{
		name: "simple export statement",
		code: `let a = 5
	export default a`,
		tokens: [
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" },
			{ type: "LineBreak" },
			{ type: "DefaultExport" },
			{ type: "Identifier", value: "a" }
		],
		AST: {
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "5"
					}
				},
				{ type: "DefaultExport", value: { type: "Identifier", value: "a" } }
			]
		},
		transformedAST: {
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "5"
					}
				},
				{ type: "DefaultExport", value: { type: "Identifier", value: "a" } }
			]
		},
		generatedCode: `let a = 5
export default a`
	},
	{
		name: "export a number",
		code: `export default 7`,
		tokens: [{ type: "DefaultExport" }, { type: "Number", value: "7" }],
		AST: {
			type: "Program",
			statements: [
				{ type: "DefaultExport", value: { type: "Number", value: "7" } }
			]
		},
		transformedAST: {
			type: "Program",
			statements: [
				{ type: "DefaultExport", value: { type: "Number", value: "7" } }
			]
		},
		generatedCode: `export default 7`
	},
	{
		name: "with an unused variable",
		code: `let a = 52
export default 112`,
		tokens: [
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "52" },
			{ type: "LineBreak" },
			{ type: "DefaultExport" },
			{ type: "Number", value: "112" }
		],
		AST: {
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "52"
					}
				},
				{ type: "DefaultExport", value: { type: "Number", value: "112" } }
			]
		},
		transformedAST: {
			type: "Program",
			statements: [
				{ type: "DefaultExport", value: { type: "Number", value: "112" } }
			]
		},
		generatedCode: `export default 112`
	},
	{
		name: "with a used and an unused variable",
		code: `let a = 11
	let b = 999
	export default b`,
		tokens: [
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "11" },
			{ type: "LineBreak" },
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "b" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "999" },
			{ type: "LineBreak" },
			{ type: "DefaultExport" },
			{ type: "Identifier", value: "b" }
		],
		AST: {
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "11"
					}
				},
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "b" },
					value: {
						type: "Number",
						value: "999"
					}
				},
				{ type: "DefaultExport", value: { type: "Identifier", value: "b" } }
			]
		},
		transformedAST: {
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "b" },
					value: {
						type: "Number",
						value: "999"
					}
				},
				{ type: "DefaultExport", value: { type: "Identifier", value: "b" } }
			]
		},
		generatedCode: `let b = 999
export default b`
	},
	{
		name: "where two variables are added as the export",
		code: `let a = 11
	let b = 999
	export default a + b`,
		tokens: [
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "11" },
			{ type: "LineBreak" },
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "b" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "999" },
			{ type: "LineBreak" },
			{ type: "DefaultExport" },
			{ type: "Identifier", value: "a" },
			{ type: "BinaryOperator", value: "+" },
			{ type: "Identifier", value: "b" }
		],
		AST: {
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "11"
					}
				},
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "b" },
					value: {
						type: "Number",
						value: "999"
					}
				},
				{
					type: "DefaultExport",
					value: {
						type: "BinaryExpression",
						operator: "+",
						left: { type: "Identifier", value: "a" },
						right: { type: "Identifier", value: "b" }
					}
				}
			]
		},
		transformedAST: {
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "11"
					}
				},
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "b" },
					value: {
						type: "Number",
						value: "999"
					}
				},
				{
					type: "DefaultExport",
					value: {
						type: "BinaryExpression",
						operator: "+",
						left: { type: "Identifier", value: "a" },
						right: { type: "Identifier", value: "b" }
					}
				}
			]
		},
		generatedCode: `let a = 11
let b = 999
export default a + b`
	},
	{
		name: "with variable transitively used",
		code: `let a = 1337
	let b = a
	export default b`,
		tokens: [
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "1337" },
			{ type: "LineBreak" },
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "b" },
			{ type: "VariableAssignment" },
			{ type: "Identifier", value: "a" },
			{ type: "LineBreak" },
			{ type: "DefaultExport" },
			{ type: "Identifier", value: "b" }
		],
		AST: {
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "1337"
					}
				},
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "b" },
					value: { type: "Identifier", value: "a" }
				},
				{
					type: "DefaultExport",
					value: { type: "Identifier", value: "b" }
				}
			]
		},
		transformedAST: {
			type: "Program",
			statements: [
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "a" },
					value: {
						type: "Number",
						value: "1337"
					}
				},
				{
					type: "VariableDeclaration",
					id: { type: "Identifier", value: "b" },
					value: { type: "Identifier", value: "a" }
				},
				{
					type: "DefaultExport",
					value: { type: "Identifier", value: "b" }
				}
			]
		},
		generatedCode: `let a = 1337
let b = a
export default b`
	}
];

const fullTransformSnippetsLies = [
	`let a = 1337
let b = a
export default a`,
	`let a = 1
let b = 2
let c = 3
let d = 4
let e = 5
let f = 6
let h = 7
let i = 8
let j = 9
let k = 10
let z = a - b * j
export default z + e`,
	`let a = 1
let b = a
let c = b
let d = c
let e = d
let f = e
let h = f
let i = f
let j = 9
let k = 10
let z = a * a * h
export default z`
];

describe("Integrationish Tests", () => {
	fullTransformSnippets.map(testCase =>
		describe(testCase.name, () => {
			it("tokenizer", () => {
				const tokens = tokenizer(testCase.code);
				expect(tokens).toEqual(testCase.tokens);
			});
			it("parser", () => {
				const AST = parser(testCase.tokens);
				expect(AST).toEqual(testCase.AST);
			});
			it("transformer", () => {
				const AST = transformer(testCase.AST);
				expect(AST).toEqual(testCase.transformedAST);
			});
			it("generator", () => {
				const code = generator(testCase.transformedAST);
				expect(code).toEqual(testCase.generatedCode);
			});
		})
	);
});
