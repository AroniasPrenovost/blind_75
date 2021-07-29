/* 


Counting Bits


Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

 

Example 1:

  Input: n = 2
  Output: [0,1,1]
  Explanation:
  0 --> 0
  1 --> 1
  2 --> 10

Example 2:

  Input: n = 5
  Output: [0,1,1,2,1,2]
  Explanation:
  0 --> 0
  1 --> 1
  2 --> 10
  3 --> 11
  4 --> 100
  5 --> 101

*/ 



/* 

  https://leetcode.com/problems/counting-bits/discuss/?currentPage=1&orderBy=most_votes&tag=javascript

*/ 

// The act of counting the amount of times you can drop the least significan bit is the number of bits in a number. We iterate from 0 to n, and for each number we find the number of LSBs.
 /**
 * @param {number} n
 * @return {number[]}
 */


/*
  Approach #1

  Runtime: 156 ms, faster than 22.11% of JavaScript online submissions for Counting Bits.
*/ 

var countBits = function(n) {
  let bits = [];
  for (let i = 0; i <= n; i++)
      // remove 0 from bits
      bits.push(Number(i).toString(2).replace(/0/g, '').length);
  return bits;  
};

    
 /* 
  
    approach #2

    Runtime: 84 ms, faster than 99.85% of JavaScript online submissions for Counting Bits.
    Memory Usage: 44.6 MB, less than 70.83% of JavaScript online submissions for Counting Bits.

*/

var countBits = function(n) {
  
  const ans = [0];
  let base = 1;
  for (let i = 1; i < n + 1; i++) {
      if (i === base) {
          ans.push(1);
          base *= 2;
      } else {
          ans[i] = ans[i - base / 2] + 1;
      }
  }
  return ans;
};

/* 

  approach #3 - Last Set Bit - clearest one the best 

  For example if we take, number 4, then it will have the same number of bits as 4 / 2 i.e. 2
  And if we take number 5, then it will have one less than the number of bits in Math.floor(5 / 2). So, I am adding one at the end.

*/     
    
 var countBits = function(n) {
  let res = [0]
  for(let i = 1; i <= n; i++){
      res[i] = res[Math.floor(i/2)] + Math.floor(i%2)
  }
  return res;
};

countBits(30);