# March 2019 Challenge

This challenge is going to see us build our own compiler (transpiler), and learn the parts that make up this kind of software.

## Your Mission, if you choose to accept it:

Expand out the `transpiler.example.js`'s functions to pass the test suite found in `transpiler.tests.js`.

To do this, you will need to understand the steps that a transpiler goes through as it does its work.

## What is a transpiler?

A transpiler is software that takes in code from one language, and outputs it in the same language, converts it to an Abstract Syntax Tree, and then converts it back to the same language. Tranpilers are useful to perform transformations on code without doing a full language switch. For us JS developers, babel and everything we get it to do is why transpilers matter to us.

## How does a transpiler work?

A transpiler works by going through several different steps, designed at breaking the raw text version
of your code, and then reconfiguring it. The conversion steps look like:

```
tokenizer(raw_code) => tokens_array
parser(tokens_array) => abstract_syntax_tree (AST)
transformer(AST) => modified_AST
generator(AST) => code
```

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

For the first challenge, our goal is to remove unused variables. For example, in the statement:

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
`VariableAssignment`: The `=` symbol. Must be preceded by an identifier.
`BinaryOperator`: A symbol used to denote a BinaryExpression in an AST. Valid operators are `+`, `-` and `*`. During tokenization, there are not rules on what precedes or follows this token.

### Other tokens
`LineBreak`: The `\n` symbol. A linebreak is an expression terminator.
`VariableDeclaration`: For this challenge, all variable declarations are `let`. This token may only appear at the beginning of a statement, and must be preceded by both an `Identifier` and a `VariableAssignment` token.

### Parts of our AST

To make our lives simpler, we are declaring our AST is always a program, and will have the minimal shape of:

```js
{
  type: "Program",
  statements: [],
}
```

Each line of our program can be translated to a single statement, and added to the statements array.

A statement can do one of three things:
1. Declare a new variable (ex: `let a = 5`)
2. Reassign a variable (ex: `a = 1`)
3. Perform a basic mathematical operation (ex: `5 + 2`, `4 - 1`)

Each statement is represented by a single type.

Each of the above have their own type within the AST, which are:

#### VariableDeclaration

```js
{
  type: "VariableDeclaration",
  declaration: {
    id,
    initialValue
  }
}
```

The id is always an identifier token.
The initialValue may be any non-assignemnt expression.

#### VariableAssignment

```js
{
  type: "VariableAssignment",
  declaration: {
    id,
    value
  }
}
```

Very similar to VariableDeclaration, but has a value instead of an initialValue.

#### BinaryExpression

```js
{
  type: "BinaryExpression",
  operator,
  left,
  right,
}
```

The operator should be one of the three valid operators defined, `+`, `-`, or `*`.

The `left` is always a value.

The `right` may be a value or a BinaryExpression.



Finally, each full program passed to generate will have an export, which should be the last line of the file, and export any value from the file. This means that:

```js
let a = 5
export default a
```

is a valid file, as is:

```js
let a = 5
export default 15
```

and so is:

```js
let a = 5
export default a * 15
```

