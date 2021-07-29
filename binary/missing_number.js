/* 

Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

Follow up: Could you implement a solution using only O(1) extra space complexity and O(n) runtime complexity?

 

Example 1:

Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.
Example 2:

Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.
Example 3:

Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.
Example 4:

Input: nums = [0]
Output: 1
Explanation: n = 1 since there is 1 number, so all numbers are in the range [0,1]. 1 is the missing number in the range since it does not appear in nums.
 

Constraints:

n == nums.length
1 <= n <= 104
0 <= nums[i] <= n
All the numbers of nums are unique.

*/ 


/* 


  Example #1 - bitwise operators
  
  Runtime: 88 ms, faster than 70.59% of JavaScript online submissions for Missing Number.
  Memory Usage: 40.1 MB, less than 99.15% of JavaScript online submissions for Missing Number.

  if you xor 2 same numbers, it will always return in a 0.
  if you xor any number other than 0 with 0, it will always return in that number.

*/


var missingNumber = function(nums) {
    let missingNum = 0;
    for(let i = 0; i < nums.length + 1; i++){
        missingNum ^= i;
        if(i < nums.length){
            missingNum ^= nums[i];
        }
    }
    return missingNum;
};


/* 

  Example #2 - no bitwise, probably easier to understand 

  Runtime: 80 ms, faster than 92.70% of JavaScript online submissions for Missing Number.
  Memory Usage: 41.4 MB, less than 27.31% of JavaScript online submissions for Missing Number.

*/


var missingNumber = function(nums) {
  
  let numsLen = nums.length;
  let expectedSum = 0;
  let actualSum = 0;

  for (let i = 0; i < numsLen; i++) {
    expectedSum += i + 1;
    actualSum += nums[i];
  }

  return expectedSum - actualSum;
};


/* 

  Example #3 

  Runtime: 92 ms, faster than 58.49% of JavaScript online submissions for Missing Number.
  Memory Usage: 41 MB, less than 57.97% of JavaScript online submissions for Missing Number.

*/

var missingNumber = function(nums) {

  if(!nums) return;
  let tempArray = new Array(nums.length+1).fill(-1);
  for (let num of nums) {
    tempArray[num] = num;
  }
  return tempArray.indexOf(-1);

};