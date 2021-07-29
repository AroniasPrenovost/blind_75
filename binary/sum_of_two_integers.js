/*

  Runtime: 116 ms, faster than 5.66% of JavaScript online submissions for Sum of Two Integers.
  Memory Usage: 37.6 MB, less than 97.43% of JavaScript online submissions for Sum of Two Integers


 
  That's an extremely popular Facebook problem designed to check your knowledge of bitwise operators:

    x \oplus y \qquad \textrm{that means} \qquad \textrm{bitwise XOR}x⊕ythat meansbitwise XOR

x \& y \qquad \textrm{that means} \qquad \textrm{bitwise AND}x&ythat meansbitwise AND

  \sim x \qquad \textrm{that means} \qquad \textrm{bitwise NOT}∼xthat meansbitwise NOT


*/

var getSum = function(a, b) {
 
  let keep = (a & b) << 1;
  let res = a ^ b;
 
  // If bitwise & is 0, then there is not going to be any carry.
  // result of XOR is addition.
  if (keep == 0) {
      return res;        
  } else {
      return getSum(keep, res);
  }
};


/* 

Runtime: 72 ms, faster than 90.10% of JavaScript online submissions for Sum of Two Integers.
Memory Usage: 38.6 MB, less than 17.51% of JavaScript online submissions for Sum of Two Integers.

*/ 

var getSum = function(a, b) {
  if (b == 0) {
       return a;
   } else {
       return getSum(a ^ b, (a & b) << 1); 
   }
};