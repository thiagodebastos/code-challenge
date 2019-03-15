# March 2019 Challenge

This challenge is going to see us build our own compiler (transpiler),
and learn the parts that make up this kind of software.

We are also changing it up and publishing our solutions to
npm as the way to submit. We want to give everyone a chance to
practice working on and publishing a package, which this will be
a good way to learn.

## Setting up and publishing your package

### package.json

```json
{
  "name": "@tm-code-challenge/YOUR_NAME_HERE-transpiler",
  "version": "1.0.0"
}
```

### Main file

```js
// in the main file of your package

const tokenizer = (code) => {
  /* ... */
  return [] // an array of tokens in processed order
}

const parser = (tokensArray) => {
  /* ... */
  return {} // an object which is our AST - we can actually refer back to the tree traversal stuff we did
}

const transformer = (AST) => {
  /* ... */
  return {} // a modified AST
}

const generator = (AST) => {
  /* ... */
  return `` // a string that is code
}

const generate = (code) => {
    const tokens = tokenizer(code);
    const AST = parser(tokens);
    const transformedAST = transformer(AST);
    const newCode = generator(transformedAST);
    return newCode;
}

module.exports = generate;
module.exports.tokenizer = tokenizer;
module.exports.parser = parser;
module.exports.transformer = transformer;
module.exports.generator = generator;
```

### Symlinking

### Testing

### Publishing

> NOTE We are assuming you are part of the Thinkmill org on github, and so can publish a package under a scope. If you are not, you may need to publish an unscoped package

## Challenge 1 - initial set of tokens

For the first challenge, our goal is to be able to remove unnecessary variables. For example,
in the statement:

```js
let a = 5
let b = a

export default a;
```

The variable b is never used and could be removed.

On a more complicated example:

```js
let a = 5
let b = a

export default b;
```

here since the variables are just pointing to each other, we can reduce the code to:

// @timl is this a bad idea?
```js
let a = 5

export default a;
```

For this first part we are using a very reduced set of javascript that includes:

- `let` as the only variable type
- `numbers` and `identifiers` (variable names) as the only values/data types
- Basic math operators (`+`, `-`, `*`) as the only kinds of operation (no functions yet)

A good approach to this is to look at the tests required for each of the parts of the transpilation,
and write one function at a time, before testing the full `generator` function.

Tokens you will need to be able to recognise + create:

### Value tokens
`Number`: A collection of numeric characters. A value type.
`Identifier`: A collection of alphabetic characters. A value type.

### Expression tokens
`VariableAssignment`: The `=` symbol
`BinaryOperator`: An operator with a value before and after it. Valid operators are `+`, `-` and `*`

### Other tokens
`LineBreak`: The `\n` symbol. A linebreak is an expression terminator.
`VariableDeclaration`: For this challenge, all identifiers are `let`.

## Terms

### Token
### AST
### Type
### Statement