/* 

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
 
https://leetcode.com/problems/two-sum/discuss/722895/JavaScript-solution-explained%3A-3-ways-to-solve-the-problem



*/ 

/*
  Approach 1: Brute Force
*/

var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return [i, j]
            }
        }
    }
};

/*
  Approach 2: Two-pass Hash Table (JS object)
*/

var twoSum = function(nums, target) {
    const indices = {};

    nums.forEach((item, index) => {
        indices[item] = index
    });

    for (let index = 0; index < nums.length; index++) {
        const complement = target - nums[index];

        if (indices[complement] !== undefined && indices[complement] !== index) {
            return [index, indices[complement]]
        }
    }
};

/* 
  Approach 3.1: One-pass Hash Table
*/ 

var twoSum = function(nums, target) {
  const indices = new Map();

  for (let index = 0; index < nums.length; index++) {
      const complement = target - nums[index];

      if (indices.has(complement)) {
          return [indices.get(complement), index]
      }

      indices.set(nums[index], index)
  }
};

// approach #3.2 
// since we're only iterating once
// and only adding to it (constant time)
// time + memory complexity is o(n)
  // time: single loop 
  // space: could use entire hashmap 
  
var twoSum = function(nums, target) {
  const indices = new Map();

  for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];

      if (indices.has(complement)) {
          return [indices.get(complement), i]
      }

      indices.set(nums[i], i)
  }
};

    console.log(twoSum([1, 2, 3, 5, 5, 6, 3], 9))


//twoSum([2,7,11,15], 9); // [0, 1]



/*

another example - hash table with object 

*/ 

var twoSum = function(nums, target) {
  //hash table
  var hash = {};

  for(let i=0; i<=nums.length; i++){
    //current number
      var currentNumber = nums[i];
      //difference in the target and current number
      var requiredNumber = target - currentNumber;
      // find the difference number from hashTable
      const index2 = hash[requiredNumber];

      // if number found, return index 
      // it will return undefined if not found
      if(index2 != undefined) {
          return [index2, i]
      } else {
         // if not number found, we add the number into the hashTable
          hash[currentNumber] = i;

      }
  }
}
  twoSum([2,11,7,15], 9); // [0, 2]

