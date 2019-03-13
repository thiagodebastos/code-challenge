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
	},
	{ type: "LineBreak", matchPattern: `\\n+` }
];

const space = `\\s+`;

const tokenizer = code => {
	let tokens = [];

	while (code.length && counter < 1000) {
		counter++;
		let tokenShape = tokenShapes.find(({ type, matchPattern }) => {
			const check = new RegExp(`^${matchPattern}`);
			return check.test(code);
		});
		if (!tokenShape) {
			const check = new RegExp(space);
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

const parseExpression = tokens => {
	if (tokens.length === 1) return tokens.shift();

	const left = tokens.shift();
	const operator = tokens.shift();
	const right = parseExpression(tokens);
	if (operator.type === "BinaryOperator") {
		return { type: "BinaryExpression", operator: operator.value, left, right };
	} else if (operator.type === "VariableAssignment") {
		return {
			type: "VariableAssignment",
			id: left,
			updatedValue: right
		};
	} else {
		throw new Error(
			`Could not parse expression for operator of type ${operator.type}`
		);
	}
};

const getTokensBeforeBreak = tokens => {
	let expressionTokens = [];
	while (tokens[0] && tokens[0].type !== "LineBreak") {
		expressionTokens.push(tokens.shift());
	}
	return expressionTokens;
};

const parser = tokensArray => {
	let count = 0;
	const AST = {
		type: "Program",
		statements: []
	};

	let statement;

	while (tokensArray.length && count < 1000) {
		count++;
		let token = tokensArray.shift();
		switch (token.type) {
			case "VariableDeclaration": {
				const id = tokensArray.shift();
				// remove our dumb variableAssignment token
				tokensArray.shift();

				const lbIndex = tokensArray.findIndex(
					({ type }) => type === "LineBreak"
				);
				let expressionTokens = getTokensBeforeBreak(tokensArray);
				const initialValue = parseExpression(expressionTokens);
				AST.statements.push({
					type: "VariableDeclaration",
					declaration: {
						id,
						initialValue
					}
				});
				break;
			}
			case "BinaryOperator": {
				let expressionTokens = getTokensBeforeBreak(tokensArray);
				AST.statements.push(parseExpression(expressionTokens));
				break;
			}
			case "Number": {
				if (tokensArray[0] && tokensArray[0].type === "BinaryOperator") {
					let expressionTokens = getTokensBeforeBreak(tokensArray);
					AST.statements.push(parseExpression([token, ...expressionTokens]));
				} else {
					statements.push(token);
				}
				break;
			}
			case "Identifier": {
				if (tokensArray[0] && tokensArray[0].type === "BinaryOperator") {
					let expressionTokens = getTokensBeforeBreak(tokensArray);
					AST.statements.push(parseExpression([token, ...expressionTokens]));
				} else if (
					tokensArray[0] &&
					tokensArray[0].type === "VariableAssignment"
				) {
					// In this instance, we need to add a VariableAssignment node
				} else {
					statements.push(token);
				}
				break;
			}
			case "LineBreak": {
				break;
			}
			default:
				throw new Error(`unexpected token ${JSON.stringify(token)}`);
		}
	}
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

module.exports = generate;
module.exports.tokenizer = tokenizer;
module.exports.parser = parser;
module.exports.transformer = transformer;
module.exports.generator = generator;
