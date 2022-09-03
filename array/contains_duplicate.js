/* 

Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

Input: nums = [1,2,3,1]
Output: true

Input: nums = [1,2,3,4]
Output: false

*/ 


/* 
  example 1 
*/ 

var containsDuplicate = function(nums) {
  const noDups = new Set(nums);
    
  // nums.length !== # of unique elements in set 
  if (nums.length !== noDups.size) {
    return true;
  } else {
    return false;
  }
};


console.log(hasDuplicates([1, 2, 3, 4, 5]));



/**
 * @param {number[]} nums
 * @return {boolean}
 * 
 * 
 *   Runtime: 76 ms, faster than 80.84% of JavaScript online submissions for Contains Duplicate.
 *   Memory Usage: 40 MB, less than 100.00% of JavaScript online submissions for Contains Duplicate.
 */

var hasDuplicates = function(nums) {
    let set = new Set(nums);
    return (set.size < nums.length);
};


/* 
  slower, but shorter 

  by default, Sets don't allow duplicates 
*/ 
var hasDuplicates = function(nums) {
  return new Set(nums).size < nums.length; 
};

/* 
  approach #1: brute force looping through and checking if item has duplicates  == o(n2)
  approach #2: sort input, and then you know duplicates are adjacent
    - iterate 1x and compare 2 neighbors to check if they're duplicates
    time: o(nnlog) (sorting)
    space: o(1)

    can tradeoff space and memory complexity 

  approach #3: hashmap to check if item is already in the array 
        time: o(n)
        space: o(n)

  
*/ 
