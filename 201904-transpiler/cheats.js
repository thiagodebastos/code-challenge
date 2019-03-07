let counter = 0;

const tokenShapes = [
	{
		type: "VariableDeclaration",
		matchPattern: "let"
	},
	{
		type: "Identifier",
		matchPattern: "[A-Za-z]+",
		getValue: code => code
	},
	{
		type: "VariableAssignment",
		matchPattern: "="
	},
	{ type: "Number", matchPattern: `\\d+`, getValue: code => code },
	{
		type: "BinaryOperator",
		matchPattern: `(\\+|-|\\*)`,
		getValue: code => code
	}
];

const endToken = `(\\s|\\n)+`;

const tokenizer = code => {
	let tokens = [];

	while (code.length && counter < 1000) {
		counter++;
		let tokenShape = tokenShapes.find(({ type, matchPattern }) => {
			const check = new RegExp(`^${matchPattern}`);
			return check.test(code);
		});
		if (!tokenShape) {
			const check = new RegExp(endToken);
			if (check.test(code)) {
				code = code.replace(/^(\s|\n)+/, "");
				continue;
			}
			console.error("could not get token from", code, code.length);
			throw new Error("could not parse a token here");
		}
		const { type, matchPattern, getValue } = tokenShape;
		const check = new RegExp(matchPattern);
		const tokenCode = check.exec(code)[0];
		code = code.replace(tokenCode, "");
		if (type === "blankSpace") continue;

		const token = { type };

		if (getValue) {
			token.value = getValue(tokenCode);
		}
		tokens.push(token);
	}

	return tokens; // an array of tokens in processed order
};

const parser = tokensArray => {
	const AST = {
		type: "Program",
		statements: []
	};

	while (tokensArray.length)
		/* ... */
		return AST; // an object which is our AST - we can actually refer back to the tree traversal stuff we did
};

const transformer = AST => {
	/* ... */
	return {}; // a modified AST
};

const generator = AST => {
	/* ... */
	return ``; // a string that is code
};

const generate = code => {
	const tokens = tokenizer(code);
	const AST = parser(tokens);
	const transformedAST = transformer(AST);
	const newCode = generator(transformedAST);
	return newCode;
};

const expect = (value1, value2) => {
	const string1 = JSON.stringify(value1, undefined, 2);
	const string2 = JSON.stringify(value2, undefined, 2);
	if (string1 === string2) {
		return true;
	} else {
		throw new Error(`${string1} is not equal to ${string2}`);
	}
};

// TODO we should check for grammar errors and have the tokenizer do something specific so we can test for it

const testTokenising = () => {
	expect(tokenizer(""), []);
	expect(tokenizer("let a = 3 "), [
		{ type: "VariableDeclaration" },
		{ type: "Identifier", value: "a" },
		{ type: "VariableAssignment" },
		{ type: "Number", value: "3" }
	]);
	expect(tokenizer("let a = 33 + 44 "), [
		{ type: "VariableDeclaration" },
		{ type: "Identifier", value: "a" },
		{ type: "VariableAssignment" },
		{ type: "Number", value: "33" },
		{ type: "BinaryOperator", value: "+" },
		{ type: "Number", value: "44" }
	]);
	expect(tokenizer("5 + 3 "), [
		{ type: "Number", value: "5" },
		{ type: "BinaryOperator", value: "+" },
		{ type: "Number", value: "3" }
	]);
	expect(
		tokenizer(`let a = 5
let b = a`),
		[
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" },
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "b" },
			{ type: "VariableAssignment" },
			{ type: "Identifier", value: "a" }
		]
	);
	expect(tokenizer("let supercallifragellisticexpialedocious = 5"), [
		{ type: "VariableDeclaration" },
		{ type: "Identifier", value: "supercallifragellisticexpialedocious" },
		{ type: "VariableAssignment" },
		{ type: "Number", value: "5" }
	]);
	expect(
		tokenizer(`let a = 33
let b = 5`),
		[
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "a" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "33" },
			{ type: "VariableDeclaration" },
			{ type: "Identifier", value: "b" },
			{ type: "VariableAssignment" },
			{ type: "Number", value: "5" }
		]
	);
	expect(
		tokenizer(`let a = 33
let b = 5
a + b`),
		[
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
		]
	);
	expect(
		tokenizer(`let a = 33
let b = 5
let c = a + b`),
		[
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
		]
	);
};
// testTokenising()

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
	{ tye: "BinaryExpression", value: "+" },
	{ tye: "Number", value: "5" }
];

// Other fun one: const a = 3 + 4 + 6 - shows nesting

const testParser = () => {
	expect(parser([]), { type: "Program", statements: [] });
	expect(parser(letAEqualFive), {
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
};

testParser();
