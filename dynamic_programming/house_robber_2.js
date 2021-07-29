/* 

  You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

  Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

  

  Example 1:

      Input: nums = [2,3,2]
      Output: 3
      Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
  
  
  
  
  Example 2:

      Input: nums = [1,2,3,1]
      Output: 4
      Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
      Total amount you can rob = 1 + 3 = 4.
  
  
  
  Example 3:

      Input: nums = [0]
      Output: 0
  

  Constraints:

    1 <= nums.length <= 100
    0 <= nums[i] <= 1000

*/ 




/* 

  approach #1 - dynamic programming 

*/ 



/* 

  intuitive solution 

  Time: O(N)
  Space: O(1) 

*/ 

var rob = function(nums) {
  if(nums.length < 4) return Math.max(...nums);
  const res1 = houseRobber(0, nums.length-2);
  const res2 = houseRobber(1, nums.length-1);
  return Math.max(res1, res2);
  
  function houseRobber(start, end) {
      let prev1 = 0, prev2 = 0;
      
      for(let i = start; i <= end; i++) {
          const steal = prev1 + nums[i];
          const noSteal = prev2;
          prev1 = prev2;
          prev2 = Math.max(steal, noSteal);
      }
      return prev2;
  }
};




/* 

  Time: O(n)
  Space: O(1)

 */

var rob = function(nums) {
  if(nums.length === 1) return nums[0];
  if(nums.length === 2) return Math.max(nums[0], nums[1]);
  //case 1, don't consider the last house;
  var secondLast = nums[0];
  var last = Math.max(nums[0], nums[1]);
  var result1 = last;
  for(var i = 2; i < nums.length - 1; i++) {
      result1 = Math.max(last, secondLast + nums[i]);
      secondLast = last;
      last = result1;
  }
  //case 2, don't consider the first house;
  secondLast = nums[1];
  last = Math.max(nums[1], nums[2]);
  var result2 = last;
  for(var i = 3; i < nums.length; i++) {
      result2 = Math.max(last, secondLast + nums[i]);
      secondLast = last;
      last = result2;
  }
  return Math.max(result1, result2);
};















/* v.3 */ 

var rob = function(nums) {
  let n = nums.length;
  if(n===0) return 0;
  if(n===1) return nums[0];
  if(n===2) return Math.max(nums[0],nums[1])
  
  let dp1 = new Array(n);
  let dp2 = new Array(n);
  
  computeResult(0,n-2,dp1,nums);
  computeResult(1,n-1,dp2,nums);
  
  function computeResult(i,n,dp,nums){
      dp[i] = nums[i]
      dp[i+1] = Math.max(dp[i],nums[i+1])
      
      for(let j=i+2; j<=n; j++){
          dp[j] = Math.max(dp[j-1],dp[j-2]+nums[j])
      }
  }
  return Math.max(dp1[n-2],dp2[n-1])
};




/* v.4  easy / basic */ 

var rob = function(nums) {
  if (nums.length < 2) {
      return nums[0] || 0;
  }
  
  const memo1 = [nums[0]];
  const memo2 = [0, nums[1]];
  
  for (let i=1; i<nums.length - 1; i++) {
      memo1[i] = Math.max(nums[i] + (memo1[i - 2] || 0), memo1[i - 1]);
  }
  
  for (let i=2; i<nums.length; i++) {
      memo2[i] = Math.max(nums[i] + memo2[i - 2], memo2[i - 1]);
  }
  
  return Math.max(memo1.pop(), memo2.pop());
};