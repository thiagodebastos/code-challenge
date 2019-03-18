# March 2019 Challenge

This challenge is going to see us build our own compiler (transpiler),
and learn the parts that make up this kind of software.

We are also changing it up and publishing our solutions to
npm as the way to submit. We want to give everyone a chance to
practice working on and publishing a package, which this will be
a good way to learn.

## Your Mission, if you choose to accept it:

Expand out the `transpiler.example.js`'s functions to pass the test suite found in `transpiler.tests.js`.

To do this, you will need to understand the steps that a transpiler goes through as it does its work.

## How does a transpiler work?

A transpiler works by going through several different steps, designed at breaking the raw text version
of your code, and then reconfiguring it. The conversion steps look like:

```
tokenizer(raw_code) => tokens_array
parser(tokens_array) => abstract_syntax_tree (AST)
transformer(AST) => modified_AST
generator(AST) => code
```

You can write your tests in any order, however it is likely helpful to understand tokens before you write your parser.

### What is a token?

A token is an object that represents a discrete unit in your code, such as:

```js
{ type: "VariableDeclaration" }
```

Every token has a type. This is used by later processes to decide what to do with the token. In addition, some
tokens have values, which are a string, and hold some information from the source code, for example:

```js
{ type: "Number", value: "7" }
```

Each challenge explains the tokens that it needs.

### What is an AST?

An Abstract Syntax Tree (AST) is a tree representation of your code, that goes further than tokens as it contains
informations about how tokens relate to one another.

This can be seen from something such as this variable declaration in an AST:

```js
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
```

An AST is built from tokens, not code directly, however can be used to convert back into code.

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
