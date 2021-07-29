/* 

  Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

  You must write an algorithm that runs in O(n) time.


  Example 1:

      Input: nums = [100,4,200,1,3,2]
      Output: 4
      Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.


  Example 2:

      Input: nums = [0,3,7,2,5,8,4,6,0,1]
      Output: 9
  

  Constraints:

    0 <= nums.length <= 105
    -109 <= nums[i] <= 109


*/ 



/* 

  honorable mention: Kadane's sorting algorithm   [ exceeds time limit ]


*/ 

var longestConsecutive = function (nums) {
  if (nums.length < 1) return 0;
  nums = nums.sort((a, b) => a - b);
  let currentMax = [nums[0]];
  let final = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    let lastNum = currentMax[currentMax.length - 1];
    if (nums[i] === lastNum + 1) {
      currentMax = [...currentMax, nums[i]];
    } else if (nums[i] === lastNum) {
      continue;
    } else {
      currentMax = [nums[i]];
    }
    if (currentMax.length > final.length) {
      final = currentMax;
    }
  }
  return final.length;
};

console.log(longestConsecutive([100,4,200,1,3,2])); // 4 




/* 


  approach #1 - brute force 
  
  Time: O(n^3)
  Space: O(1)

*/ 

const longestConsecutive = (nums) => {
  let maxLength = 0;
  for (let num of nums) {
    let length = 1;
    while (nums.includes(num + length)) length++; // Build up the length as we find the next consecutive num
    maxLength = Math.max(maxLength, length); // Update max
  }
  return maxLength;
};








/* 


  approach #2 - sorting 


*/ 










/* 


  approach #3 - hashset and intelligent sequence building 


  Time: O(n)
  Space: O(n)

*/ 




var longestConsecutive = function(nums) {
  const numSet = new Set(nums);
  let maxLen = 0;
  
  for(let n of numSet) {
      if(numSet.has(n-1)) continue;
      let len = 1;
      while(numSet.has(n+len)) len++;
      maxLen = Math.max(maxLen, len);
  }
  return maxLen;
};


/* v.2 */ 


var longestConsecutive = function(nums) {
    
  let longest = 0;
  
  /* ES5, a bit faster

  let numSet = {};
  
  for(let i = 0; i < nums.length; i++){
      numSet[nums[i]] = true;
  }
  */
  
 let numSet = new Set(nums); 

  for(let i = 0; i < nums.length; i++){
      let shift = 1;
      // ES5: .hasOwnProperty instead of .has
      while(numSet.has(nums[i] + shift)) shift++;
      longest = Math.max(shift, longest);
  }

  return longest;
};





/* v.2 */ 



const longestConsecutive = (nums) => {
  let maxLength = 0;
  let set = new Set(nums); //Intialize set with nums array

  for (let num of nums) {
    if (set.has(num - 1)) continue; // Not the start of a new consecutive list, so skip.
    let length = 1;
    while (set.has(num + length)) length++; // Build up the length as we find the next consecutive num
    maxLength = Math.max(length, maxLength); // Update max
  }

  return maxLength;
};



/* v.3 */



function longestConsecutive(nums) {
  if (nums == null || nums.length === 0) return 0;
  
  const set = new Set(nums);
  let max = 0;

  for (let num of set) {
    if (set.has(num - 1)) continue;  // make sure starting from the beginning of sequence

    let currNum = num;
    let currMax = 1;

    while (set.has(currNum + 1)) {
      currNum++;
      currMax++;
    }
    max = Math.max(max, currMax);
  }

  return max;
}

/* v.4 */ 

var longestConsecutive = function(nums) {
  const set = new Set(nums);
  let i = 0,
      maxLen = 0,
      len = 1;
  
  set.forEach(num => {
      if(!set.has(num - 1)) {
          len = 1;
          while(set.has(num + len)) {
              ++len;
          }
          maxLen = Math.max(maxLen, len);
      }
  })
  return maxLen;
}
 