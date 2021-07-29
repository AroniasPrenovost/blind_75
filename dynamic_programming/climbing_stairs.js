/* 

  You are climbing a staircase. It takes n steps to reach the top.

  Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

  

  Example 1:

  Input: n = 2
  Output: 2
  Explanation: There are two ways to climb to the top.
  1. 1 step + 1 step
  2. 2 steps
  Example 2:

  Input: n = 3
  Output: 3
  Explanation: There are three ways to climb to the top.
  1. 1 step + 1 step + 1 step
  2. 1 step + 2 steps
  3. 2 steps + 1 step
  

  Constraints:

  1 <= n <= 45


*/ 

/* 

  approach #1 - brute force 

 

*/ 


/* 

  approach #2 - dynamic programming + memoization  

  Runtime: 72 ms, faster than 89.92% of JavaScript online submissions for Climbing Stairs.
  Memory Usage: 38.3 MB, less than 52.48% of JavaScript online submissions for Climbing Stairs.

*/ 


var climbStairs = function(n) {
  let memo = {};

  function countSteps(i=0){
    if(memo[i] !== undefined) return memo[i];
    if(i>n) return 0;
    if(i===n){
        return 1;
    }
    memo[i] = countSteps(i+1) +countSteps(i+2);
    return memo[i];
  }

  return countSteps();
};


/* 

  approach #3 - dynamic programming 

  Runtime: 68 ms, faster than 96.99% of JavaScript online submissions for Climbing Stairs.
  Memory Usage: 38.4 MB, less than 52.48% of JavaScript online submissions for Climbing Stairs.

*/ 

var climbStairs = function(n) {
  const table = Array(n + 1).fill(1);       // default there are only 1way to reach, keep step 1
  for (let i = 1; i < table.length; i++) {
    if (i === 1) {
      table[i] = 1;                         // to stair 1, we only have one option
      continue; 
    }
    table[i] = table[i - 1] + table[i - 2]; // to step n, is actualy the sum of the ways can reach previous step or the one before it
  }
  return table.pop();
};

/* 

  approach #4 - fibonacci number  

  Runtime: 80 ms, faster than 45.31% of JavaScript online submissions for Climbing Stairs.
  Memory Usage: 38.4 MB, less than 52.48% of JavaScript online submissions for Climbing Stairs.

*/ 


var climbStairs = function(n) {
  if (n == 1) return 1;

  let first = 1;
  let second = 2;

  for(let i = 3; i <= n; i++) {
      let third = first + second;
      first = second;
      second = third;
  }

  return second;
};


/* 

  approach #5 - recursion + memoization 
  
  Runtime: 72 ms, faster than 89.92% of JavaScript online submissions for Climbing Stairs.
  Memory Usage: 38.6 MB, less than 11.56% of JavaScript online submissions for Climbing Stairs.

*/ 

var climbStairs = function(n, memo = []) {
  if (n === 1 || n === 0) {
      return 1;
  }

  if (n === 2) {
      return 2;
  }

  if (memo[n] !== undefined) {
      return memo[n];
  }
  
  let res = climbStairs(n-1, memo) + climbStairs(n-2, memo);
  memo[n] = res;
  return res;
  // T.C: O(N)
  // S.C: O(N)
};


/* 

  approach #6 - recursion + memoization (fibonacci style)

  Runtime: 68 ms, faster than 96.99% of JavaScript online submissions for Climbing Stairs.
  Memory Usage: 38.3 MB, less than 70.27% of JavaScript online submissions for Climbing Stairs.

*/ 

var climbStairs = function(n) {
  let memo = new Map();   
  let cs = (n) => {
      if(!memo.has(n)) {
          let res = (n < 2) ? 1 : cs(n-2) + cs(n-1);
          memo.set(n,res);      
      }
      return memo.get(n);
  }
  return cs(n)
};





/* ------- */ 

/* 

  Solution 1:
  bottom up , this will be most time efficient. Space: O(n)

  Runtime: 76 ms, faster than 73.59% of JavaScript online submissions for Climbing Stairs.
  Memory Usage: 38.4 MB, less than 52.48% of JavaScript online submissions for Climbing Stairs.
  
*/

var climbStairs = function(n) {
  var dp = new Array(n+1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for(var i = 2; i<=n; i++) {
      dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
};

/*

  Optimize Space to O(1) - bottom up:

  Runtime: 68 ms, faster than 96.99% of JavaScript online submissions for Climbing Stairs.
  Memory Usage: 38 MB, less than 90.47% of JavaScript online submissions for Climbing Stairs.

*/

var climbStairs = function(n) {
  var way1 = 1;
  var way2 = 1;
  for(var i = 2; i<=n; i++) {
    var cur = way1 + way2;
    way2 = way1;
    way1 = cur;
  }
  return way1;
};

/* 
  Solution 2: recursion with hash

  Runtime: 80 ms, faster than 45.31% of JavaScript online submissions for Climbing Stairs.
  Memory Usage: 38.3 MB, less than 52.48% of JavaScript online submissions for Climbing Stairs.

*/

var climbStairs = function(n) {
  var cache = [];
  var helper = function(i){
    if(i === 0 || i=== 1)
        return 1;
    if(cache[i])
    {
        return cache[i];
    }
    cache[i] =  helper(i-1) + helper(i-2);
    return cache[i];
  }
  return helper(n);
};


/* 

  fibonacci approach/example 

*/ 

var climbStairs = function(n) {
  const ary =[1,1];
  if(n>1){
       for(let i = 2; i <= n ; i++){
          ary[i] = ary[i-1] + ary[i-2];
      }
  };
  return ary.pop()
};

