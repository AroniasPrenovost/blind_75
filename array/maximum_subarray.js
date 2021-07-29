/* 

  Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

  Example 1:

  Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
  Output: 6
  Explanation: [4,-1,2,1] has the largest sum = 6.
  Example 2:

  Input: nums = [1]
  Output: 1
  Example 3:

  Input: nums = [5,4,-1,7,8]
  Output: 23
  

  Constraints:

  1 <= nums.length <= 3 * 104
  -105 <= nums[i] <= 105
  

  Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

*/ 


/* 

  approach #1 -  brute force 

   O(n^2)

   finding all of the subarray and their sumand picking up the max of them

*/ 

 
var maxSubArray = function(nums) {

    let max = nums[0];
    
    for (let i = 0; i < nums.length; i++) {
        let temp = nums[i]
         max = Math.max(temp, max);
        for (let j = i+1; j < nums.length; j++) {
            temp += nums[j];
            max = Math.max(temp, max);
        }
    }
    return max;
    
};




/* 

  approach #2 - dynamic programming - Kadane's algorithm 



  Key Observation:
      max sum at current position can be either the current element itself 
      or the sum of current + sum till last

    Time complexity: O(n), where N is the length of nums.

        We iterate through every element of nums exactly once.  

    Space complexity: O(1)
      No matter how long the input is, we are only ever using 2 variables: currentSubarray and maxSubarray.
    
*/ 

var maxSubArray = function(nums) {

  /* max sum at 0th will the 0th elem */
  let currentSum = nums[0];
  let max = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], nums[i]+currentSum);
    max = Math.max(max, currentSum);
  }
  
  return max;
};


/* v.2 */ 


var maxSubArray = function(nums) {
  let max_sum = nums[0] < 0 ? 0 : nums[0];
  let current_sum = max_sum;
  let max_element = Math.max(Number.MIN_SAFE_INTEGER,nums[0]);
  for(let i = 1; i < nums.length; i++){
    
    current_sum += nums[i];
    if(current_sum < 0){
        current_sum = 0;
    }  

    max_sum=Math.max(current_sum, max_sum);
    max_element=Math.max(nums[i], max_element);
  }

  if(max_sum == 0){
    return max_element;
  }

  return max_sum;
};

/* v.3 Kadane's algorithm */ 

var maxSubArray = function(nums) {
  let sum = 0;
  let maxSum = -Infinity; // accounts for negative numbers being in the array, not just 0
  
  if(nums.length === 0) return 0;
  if(nums.length === 1) return nums[0]
  
  for(let i = 0; i < nums.length; i++){
      sum += nums[i];
      maxSum = Math.max(maxSum, sum);
      if(sum < 0) sum = 0;
  }

  return maxSum;
};


/* v.4 greedy, 

  * A greedy algorithm is any algorithm that follows the problem-solving 
    heuristic of making the locally optimal choice at each stage. 

*/ 

var maxSubArray = function(nums) {
  var result = nums[0];
  var sum = 0;
  for(var i = 0; i < nums.length; i++) {
      sum += nums[i];
      if(result < sum) result = sum;
      if(sum < 0) sum = 0;
  }
  return result;
};





/* 

  approach #3 - divide and conquer 

  - a little bit slower than Kadane's, but still a good exercise 

*/ 


var maxSubArray = function(nums) {
  return findMax(nums, 0, nums.length - 1)
};

var findMax = function (nums, l, r) {
  if (l == r) {
      //Base case, return num here
      return nums[l]
  }
  
  let mid = Math.floor((l + r)/2)
  let leftSum = findMax(nums, l, mid) //Recursively check left side for max sum
  let rightSum = findMax(nums, mid+1, r) //recursively check right side for max sum
  const crossingSum = findCrossingSum(nums, l, mid, r) //Find max sum that includes left and right side
  return Math.max (crossingSum, leftSum, rightSum) //return whichever is largest
}

var findCrossingSum = function(nums, l, mid, r) { 
  //A crossing sum exists on the left side and right side
  // so if we count mid as on the left side, the crossing sum MUST
  // include nums[mid] and nums[mid+1]. From these starting points we search for the max sum
  let sum=0
  let maxLSum = -Infinity
  for(let i = mid; i >= l; i--) {
      sum += nums[i]
      maxLSum = Math.max(maxLSum, sum)
  }
  sum =0
  let maxRSum = -Infinity
  for (let i = mid + 1; i <= r; i++) {
      sum += nums[i]
      maxRSum = Math.max(maxRSum, sum)
  }
  
  return maxRSum + maxLSum
}

 