/* 

  'unbounded knapsack problem'

  Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target.

  The answer is guaranteed to fit in a 32-bit integer.


  Example 1:

      Input: nums = [1,2,3], target = 4
      Output: 7
      Explanation:
      The possible combination ways are:
      (1, 1, 1, 1)
      (1, 1, 2)
      (1, 2, 1)
      (1, 3)
      (2, 1, 1)
      (2, 2)
      (3, 1)
      Note that different sequences are counted as different combinations.


  Example 2:

      Input: nums = [9], target = 3
      Output: 0

  
  Constraints:

      1 <= nums.length <= 200
      1 <= nums[i] <= 1000
      All the elements of nums are unique.
      1 <= target <= 1000

  

  Follow up: What if negative numbers are allowed in the given array? How does it change the problem? What limitation we need to add to the question to allow negative numbers?

*/ 


/*  

  *ALPHA

  Once you get the trick of these recursive problems, it becomes very easy.

  figure out if it's recursive (sub problems, which are the same)
  figure out the base case & recursive steps
  add the memoization part to not repeat the same sub problem if it's already been done before.

  faster than 99%

*/

var combinationSum4 = function(nums, target, memo={}) {
  if (target ==0) return 1; 
  if (typeof memo[target] != "undefined") return memo[target];
   let ret = 0;
    
    for (let i = 0; i<nums.length; i++) {
        if (target >= nums[i])
            ret += combinationSum4(nums, target - nums[i], memo);
    }
    memo[target] = ret;
    return ret;
};

/* 

  approach #1 - top-down dynamic programming 


*/

var combinationSum4 = function(nums, target) {
    const n = nums.length;
    const memo = new Map();
    
    return topDown(target);
  
    function topDown(target) {
      // base cases
      if (target == 0) return 1;
      if (target < 0) return 0;
      if (memo.has(target)) return memo.get(target);
        
      let count = 0;
      
      for (let i = 0; i < n; i++) {
          const num = nums[i];
          if (num <= target) {
              const amountLeft = target - num;
              count += topDown(amountLeft);
          }
      }
      
      memo.set(target, count);
      return count;
    }
};

/* v.2 */ 

/* DRIVER FUNCTION */
var combinationSum4 = function(nums, target) {
  result = null
  // edge cases
  if(nums===undefined || nums.length == 0 || target===undefined || target < 0){return 0}
  
  // else we deploy recrusive logic
  return combinationSum4Recursive(nums, target)
  
};

/* MAIN LOGIC */
var combinationSum4Recursive = function(nums, target, dp = {}){
  // base case 1
  if(target in dp){
      return dp[target]
  }
  // base case 2
  if(target === 0){
      return 1
  }
  
  // base case 3
  if(target < 0){return 0}
  
  let temp = 0
  nums.forEach(function(num){
      temp+=combinationSum4Recursive(nums, target-num, dp)
  })
  dp[target] = temp
  return temp
  
}























/* 


  approach #2 - bottom-up dynamic programming 
 
  Time: O(N * T)
  Space: O(T)

*/ 
 

var combinationSum4 = function(nums, target) {
    const dp = Array(target+1).fill(0);
    dp[0] = 1;

    for(let i = 1; i <= target; i++) {
        for(let n of nums) {
            if(i >= n) dp[i] += dp[i-n];
        }
    }
    return dp[target];
};

/* v.2 */ 

const combinationSum4 = (nums, target) => {
  let ary = new Array(target+1).fill(0);
  ary[0]=1;
  
  for (let i=0; i<=target; i++) {
    for (let n=0; n<nums.length; n++) {
      if (nums[n] <= i) {
        ary[i] = ary[i]+ary[i-nums[n]];
      }
    }
  }
  
  return ary[target];
};


/* 

  approach #2 - unbounded knapsack dynamic programming 
 
  Time Complexity = O(mn)
  Space Complexity = O(m)

*/ 
 


// TC = O(mn); SC = O(m)
var combinationSum4 = function(nums, target) {
  const dp = Array(target + 1).fill(0);
  dp[0] = 1;
  
// for each target sum, find the number of combinations possible
  for(let i = 1; i <= target; ++i) {
      nums.forEach(num => {
          if(i >= num) {
              dp[i] += dp[i - num];
          }
      })
  }
  return dp[target];
};

/*

  Dry Run

  [1,2,3]
  target = 4
    0   1   2   3   4
    1   1   2   4   7   

*/



/* 

  apprach #3 - brute force | DFS [ time limit exceeded ]

*/ 

var combinationSum4 = function (nums, target) {
  let count = 0;
  let permute = function (nums, sum) {
    if (sum === target) {
      count++;
      return;
    }
    if (sum > target) {
      return;
    }
    for (let num of nums) {
      permute(nums, sum + num);
    }
  };
  permute(nums, 0);
  return count;
};