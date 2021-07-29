/* 

  ** similar to knapsack problem 

  You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

  Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

  Example 1:

      Input: nums = [1,2,3,1]
      Output: 4
      Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
      Total amount you can rob = 1 + 3 = 4.



  Example 2:

      Input: nums = [2,7,9,3,1]
      Output: 12
      Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
      Total amount you can rob = 2 + 9 + 1 = 12.
  

  Constraints:

  1 <= nums.length <= 100
  0 <= nums[i] <= 400

*/ 



/* 

  approach #1 - recursion with memoization 

*/ 



var rob = function(nums) {    
  let max = 0;      
          
  let traverse = (index, runningSum) => {
      let currentSum = runningSum + nums[index]; 
      if(currentSum > max){
          max = currentSum;
      }
      // base case
      if(nums[index+1] === undefined)
      {
          return;
      }
      // store the currentSum in the index
      nums[index] = currentSum;
  
  // Checking which one was larger, index -1 or index -2 since both work, then use it as runningSum for index +1
      let onePreviousSum = nums[index-1] ? nums[index-1] : 0
      let twoPreviousSum = nums[index-2] ? nums[index-2] : 0
  
      traverse(index+1, Math.max(onePreviousSum, twoPreviousSum))
  }
  
  traverse(0, 0)
  
  return max;
};






/* 

  approach #2 - dynamic programming 

*/ 



var rob = function(nums) {
  //dp[i] represents the max money can rob from the first i house
  var dp = Array(nums.length).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for(var i = 2; i < nums.length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[nums.length - 1];
};



/* v.2 pretty slow */ 

var rob = function(nums) {
  // initiate first two values of dp array
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0]
  
  let dp = [nums[0], Math.max(nums[0], nums[1])];
  
  for (let i = 2; i < nums.length; i++) {
      // compare current max with the previous max
      dp[i] = Math.max(dp[i-2] + nums[i], dp[i-1]);
  }

  return dp[nums.length - 1];
};




/* v.3 */ 

var rob = function(nums) {
  const dp = new Array(nums.length + 1).fill(0);
  dp[1] = nums[0];

  for (let i=1; i<nums.length; i++) {
      dp[i + 1] = Math.max(nums[i] + dp[i - 1], dp[i]);
  }

  return dp[nums.length];
};


/* 

  approach #3 - optimized dynamic programming 


  Then it can be optimized to O(1) space, since we only need the last 2 dp value

*/ 


var rob = function(nums) {
    if(nums.length === 1) return nums[0];
    var secondLast = nums[0];
    var last = Math.max(nums[0], nums[1]);
    var cur;

    for(var i = 2; i < nums.length; i++) {
        cur = Math.max(last, secondLast + nums[i]);
        secondLast = last;
        last = cur;
    }

    return last;
};


/* 

  v.2 

  time: O(n)
  space: O(1)

*/ 

var rob = function(nums) {
  let prev1 = prev2 = 0;
  
  for(let i = 0; i < nums.length; i++) {
      let tmp = prev1;
      prev1 = Math.max(prev2 + nums[i], prev1);
      prev2 = tmp;
  }

  return prev1;
};





/* 

//O(n) for both time and space complexity
function rob(nums: number[]): number {
  const size = nums.length;
  
  //base cases:
  if (size === 0) {
    return 0;
  }
  if (size === 1) {
    return nums[0];
  }  

  //init dp table
  let dp: number[] = new Array(size).fill(0);
  dp[0] = nums[0];

  for (let i = 1; i < size; i++) {
    //dp[1] is decided by choosing whether to rob the first or the second
    if (i === 1) {
      dp[i] = Math.max(dp[i - 1], nums[i]);
    } //the rest is determined by choose to rob the current or not
    else {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
  }
  return dp[size - 1];
}

*/



/* v.something */ 


const rob = (nums) => {
  if (nums.length === 0)
      return 0;
  if (nums.length === 1)
      return nums[0];

  const dp = new Array(nums.length + 1).fill(0);
  
  for (let i = nums.length - 1; i >= 0; i--) {
      if (i + 2 >= nums.length)
          dp[i] = Math.max(nums[i], dp[i + 1]);
      else
          dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2]);
  }
  
  return dp[0];
  
  /**
  * Time Complexity: O(n)
  * Space Complexity: O(n)
  **/
};






/* 

  slow but understandable 

  Here, state[i] represents the current max up to i.

*/ 

var rob = function(nums) {
    if (nums.length < 1) return 0;
    if (nums.length < 2) return nums[0];
    if (nums.length < 3) return Math.max(nums[0], nums[1]);
    
    const state = [];
    state[0] = nums[0];
    state[1] = Math.max(state[0], nums[1]);
    for (let i = 2; i < nums.length; i++) {
        state[i] = Math.max(state[i-1], state[i-2] + nums[i]); 
    }
    return state[nums.length-1];
};