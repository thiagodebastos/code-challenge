# March 2019 Challenge

This challenge is going to see us build our own compiler (transpiler),
and learn the parts that make up this kind of software.

We are also changing it up and publishing our solutions to
npm as the way to submit. We want to give everyone a chance to
practice working on and publishing a package, which this will be
a good way to learn.

## Setting up and publishing your package

### package.json

### Main file

```js
// in the main file of your package

export const tokenizer = (code) => {
  /* ... */
  return [] // an array of tokens in processed order
}

export const parser = (tokensArray) => {
  /* ... */
  return {} // an object which is our AST - we can actually refer back to the tree traversal stuff we did
}

export const transformer = (AST) => {
  /* ... */
  return {} // a modified AST
}

export const generator = (AST) => {
  /* ... */
  return `` // a string that is code
}

export default (code) => {
    const tokens = tokenizer(code);
    const AST = parser(tokens);
    const transformedAST = transformer(AST);
    const newCode = generator(transformedAST);
    return newCode;
}

```

### Symlinking

### Testing

## Challenge 1

Tokens you will need to be able to recognise + create:

`number`
`variableDeclarator`
`variableAssignment`
`


## Terms

### token
### AST