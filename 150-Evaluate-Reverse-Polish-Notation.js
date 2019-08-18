/**
 * Valid operators are +, -, *, /. Each operand may be an integer or another expression.
 * 
 * Note:
 * 
 * Division between two integers should truncate toward zero.
 * The given RPN expression is always valid. That means the expression would always evaluate
 * to a result and there won't be any divide by zero operation.
 * Example 1:
 * 
 * Input: ["2", "1", "+", "3", "*"]
 * Output: 9
 * Explanation: ((2 + 1) * 3) = 9
 * Example 2:
 * 
 * Input: ["4", "13", "5", "/", "+"]
 * Output: 6
 * Explanation: (4 + (13 / 5)) = 6
 * Example 3:
 * 
 * Input: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
 * Output: 22
 * Explanation: 
 *   ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
 * = ((10 * (6 / (12 * -11))) + 17) + 5
 * = ((10 * (6 / -132)) + 17) + 5
 * = ((10 * 0) + 17) + 5
 * = (0 + 17) + 5
 * = 17 + 5
 * = 22
 * 
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  let hold = null;
  let wait = [];
  let pushedSinceLastHold = 0;

  for (let i = 0; i < tokens.length; i++) {
    if (!isNaN(Number(tokens[i]))) {
      wait.push(Number(tokens[i]));
      if (hold !== null) pushedSinceLastHold += 1;
    }
    else {
      let right = null;
      let left = null;

      if (hold === null || pushedSinceLastHold > 1) {
        right = wait.pop();
        left = wait.pop();
      }
      else if (pushedSinceLastHold === 1) {
        left = hold;
        right = wait.pop();
      } else {
        right = hold;
        left = wait.pop();
      }

      let result = null;
      if (tokens[i] === "+") result = add(left, right);
      else if (tokens[i] === "-") result = subtract(left, right);
      else if (tokens[i] === "*") result = multiply(left, right);
      else if (tokens[i] === "/") result = divide(left, right);

      if (pushedSinceLastHold > 1) {
        wait.push(result);
        pushedSinceLastHold -= 1;
      }
      else {
        hold = result;
        pushedSinceLastHold = 0;
      }
    }
  }
  if (hold === null) hold = wait.pop();

  return hold;
}

// helper functions for operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  result = a / b;
  return result >= 0 ? Math.floor(result) : Math.ceil(result);
}

console.log(evalRPN(["-8", "23", "8", "-", "9", "23", "-", "-", "*", "33", "-8", "/", "+", "38", "-14", "-", "-", "-7", "32", "-19", "-", "11", "+", "+", "+", "14", "22", "-", "-", "27", "-9", "-", "+", "31", "+", "-12", "-11", "-", "-", "14", "+", "30", "+", "37", "30", "-", "+", "-9", "+", "7", "-", "37", "+", "-5", "13", "/", "-", "19", "-2", "-19", "12", "+", "-", "23", "+", "-", "-19", "-", "+", "6", "+", "-17", "+", "17", "+", "5", "36", "+", "-10", "+", "+", "23", "-8", "-", "-", "18", "-", "31", "-16", "-", "+", "34", "+", "-6", "+", "24", "-", "22", "-", "-8", "-", "28", "+", "-12", "+", "39", "28", "-7", "+", "+", "-14", "5", "+", "5", "+", "10", "+", "+", "+", "-18", "*", "10", "+", "-5", "11", "-", "6", "+", "-", "-12", "31", "+", "+", "30", "29", "-", "-", "39", "+", "13", "-8", "-5", "+", "-", "26", "19", "-", "*", "-", "10", "-", "-20", "5", "+", "+", "0", "-", "28", "-", "19", "/", "28", "+", "-18", "-", "28", "20", "+", "-5", "-19", "+", "+", "-", "-12", "-", "3", "-", "6", "-15", "+", "4", "-", "-", "38", "+", "-9", "-", "38", "-", "12", "-20", "-", "10", "5", "-15", "-", "-", "-", "+", "-11", "+", "5", "+", "2", "-", "28", "+", "-9", "-11", "-", "+", "37", "-", "-17", "31", "-", "2", "+", "+", "-16", "-12", "-", "-", "12", "+", "34", "-", "15", "+", "8", "+", "17", "-", "2", "-", "33", "+", "-5", "+", "14", "+", "29", "-", "33", "23", "+", "26", "30", "-", "+", "+", "39", "+", "9", "24", "-", "-", "20", "15", "+", "-", "24", "+", "37", "-", "30", "-1", "-", "+", "34", "+", "-13", "-", "23", "15", "-", "-", "-5", "-8", "8", "30", "35", "-9", "22", "+", "-", "-", "36", "-1", "+", "5", "-", "-", "+", "25", "-", "+", "27", "-", "16", "+", "+", "+", "39", "-", "15", "-", "-3", "+", "5", "-6", "-", "+", "-6", "-15", "-7", "-", "+", "/", "13", "-", "18", "+", "4", "+", "29", "+", "-17", "0", "-6", "-20", "-17", "+", "12", "-", "+", "-", "+", "+", "-10", "22", "+", "+", "-11", "-", "-2", "38", "-", "-", "-6", "+", "0", "-", "-10", "+", "-4", "-10", "+", "-", "0", "-", "31", "30", "-", "37", "5", "+", "+", "+", "-15", "+", "38", "4", "-", "-16", "-17", "+", "+", "+", "38", "-", "27", "-19", "/", "12", "+", "/"]));
