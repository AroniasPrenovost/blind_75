/* 

  Given an array of non-negative integers nums, you are initially positioned at the first index of the array.

  Each element in the array represents your maximum jump length at that position.

  Determine if you are able to reach the last index.


  Example 1:

      Input: nums = [2,3,1,1,4]
      Output: true
      Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.


  Example 2:

      Input: nums = [3,2,1,0,4]
      Output: false
      Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
      

  Constraints:

    1 <= nums.length <= 104
    0 <= nums[i] <= 105

*/ 



/* 

  approach #1 - backtracking 

*/ 


var canJump = function(nums) {
    
  let dp = Array(nums.length ).fill(false)
  dp[0] = true
  
  for(let i = 0; i < nums.length; i++) {
      if(dp[i]  === true) {
         for(let j = 0; j <= nums[i]; j++) {
            if(i + j < nums.length) {
              dp[i + j] =  true
             }  
         }
      }
  }
  
  return dp[dp.length-1]
};





/* 

  approach #2 - dynamic programming top-down 

*/ 

/* 

  We will store in the variable max - the maximum index of the array, where we could get at the i-th step.
  Initially, the value max = 0
  We go through all the elements of the array and get the value where we could get: i + nums [i]

  If i> max means we cannot get into this element of the array => return false
  If from this point we can get to the last element of the array i + nums [i]> length - 1 => return true
  Update maximum max(max, i + nums[I])

*/ 
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let max = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > max) return false;
        
        if (i + nums[i] >= nums.length - 1) return true;
            
        max = Math.max(max, i + nums[i]);
    }
};


/* 

  approach #3 - dynamic programming bottom-up 

*/ 









/* 

  approach #4 - greedy 

  time: O(n)
  space: O(1)



  if length of nums is less than equal to 1 then we have reached the end
  Set currentReachableMax Index to nums[0]
  Iterate from 1 to end
  If current index is not inside currentReachableMax then return false
  If currentReachableMax is >= last Index(destination) then return true
  Else Calculate currentReachableMax as max of (maxReach from i) and currentReachableMax

  /**
 * @param {number[]} nums
 * @return {boolean}
 */

var canJump = function(nums) {
    if(nums && nums.length <=1){
        return true;
    }
    let curMax = nums[0];
    for(let i=1;i<nums.length;i++){
        if(i> curMax){
            return false;
        }
        
        if(curMax >= nums.length -1){
            return true;
        }
        
        curMax = Math.max(nums[i]+i, curMax);
    }
    
};

/* 

  From end to begin, save every step could reach the desination, and then see its predecessor

*/ 

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
	if(nums.length === 0) return false
	let reachable = nums.length -1
	for(let i = nums.length -1; i>=0; --i){
		if(nums[i] + i >= reachable) reachable = i
	}

	return reachable === 0
};


/* */ 


var canJump = function(nums) {
  if(nums.length === 1) return true
  var maxLen = 0;
  for(var i = 0; i <= maxLen; i++) {
      maxLen = Math.max(maxLen, i + nums[i]);
      if(maxLen >= nums.length - 1) {
          return true;
      }
  }
  return false;
};


/* v.3 */ 
const canJump = (nums) => {
  let max = 0; // The maximum index we can reach
  for (const [i, maxJumpLen] of nums.entries()) {
    if (max < i) return false; // Unable to reach the current index
    max = Math.max(max, i + maxJumpLen); // Update the furthest idx we can currently reach
  }
  return true;
};

/* 

  intuitive / greedy explained

  Both solution above are with time complexity O(N) and Space complexity O(1) which N is the length of the given nums

*/ 

// Maintain an interval that we can reach and expand the interval step by step. Once a starting point i can't be reach, you can't reach the last index.
let canJump = function(nums) {
    let canReach = [0, 0] // closed interval
    for(let i = 0; i < nums.length; i++) {
        // once position `i` can not be reach
        if(i < canReach[0] || i > canReach[1]) {
            return false
        }
        // union two intervals
        canReach[0] = Math.min(canReach[0], i)
        canReach[1] = Math.max(canReach[1], i + nums[i])
    }
    return true
}

// Since the lower bound of the canReach interval will always fullfilled the condition, we can remove it.
let canJump = function(nums) {
    let maxCanReach = 0
    for(let i = 0; i < nums.length; i++) {
        if(i > maxCanReach) {
            return false
        }
        maxCanReach = Math.max(maxCanReach, i + nums[i])
    }
    return true
}






/* 3 JS solutions */

/* 1 */ 
var canJump = function(nums) {
  return jump(nums, 0);
// T.C: Very bad.. please comment if you can suggest a proper figure
// S.C: Very bad.. please comment if you can suggest a proper figure
};

const jump = (nums, idx, memo=new Map()) => {
  if (idx === nums.length-1) {
      return true;
  }
  if (memo.has(idx)) {
      return memo.get(idx);
  }
  let possible = false;
  for (let i = 1; i <= nums[idx]; i++) {
      let res = jump(nums, idx + i, memo);
      if (res) {
          possible = true;
          break;
      }
  }
  memo.set(idx, possible);
  return possible;
}

/* 2 */ 
var canJump = function(nums) {
  // dp[i] tells whether or not it is possible to reach end of array from i
  let dp = new Array(nums.length).fill(false);
  dp[dp.length-1] = true;
  for (let i = dp.length-2; i >= 0; i--) {
      let jumps = nums[i], possible = false;
      for (let j = 1; j <= jumps; j++) {
          if (i+j >= dp.length) {
              break;
          }
          if (dp[i+j]) {
              possible = true;
              break;
          }
      }
      dp[i] = possible;
  }
  return dp[0];
  // T.C: O(N^2)
  // S.C: O(N)
};

/* 3 */ 
var canJump = function(nums) {
  // validIdx tells the index from which we can go to end of array
  let validIdx = nums.length - 1;
  for (let i = nums.length - 2; i >= 0; i--) {
      let jumps = nums[i];
      if (i + jumps >= validIdx) {
          validIdx = i;
      }
  }
  return validIdx === 0;
  // T.C: O(N)
  // S.C: O(1)
};

