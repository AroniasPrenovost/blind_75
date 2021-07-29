/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
	// sort the array in ascending order so that we can use two-pointers approach
    nums.sort((a, b) => parseInt(a) - parseInt(b));
    
    const len = nums.length,
          target = 0,
          result = [];

    let left, right;

	// iterate over the array, value at index i will be fixed and 
	// we will use the two-pointers approach on the subarray from [i+1, n-1]
    for(let idx=0; idx < len - 2; ++idx) {
        
        // if num > target, all the triplets formed will have sum greater than target
        if(nums[idx] > target) {
            break;
        }

        // if curr num is same as previous num, the same triplet will be resulted, so in order to avoid duplicates, skip for this num
        if(idx > 0 && nums[idx] === nums[idx - 1]) {
            continue;
        }    
        left = idx + 1;
        right = len - 1;
        
        while(left < right) {

			// triplet includes the fixed value and the values at left and right pointer
            const triplet = [nums[idx], nums[left], nums[right]],
                  sum = triplet[0] + triplet[1] + triplet[2];

			// if sum equals the target, add the triplet into the resultant array
            if(sum === target) {
                
                result.push(triplet);

                // avoiding duplicates of second value in the triplet               
                while(left < right && nums[left] === triplet[1]) {
                    ++left;
                }
                // avoiding duplicates of third value in the triplet
                while(left < right && nums[right] === triplet[2]) {
                    --right;
                }
            } else if(sum < target) {    // if sum is less than target, move the left pointer to the right so that the current sum will increase and be closer to the target
                ++left;
            } else {    // if current sum is greater than target, move the right pointer to the left so thatv= the current sum will decrease and be closer to the target
                --right;
            }
        }
    }
    return result;
};
/* 

Time Complexity: O(nlogn + n^2) = O(n^2)

O(nlogn) for sorting
O(n^2) for the outer and inner loop with the outer loop for fixed value and the inner loop does two-pointers approach on the rest of the array

Space Complexity: O(logn) upper bound

O(logn) space complexity for Quick search

*/ 