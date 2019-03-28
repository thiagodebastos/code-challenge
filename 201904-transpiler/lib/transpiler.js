"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
  DefaultExport:: "export default"
  VariableDeclarator:: "let"
  Identifier:: /[a-zA-Z]+/
  Number:: /[0-9]+/
  VariableAssignmentOperator:: "="
  BinaryOperator:: "+" | "-" | "*"
  LineBreak:: "\n"
*/

/* Parsing 1: Lexical Analysis */
var tokenizer = function tokenizer() {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  if (code === "") return [];
  var tokenizedCode = {
    id: "something",
    type: "Identifier",
    value: "something"
  };
  return [tokenizedCode]; // an array  tokens in processed order
};
/* Parsing 2: Syntatic Analysis */


var parser = function parser(tokens) {
  return _objectSpread({}, tokens);
};

var transformer = function transformer(ast) {
  return {}; // a modified AST
};

var generator = function generator(AST) {
  return ""; // a string that is code
};

var generate = function generate(code) {
  var tokens = tokenizer(code);
  var AST = parser(tokens);
  var transformedAST = transformer(AST);
  var newCode = generator(transformedAST);
  return newCode;
};

module.exports = generate;
module.exports.tokenizer = tokenizer;
module.exports.parser = parser;
module.exports.transformer = transformer;
module.exports.generator = generator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc3BpbGVyLnRzIl0sIm5hbWVzIjpbInRva2VuaXplciIsImNvZGUiLCJ0b2tlbml6ZWRDb2RlIiwiaWQiLCJ0eXBlIiwidmFsdWUiLCJwYXJzZXIiLCJ0b2tlbnMiLCJ0cmFuc2Zvcm1lciIsImFzdCIsImdlbmVyYXRvciIsIkFTVCIsImdlbmVyYXRlIiwidHJhbnNmb3JtZWRBU1QiLCJuZXdDb2RlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUFvQkE7QUFDQSxJQUFNQSxTQUFvQixHQUFHLFNBQXZCQSxTQUF1QixHQUFxQztBQUFBLE1BQXBDQyxJQUFvQyx1RUFBckIsRUFBcUI7QUFDOUQsTUFBR0EsSUFBSSxLQUFLLEVBQVosRUFBZ0IsT0FBTyxFQUFQO0FBQ2hCLE1BQU1DLGFBQW9CLEdBQUc7QUFDekJDLElBQUFBLEVBQUUsRUFBRSxXQURxQjtBQUV6QkMsSUFBQUEsSUFBSSxFQUFFLFlBRm1CO0FBR3pCQyxJQUFBQSxLQUFLLEVBQUU7QUFIa0IsR0FBN0I7QUFLQSxTQUFPLENBQUNILGFBQUQsQ0FBUCxDQVA4RCxDQU90QztBQUMzQixDQVJEO0FBVUE7OztBQUNBLElBQU1JLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUNDLE1BQUQsRUFBaUI7QUFDNUIsMkJBQVlBLE1BQVo7QUFDSCxDQUZEOztBQUdBLElBQU1DLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNDLEdBQUQsRUFBYztBQUM5QixTQUFPLEVBQVAsQ0FEOEIsQ0FDbkI7QUFDZCxDQUZEOztBQUlBLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNDLEdBQUQsRUFBc0I7QUFDcEMsWUFEb0MsQ0FDekI7QUFDZCxDQUZEOztBQUlBLElBQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUNYLElBQUQsRUFBZTtBQUM1QixNQUFNTSxNQUFNLEdBQUdQLFNBQVMsQ0FBQ0MsSUFBRCxDQUF4QjtBQUNBLE1BQU1VLEdBQUcsR0FBR0wsTUFBTSxDQUFDQyxNQUFELENBQWxCO0FBQ0EsTUFBTU0sY0FBYyxHQUFHTCxXQUFXLENBQUNHLEdBQUQsQ0FBbEM7QUFDQSxNQUFNRyxPQUFPLEdBQUdKLFNBQVMsQ0FBQ0csY0FBRCxDQUF6QjtBQUNBLFNBQU9DLE9BQVA7QUFDSCxDQU5EOztBQVFBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJKLFFBQWpCO0FBQ0FHLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlaEIsU0FBZixHQUEyQkEsU0FBM0I7QUFDQWUsTUFBTSxDQUFDQyxPQUFQLENBQWVWLE1BQWYsR0FBd0JBLE1BQXhCO0FBQ0FTLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlUixXQUFmLEdBQTZCQSxXQUE3QjtBQUNBTyxNQUFNLENBQUNDLE9BQVAsQ0FBZU4sU0FBZixHQUEyQkEsU0FBM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBEZWZhdWx0RXhwb3J0OjogXCJleHBvcnQgZGVmYXVsdFwiXG4gIFZhcmlhYmxlRGVjbGFyYXRvcjo6IFwibGV0XCJcbiAgSWRlbnRpZmllcjo6IC9bYS16QS1aXSsvXG4gIE51bWJlcjo6IC9bMC05XSsvXG4gIFZhcmlhYmxlQXNzaWdubWVudE9wZXJhdG9yOjogXCI9XCJcbiAgQmluYXJ5T3BlcmF0b3I6OiBcIitcIiB8IFwiLVwiIHwgXCIqXCJcbiAgTGluZUJyZWFrOjogXCJcXG5cIlxuKi9cbmltcG9ydCBUcmFuc3BpbGVyLCB7XG4gICAgUmF3Q29kZSxcbiAgICBUb2tlbixcbiAgICBBU1QsXG4gICAgVG9rZW5pemVyLFxuICAgIFRyYW5zZm9ybWVyLFxuICAgIFBhcnNlcixcbiAgICBHZW5lcmF0b3Jcbn0gZnJvbSBcIi4vdHlwZXNcIjtcblxuXG4vKiBQYXJzaW5nIDE6IExleGljYWwgQW5hbHlzaXMgKi9cbmNvbnN0IHRva2VuaXplcjogVG9rZW5pemVyID0gKGNvZGU6IHN0cmluZyA9IFwiXCIpOiBbVG9rZW5dIHwgW10gPT4ge1xuICAgIGlmKGNvZGUgPT09IFwiXCIpIHJldHVybiBbXTtcbiAgICBjb25zdCB0b2tlbml6ZWRDb2RlOiBUb2tlbiA9IHtcbiAgICAgICAgaWQ6IFwic29tZXRoaW5nXCIsXG4gICAgICAgIHR5cGU6IFwiSWRlbnRpZmllclwiLFxuICAgICAgICB2YWx1ZTogXCJzb21ldGhpbmdcIlxuICAgIH1cbiAgICByZXR1cm4gW3Rva2VuaXplZENvZGVdOyAvLyBhbiBhcnJheSAgdG9rZW5zIGluIHByb2Nlc3NlZCBvcmRlclxufTtcblxuLyogUGFyc2luZyAyOiBTeW50YXRpYyBBbmFseXNpcyAqL1xuY29uc3QgcGFyc2VyID0gKHRva2VuczogYW55KSA9PiB7XG4gICAgcmV0dXJuIHsgLi4udG9rZW5zIH07XG59O1xuY29uc3QgdHJhbnNmb3JtZXIgPSAoYXN0OiBhbnkpID0+IHtcbiAgICByZXR1cm4ge307IC8vIGEgbW9kaWZpZWQgQVNUXG59O1xuXG5jb25zdCBnZW5lcmF0b3IgPSAoQVNUOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBgYDsgLy8gYSBzdHJpbmcgdGhhdCBpcyBjb2RlXG59O1xuXG5jb25zdCBnZW5lcmF0ZSA9IChjb2RlOiBhbnkpID0+IHtcbiAgICBjb25zdCB0b2tlbnMgPSB0b2tlbml6ZXIoY29kZSk7XG4gICAgY29uc3QgQVNUID0gcGFyc2VyKHRva2Vucyk7XG4gICAgY29uc3QgdHJhbnNmb3JtZWRBU1QgPSB0cmFuc2Zvcm1lcihBU1QpO1xuICAgIGNvbnN0IG5ld0NvZGUgPSBnZW5lcmF0b3IodHJhbnNmb3JtZWRBU1QpO1xuICAgIHJldHVybiBuZXdDb2RlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLnRva2VuaXplciA9IHRva2VuaXplcjtcbm1vZHVsZS5leHBvcnRzLnBhcnNlciA9IHBhcnNlcjtcbm1vZHVsZS5leHBvcnRzLnRyYW5zZm9ybWVyID0gdHJhbnNmb3JtZXI7XG5tb2R1bGUuZXhwb3J0cy5nZW5lcmF0b3IgPSBnZW5lcmF0b3I7XG4iXX0=