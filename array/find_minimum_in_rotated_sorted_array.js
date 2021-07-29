/*

  Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

  [4,5,6,7,0,1,2] if it was rotated 4 times.
  [0,1,2,4,5,6,7] if it was rotated 7 times.
  Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

  Given the sorted rotated array nums of unique elements, return the minimum element of this array.

  You must write an algorithm that runs in O(log n) time.  



  Example 1:

    Input: nums = [3,4,5,1,2]
    Output: 1
    Explanation: The original array was [1,2,3,4,5] rotated 3 times.
  
  


  Example 2:

    Input: nums = [4,5,6,7,0,1,2]
    Output: 0
    Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
  
  
  


  Example 3:

    Input: nums = [11,13,15,17]
    Output: 11
    Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 
  

  Constraints:

  n == nums.length
  1 <= n <= 5000
  -5000 <= nums[i] <= 5000
  All the integers of nums are unique.
  nums is sorted and rotated between 1 and n times.

*/ 



/* 

  approach #1 - binary search 


  Output: num (min)
  Input: array (nums)
  Constraints: O(log n) time
  Edge Cases: array is fully/not rotated, 1-length arrays

  Approach:

    Track left pointer
    Track right pointer
    While left pointer < right pointer:
      a) Get the midpoint between left and right
      b) If num at mid is greater than num at right pointer, increment left pointer because that means the break is at or after right pointer ( we haven't reached it yet)
      c) Otherwise, move right pointer to mid
    Return num at left pointer
    
    Time Complexity: O(log n) because we're often slicing the search space in half on each iteration.

*/ 

/* v.1 */ 

var findMin = function(nums) {
    let leftPointer = 0;                 // track left pointer
    let rightPointer = nums.length - 1;  // track right pointer 
    while (leftPointer < rightPointer) { // keep going until the pointers converge
        const midPointer = Math.floor((leftPointer + rightPointer) / 2); 
        const [leftNumber, midNumber, rightNumber] = [nums[leftPointer], nums[midPointer], nums[rightPointer]];
        if (midNumber > rightNumber) {
            leftPointer += 1;
        } else {
            rightPointer = midPointer;
        }
    }
    return nums[leftPointer];
};


/* v.2 

  Time: O(logN)
  Space: O(1)

*/

var findMin = function(nums) {
  let left = 0, right = nums.length-1;
  
  while(left < right) {
      const mid = Math.floor((left+right)/2);
      if(nums[mid] > nums[right]) left = mid+1;
      else right = mid;
  }
  return nums[left];
}



/* v.3 */

var findMin = function(nums) {
  let left = 0;
  let right = nums.length -1;
  if(nums.length === 1){
      return nums[0];
  }
  
  if(nums[left] < nums[right]){
      return nums[left];
  }
  
  while(left <= right){
      let mid = Math.floor((left + right)/2);
      if(nums[mid] > nums[mid+1]){
          return nums[mid+1];
      }else if(nums[mid-1] > nums[mid]){
          return nums[mid];
      }
      
      if(nums[mid] > nums[left]){
          left = mid+1;
      }else{
          right = mid-1;
      }
  }
}




/* v.4 */ 

var findMin = function(nums) {
  if (!nums || nums.length == 0) return new Error("illegal input");
  let low = 0;
  let high = nums.length - 1;
  let min = Infinity;
  if (nums[0] <= nums[nums.length-1]) return nums[0]; //ascending order
  while (low < high){
      let mid = Math.floor((low + high) / 2);
      if (nums[high] >= nums[mid]) high = mid;    //mid close to min
      else low = mid + 1;  //high close to min
  }
  return nums[low]; //set low as min
}





/* v.5 */ 

var findMin = function(nums) {
  nums.sort(function(val1, val2) {
      return val1>val2?1:val1<val2?-1:0;
  });
  return nums[0];
}





/* v.6 */ 

var findMin = function(nums) {
  let left = 0;
  let right = nums.length - 1;
  // the goal is to use `left` to point at the minimn number    
  while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] > nums[right]) {
        left = mid + 1;
      } else {
        right = mid;
      }
  }

  return nums[left];
};





/* v.7 */ 

var findMin = function(nums) {
  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] > nums[r]) l = m + 1;
    else r = m;
  }
  return nums[l];
}

/* v.8 */ 

var findMin = function(nums) {
    
  let start = 0, end = nums.length-1;
  
  // In case of sorted input
  if(nums[start] < nums[end]) {
    return nums[start];
  }
  
  
  // In case of unsorted input
  while(end-start > 1){

    let mid = Math.floor((start+end) / 2);

    if(nums[start] > nums[mid]) {
      end = mid;
    } else {
      start = mid;
    }
  }
  
  return nums[end];
  
};