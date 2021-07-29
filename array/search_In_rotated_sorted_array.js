/* 

  INTUITION: 
    When you divide the rotated array into two halves, using mid index, at least one of them should remain sorted ALWAYS.


  There is an integer array nums sorted in ascending order (with distinct values).

  Prior to being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

  Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

  You must write an algorithm with O(log n) runtime complexity.

  Example 1:

    Input: nums = [4,5,6,7,0,1,2], target = 0
    Output: 4
 
  Example 2:

    Input: nums = [4,5,6,7,0,1,2], target = 3
    Output: -1
  
  Example 3:

    Input: nums = [1], target = 0
    Output: -1
  

  Constraints:

  1 <= nums.length <= 5000
  -104 <= nums[i] <= 104
  All values of nums are unique.
  nums is guaranteed to be rotated at some pivot.
  -104 <= target <= 104

*/ 


/* 

  approach #1 - binary search (2 pass )


*/ 

/* v.1 

 
    @param {number[]} nums
    @param {number} target
    @return {number}

    Time: O(log n) where n - # of items in the array
      if there are duplicates in worst case, the run time would be O(n)

    Space: O(log n) for stack of recursive calls

 */

 var search = function(nums, target) {
  return searchR(nums, 0, nums.length - 1, target);    
};

// modified binary search
var searchR = function(n, left, right, target) {  
  if (left > right) {
      return -1;
  }    
  
  let middle = Math.floor((left + right) / 2);
      
  if (n[middle] === target) {
      return middle;
  }
  
  // check if left array is in order
  if (n[left] < n[middle]) { // left is in order
      // determine if search should be on the left right or right side
      if (n[left] <= target && target < n[middle]) {
          return searchR(n, left, middle - 1, target); // search left
      } else {
          return searchR(n, middle + 1, right, target); // search right
      }
  } else if (n[right] > n[middle]) { // right is in order
      if (n[middle] < target && target <= n[right]) {
          return searchR(n, middle + 1, right, target); // search right
      } else {
          return searchR(n, left, middle - 1, target); // search left
      }
  } else {
      let location = -1;
      // to handle duplicates
      if (n[left] === n[middle]) {
          location = searchR(n, middle + 1, right, target); // search right
      }
      
      if (location !== -1 && n[right] === n[middle]) {
          location = search(n, left, middle - 1, target); // search left
      }
      
      return location;
  }
};


/* v.2  



Find the Pivot
Find the pivot where the array is rotated at via binary search
Divide the arrray with pivot, and find target via binary search on each part.
  
  Time Complexity: O(log n)
  Space Complexity: O(1)
  

*/

var search = function(nums, target) {
    let lo = 0, hi = nums.length - 1, pivot = 0;
    while (lo <= hi) {
        pivot = lo + parseInt((hi - lo) / 2);
        if (nums[pivot+1] < nums[pivot]) {
            break;
        }
        if (nums[pivot] < nums[lo]) {
            hi = pivot -1;
        } else {
            lo = pivot + 1;
        }
    }
    const a = binarySearch(0, pivot), b = binarySearch(pivot + 1, nums.length);
    return 0 <= a ? a : b;
    
    function binarySearch(lo, hi) {
        while (lo < hi) {
            const mid = lo + parseInt((hi - lo) / 2);
            if (nums[mid] === target) {
                return mid;
            }
            if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return nums[hi] === target ? hi : -1;
    }
};


 

/* 

  ****
  approach #2 - 1 pass Binary Search
  Add some condition which is comparing value at low/high index with value of middle index.

    Time Complexity: O(log n)
    Space Complexity: O(1)
 
  @param {number[]} nums
  @param {number} target
  @return {number}
 */
var search = function(nums, target) {
    let lo = 0;
    let hi = nums.length - 1;
    while (lo <= hi) {
        const mid = lo + parseInt((hi - lo) / 2);
        if (nums[mid] === target) {
            return mid;
        }
        if (nums[lo] <= nums[mid]) {
            if (nums[lo] <= target && target < nums[mid]) {
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        } else {
            if (target <= nums[hi] && nums[mid] < target) {
                lo = mid + 1;
            }
            else {
                hi = mid - 1;
            }
        }
    }
    return -1;
};
 
/* v.2 */

var search = function(nums, target) {
  if (nums == null || nums.length === 0) return -1; 

  let l = 0,
    r = nums.length - 1;

  while (l < r) {
    let m = Math.floor((l + r) / 2);
    if (nums[r] < nums[m]) l = m + 1;
    else r = m;
  }

  let start = l;
  l = 0;
  r = nums.length - 1;


  if (target >= nums[start] && target <= nums[r]) {
    l = start;
  } else {
    r = start;
  }

  while (l <= r) {
    let m = Math.floor((l + r) / 2);
    if (nums[m] === target) {
        return m;
    } else if (nums[m] < target) {
        l = m  + 1;
    } else {
        r = m - 1;
    }
  }

  return -1;
};


/* v.3 

  We have two sorted subarrays in given array.

  We can use binary search to find the target value.
  To do so, we do the general binary search with an extra behaviour.
  That is, whenever we're in a wrong subarray (subarray where target number doesn't exist),
  we should try to move towards the correct subarray. 

  How do we figure out if we are in the correct subarray? 
  The last value of given array is the maximum value of second sorted subarray.
  Therefore, if our target is smaller than or equal to that value, we should try to
  go to second sorted subarray. If our target is greater than that value, we should try to
  go to first sorted subarray.

*/
var search = function(nums, target) {
  if (nums === null || nums.length === 0) {
      return -1;
  }

  let low = 0, high = nums.length - 1;
  let lastVal = nums[nums.length-1];
  
  while (low <= high) {
      let mid = low + Math.floor((high - low) / 2);
      let inCorrectSubarr = (nums[mid] <= lastVal && target <= lastVal) || 
          (nums[mid] > lastVal && target > lastVal);
      if (nums[mid] > target) {
          inCorrectSubarr ? high = mid-1 : low = mid+1;
      } else if (nums[mid] < target) {
          inCorrectSubarr ? low = mid+1 : high = mid-1;
      } else {
          return mid;
      }
  }

  return -1;
  // T.C: O(log(N))
  // S.C: O(1)
};



/* v.4 */ 


var search = function(nums, target) {
  let start = 0;
  let end = nums.length -1;
  let min = 0 // index of the minimum value
  let mid;
  
  // find index of the min value
  while(start <= end) {
      mid = ~~((start+end)/2);
      if(nums[mid] < nums[min]) min = mid;
      else if(nums[mid] > nums[end]) start = mid+1;
      else end = mid-1;
  }
  
  if(target < nums[0]) {
      start = min;
      end = nums.length-1;
  } else {
      start = 0;
      // if min = 0 set end to last index b/c the array is sorted.
      end = min || nums.length-1;
  }
  
  while(start <= end) {
      mid = ~~((start+end)/2);
      if(nums[mid] === target) return mid;
      if(nums[mid] > target) end = mid-1;
      else start = mid+1;
  }
  return -1;
};



/* v.5 */ 

var search = function(nums, target) {
  let l = 0
  let r = nums.length -1
  while (l <= r) {
      let mid = Math.floor((r - l) / 2 + l)
      if (nums[mid] === target) return mid
      if (nums[l] <= nums[mid]) {
          // left sorted
          if (target >= nums[l] && target < nums[mid]) {
              // target in sorted
              r = mid - 1                
          } else {
              // target in unsorted
              l = mid + 1
          }
      } else {
          // right sorted
          if (target <= nums[r] && target > nums[mid]) {
              // target in sorted
              l = mid + 1
          } else {
              // target in unsorted
              r = mid - 1
          }            
      }
  }
  return -1
};

/* v.6 */ 

var search = function(nums, target) {
  let start = 0, end = nums.length - 1;
  while(start < end){
      let mid = Math.floor((start+end) / 2);
      if(nums[mid] === target) return mid;
      else if(nums[start] <= nums[mid]) {
          if(target >= nums[start] && target <= nums[mid]) {
              end = mid - 1;
          }
          else{
              start = mid + 1;
          }
      }
      else{
          if(target >= nums[mid] && target <= nums[end]) start = mid + 1;
          else end = mid - 1;
      }
      
  }
  return nums[end] === target ? end : -1;
};



/* another good explanation 


    Let's take some examples and see how we can simplify the condition.

    Original sorted array
    [1, 2, 3, 4, 5, 6, 7]

    After rotation, it might be something like
    [3, 4, 5, 6, 7, 1, 2]
    [6, 7, 1, 2, 3, 4, 5]
    [1, 2, 3, 4, 5, 6, 7] <-- rotated and end up the same
    and etc..

    When you divide the rotated array into two halves, using mid index, at least one of subarray should remain sorted ALWAYS.

    [3, 4, 5, 6, 7, 1, 2]
    -> [3, 4, 5] [ 6, 7, 1, 2]
    the left side remains sorted

    [6, 7, 1, 2, 3, 4, 5]
    -> [6, 7, 1] [2, 3, 4, 5]
    the right side remains sorted

    [1, 2, 3, 4, 5, 6, 7]
    -> [1, 2, 3] [4, 5, 6, 7]
    Both sides remain sorted.

    If you know one side is sorted, the rest of logic becomes very simple.
    If one side is sorted, check if the target is in the boundary, otherwise it's on the other side.

    IF smallest <= target <= biggest
      then target is here
    ELSE
      then target is on the other side
 
*/

var search = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
    
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) {
      return mid;
    }
    
    // When dividing the roated array into two halves, one must be sorted.
    
    // Check if the left side is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target <= nums[mid]) {
        // target is in the left
        right = mid - 1;
        
      } else {
        // target is in the right
        left = mid + 1;
      }
    } 
    
    // Otherwise, the right side is sorted
    else {
      if (nums[mid] <= target && target <= nums[right]) {
        // target is in the right
        left = mid + 1;

      } else {
        // target is in the left
        right = mid - 1;
      }
    }
  }
    
  return -1;
};




/* v.7 example */ 

const search = (nums, target) => {
  let low = 0
  let high = nums.length - 1
  
  while (low <= high) {
      const mid = low + Math.floor((high - low) / 2)
      if (target === nums[mid]) return mid
      
      // Rotated binary search
      if (nums[low] > nums[high]) {
          // The max is on the left
          if (nums[mid] < nums[low]) {
              // The target is on the right
              if (target > nums[mid] && target < nums[low]) {
                  low = mid + 1
              // The target is on the left
              } else {
                  high = mid - 1
              }
          // The max is on the right
          } else {
              // The target is on the left
              if (target < nums[mid] && target > nums[high]) {
                  high = mid - 1
              // The target is on the right
              } else {
                  low = mid + 1
              }
          }
      // Standard binary search
      } else if (target < nums[mid]) {
          high = mid - 1
      } else {
          low = mid + 1
      }
  }
  
  return -1
};