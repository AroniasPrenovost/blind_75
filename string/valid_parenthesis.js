/* 

  Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

  An input string is valid if:

      Open brackets must be closed by the same type of brackets.
      Open brackets must be closed in the correct order.

  

  Example 1:

  Input: s = "()"
  Output: true

  Example 2:

  Input: s = "()[]{}"
  Output: true

  Example 3:

  Input: s = "(]"
  Output: false

  Example 4:

  Input: s = "([)]"
  Output: false

  Example 5:

  Input: s = "{[]}"
  Output: true

  

  Constraints:

      1 <= s.length <= 104
      s consists of parentheses only '()[]{}'.

*/ 


/* 

  Approach #1 
  
  Runtime: 64 ms, faster than 99.80% of JavaScript online submissions for Valid Parentheses.
  Memory Usage: 38.9 MB, less than 56.89% of JavaScript online submissions for Valid Parentheses.

*/ 


var isValid = function(s) {

  // initialize hash map with mappings to improve readability
  const obj = {
    "(": ")",
    "{": "}",
    "[": "]",
  }

  // initialize a stack to be used in the algorithm.
  var stack = [];

  for (const paran of s) {
    // if current character is an opening bracket, push to the stack.
    if (obj.hasOwnProperty(paran)) {
      stack.push(paran)

    // if the current character is a closing bracket.
    } else {

      // get the top element of the stack. If the stack is empty, set a dummy value of '#'
      const closeParan = stack.pop();

      // if the mapping for this bracket doesn't match the stack's top element, return false.
      if (paran !== obj[closeParan]) {
        return false;
      }
    }
  }
  
  // if the stack still contains elements, then it is an invalid expression.
  return stack.length === 0;
};

