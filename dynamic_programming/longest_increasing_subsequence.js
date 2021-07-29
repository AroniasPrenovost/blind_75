/* 

Given an integer array nums, return the length of the longest strictly increasing subsequence.

A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].

 

Example 1:

    Input: nums = [10,9,2,5,3,7,101,18]
    Output: 4
    Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

    
    
    
Example 2:

    Input: nums = [0,1,0,3,2,3]
    Output: 4






Example 3:

    Input: nums = [7,7,7,7,7,7,7]
    Output: 1
 



Constraints:

  1 <= nums.length <= 2500
  -104 <= nums[i] <= 104
  

  Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?

*/ 


/* 

  approach #1 - brute force 
 

  Didn't see JS Patience Sorting, so here it is. Explanation from this youtube video (thanks to Solution thread for the link, not my video)
  https://www.youtube.com/watch?v=22s1xxRvy28

 
  start stacks of descending values left to right
  always stack when possible, stack count is LIS

  Runtime: 72 ms, faster than 99.75% of JavaScript online submissions for Longest Increasing Subsequence.
  Memory Usage: 40.3 MB, less than 33.52% of JavaScript online submissions for Longest Increasing Subsequence .

*/ 
  
var lengthOfLIS = function(nums) {
  //   start stacks of descending values left to right
  //   always stack when possible, stack count is LIS

  if (!nums.length) return 0

  let stacks = []
  stacks[0] = nums[0]

  for (let i = 1; i < nums.length; ++i) {
    for (let j = 0; j < stacks.length; ++j) {
      if (nums[i] <= stacks[j]) {
        stacks[j] = nums[i]
        break;
      }
      if (j === stacks.length - 1) stacks.push(nums[i])
    } 
  }
  return stacks.length
};



/* 

  approach #2 - recursion with memoization 


  why not use 'const memo = {}' instead of 'const memo = new Array(nums.length + 1).fill(-1).map(row => new Array(nums.length).fill(-1))'? 

  - 'const memo = {}' is constantly growing 
  - other option is allocated at once - this avoids slow growing and copying of data in memory with memory increase.
    in fact, when you know its going to be 100 then you allocate 100, this way it is optimized.
    similarly here (len+1* len) is required, so you allocated at once - making this faster.
    DP with memo takes a lot of memory, so its better to allocate at once when you can


    time:  n^2

*/ 


var lengthOfLIS = function(nums) {
  const memo = new Array(nums.length + 1).fill(-1).map(row => new Array(nums.length).fill(-1))
  return getLengthOfLIS(nums, -1, 0, memo)
};

function getLengthOfLIS(nums, prevIdx ,currentIndex, memo) {
  if(currentIndex >= nums.length) return 0
  
  let taken = 0
  if(memo[prevIdx + 1][currentIndex] >= 0) return memo[prevIdx  + 1][currentIndex]

  if(prevIdx < 0 || nums[prevIdx] < nums[currentIndex] ) {
      taken = 1 + getLengthOfLIS(nums, currentIndex, currentIndex+1, memo)
  }
  let notTaken = getLengthOfLIS(nums, prevIdx, currentIndex+1, memo)
  memo[prevIdx + 1][currentIndex] = Math.max(taken, notTaken)
  return  memo[prevIdx + 1][currentIndex]
}


/* 

  approach #3 - dynamic programming 

*/ 


var lengthOfLIS = function(nums) {
  if (nums === null || nums.length === 0) {
      return 0;
  }
  let dp = new Array(nums.length); // dp[i] is the length of longest increasing subsequence "ending" at index i
  dp[0] = 1;
  for (let i = 1; i < nums.length; i++) {
      let maxLen = 1;
      for (let j = 0; j < i; j++) {
          if (nums[j] < nums[i]) {
              maxLen = Math.max(maxLen, dp[j] + 1);
          }
      }
      dp[i] = maxLen;
  }
  return Math.max(...dp);
  // T.C: O(N^2)
  // S.C: O(N)
};



/* v.2 */


const lengthOfLIS = (nums) => {
  if(!nums || nums.length === 0) {
      return 0;
  }
  const dp = Array(nums.length).fill(1);
  dp[0] = 1;
  let totalMax = 1;
  for(let i = 1; i < nums.length; i++ ) {
      for(let j = 0; j < i; j++) {
          if( nums[i] > nums[j]) {
              dp[i] = Math.max(dp[j] + 1, dp[i]);
          }
      }
      totalMax = Math.max(totalMax, dp[i]);
  }
  return totalMax;
};

/*     */ 


var lengthOfLIS = function(nums) {
  if (!nums.length)
      return 0
  let res = new Array(nums.length).fill(1); 
  let glbMax = 1; 

  for (let i = 1; i < nums.length; i++) {
      let max = 1
      for (let j = 0; j < i; j++) {
          if (nums[i] > nums[j])
              max = Math.max(max, res[j] + 1)
      }
      res[i] = max
      glbMax = Math.max(max, glbMax)
  }
  return glbMax
};


/* v.3 

  O^2

*/ 

function lengthOfLIS(nums) {
	var lis = [];
	for (var i = 0; i < nums.length; i++) {
		lis.push(1);
		for (var j = 0; j < i; j++) {
			if (nums[j] < nums[i]) lis[i] = Math.max(lis[i], lis[j] + 1);
		}
	}
	return nums.length ? Math.max.apply(null, lis) : 0;
}






/* v.4 */ 

var lengthOfLIS = function(nums) {
  if (nums.length == 0) return 0;
  let dp = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
      for (let j = i-1; j >= 0; j--) {
          if (nums[j] < nums[i]) {
              dp[i] = Math.max(dp[i], dp[j] + 1);
          }
      }
  }
  return Math.max(...dp);
  // Time Complexity: O(n^2)
  // Space Complexity: O(n)
};

// dp[i] represents the length of longest increasing subsequence in nums[0..i] that includes nums[i]
// I will initialise every element in dp with 1 because every number is a subsequence of length 1 itself
// We scan through the array and for each number, we scan through all elements in its left and if we find a smaller number, it means that our current number can be chained to this smaller number's subsequence. So, every time we find a smaller number, we update dp[i] to the maximum length.





/* 

  approach # 4 - dynamic programming with binary search 

*/ 

/**
 * @param {number[]} nums
 * @return {number}
 */
 var lengthOfLIS = function(nums) {
  const binarySearchPosition = (dp, target, hi) => {
      let lo = 0;
      while (lo <= hi) {
          let mid = Math.floor((lo+hi)/2);
          if (target === dp[mid]) return mid;
          else if (target < dp[mid]) hi = mid-1;
          else lo = mid+1;
      }
      return lo;
  }
  
  if (nums === null || nums.length===0) return 0;
  if (nums.length === 1) return 1;
  let dp = new Array(nums.length).fill(Number.MAX_SAFE_INTEGER);
  for (let i=0; i<nums.length; i++){
      let pos = binarySearchPosition(dp, nums[i], i);
      dp[pos] = nums[i];
  }

  for (let i = dp.length-1; i >= 0; i--){
      if (dp[i] !== Number.MAX_SAFE_INTEGER) return i+1;
  }
  
  return 0;
};


/*    
    
  O(nlog(n)) 

*/ 

function insertLIS(lis, n) {
  const len = lis.length;
  if (len < 1 || n > lis[len - 1]) {
    return lis.push(n);
  }
  if (n < lis[0] && len === 1) {
    return lis[0] = n;
  }
  if (n < lis[0] && len > 1) {
    return;
  }
  
  let left = 0;
  let right = len - 1;
  while (left <= right) {
    let mid = Math.ceil((left + right) / 2);
    if (n > lis[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  lis[left] = n;
}
/**
 * @param {number[]} nums
 * @return {number}
 */
 var lengthOfLIS = function(nums) {
  const lis = [];
  for (let n of nums) {
    insertLIS(lis, n);
  }
  return lis.length;
};



/* binary search */ 

var lengthOfLIS = function(nums) {
  var n = nums.length;
  if (!n) return 0;
  var len = 1;
  var dp = [nums[0]];
  for (var i = 1; i < n; i++) {
      if (dp[len - 1] < nums[i]) {
          dp[len++] = nums[i];
      } else {
          var left = 0, right = len - 1, num = nums[i];
          while (left < right) {
              var mid = left + Math.floor((right - left) / 2);
              if (dp[mid] < num) left = mid + 1;
              else right = mid;
          }
          dp[right] = num;
      }
  }
  return len;
};