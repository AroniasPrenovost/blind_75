/* 

  Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

  It is guaranteed that the answer will fit in a 32-bit integer.

  A subarray is a contiguous subsequence of the array.

  

  Example 1:

  Input: nums = [2,3,-2,4]
  Output: 6
  Explanation: [2,3] has the largest product 6.
  Example 2:

  Input: nums = [-2,0,-1]
  Output: 0
  Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
  

  Constraints:

  1 <= nums.length <= 2 * 104
  -10 <= nums[i] <= 10
  The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

*/ 



/* 

  approach #1 - brute force 

    The most naive way to tackle this problem is to go through each element in nums, and for each element, 
    consider the product of every a contiguous subarray starting from that element. This will result in a cubic runtime.

    basically - finding the max product from a certain index.

    O(n^2)

*/ 

/* v.1 */ 

var maxProduct = function(nums) {
	var result = Number.NEGATIVE_INFINITY;

	for (var i = 0; i <= nums.length - 1; i++) {
		let product = 1;
		for (var j = i; j <= nums.length - 1; j++) {
			let val = nums[j];
			product *= val;

			if (product > result) result = product;
		}
	}

	return result;
};

/* v.2 */ 

var maxProduct = function(nums) {
  let maxProd = -Infinity;
  let running = 1;

  // moving forward;
  for(let n of nums) {
    if(!running) running = n;
    else running *= n;
    maxProd = Math.max(maxProd, running);
  }

  running = 1;

  // moving backward
  for(let i = nums.length-1; i >= 0; i--) {
    if(!running) running = nums[i];
    else running *= nums[i];
    maxProd = Math.max(maxProd, running);
  }
  return maxProd
};

// optimized the above by combining the 2 loops 
var maxProduct = function(nums) {
   let res = nums[0], l = 0, r = 0;
    for(let i = 0; i < nums.length; i++) {
        l = (!l ? 1 : l) * nums[i];
        r = (!r ? 1 : r) * nums[nums.length - 1 - i];
        res = Math.max(res, r, l);
    }
    return res;
};





/* 

  approach #2 - Dynamic Programming - ( Kadane's algorithm again )

    Rather than looking for every possible subarray to get the largest product, we can scan the array and solve smaller subproblems.

*/ 


/* v.1 */ 

var maxProduct = function(nums) {
	if(!nums.length) return 0
	
	let max = nums[0]
	let currentMax = nums[0]
	let currentMin = nums[0]
	
	for(let i=1;i<nums.length;i++){
		if(nums[i]<0){
			let temp = currentMax
			currentMax = currentMin
			currentMin = temp
		}
		currentMax = Math.max(currentMax*nums[i], nums[i])
		currentMin = Math.min(currentMin*nums[i], nums[i])

		max = Math.max(currentMax, max)
	}
	return max;
};


/* v.2 

  With Kadane's formula, we create three variables that will help us find our solution

    maxSoFar (at this point in time, what's our max so far)
    minSoFar (at this point in time, what's our min so far)
    greatestMax (what's the greatest max we have found)
 
    O(n) time
    O(1) space

*/ 

const maxProduct = (nums) => {
	if (nums.length === 0) return 0;

	let maxSoFar = nums[0];
	let minSoFar = nums[0];
	let greatestMax = nums[0];

	for (var i = 1; i <= nums.length - 1; i++) {
    let currVal = nums[i],
    tempMax = maxSoFar * currVal,
    tempMin = minSoFar * currVal;

		/*
		 * What's the largest number at this point in time?
		 *      The new number introduced?
		 *      The minSoFar times new number?
		 *      The maxSoFar times new number?
		 */
		maxSoFar = Math.max(currVal, tempMin, tempMax);

		/*
		 * What's the smallest number at this point in time?
		 *      The new number introduced?
		 *      The minSoFar times new number?
		 *      The old maxSoFar times new number?
		 */
		minSoFar = Math.min(currVal, tempMin, tempMax);

		/*
		 *
		 * Greatest number between maxSoFar and greatestMax?
		 */
		greatestMax = Math.max(greatestMax, maxSoFar);
	}

	return greatestMax;
};



/* v.3

  The intuition is that we store the information about our previous maximum product, and as we iterate through the array, we keep using our previous maximum to calculate the new maximum product.
  The tricky part of this problem is that negative numbers exist in the input array. This causes situations where the smallest previous product (a negative number) can become the largest product if the next number in line is also a negative number.
  Since the minimum product may have a chance to become the maximum, we need to store the information about the previous minimum as well and take it into account when we are calculating our maximum product.

*/ 

 
var maxProduct = function(nums) {
  let prevMax = nums[0];
  let prevMin = nums[0];
  let result = nums[0];
  for (let i=1;i<nums.length;i++) {
    // given the new number, the new maximun can have 3 conditions
    // 1. number(+) * prevMax(+) is the largest
    // 2. number(+) it self is the largest
    // 3. number(-) * prevMin(-) is the largest 
    curMax = Math.max(nums[i] * prevMax, nums[i], nums[i] * prevMin);
    
    curMin = Math.min(nums[i] * prevMin, nums[i], nums[i] * prevMax);

    // updating the prevMax & prevMin, these two may swap locations
    prevMax = curMax
    prevMin = curMin

    result = Math.max(curMax, result);
  }
  return result;
}