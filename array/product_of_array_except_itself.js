/* 

  Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

  The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

  You must write an algorithm that runs in O(n) time and without using the division operation.

  

  Example 1:

  Input: nums = [1,2,3,4]
  Output: [24,12,8,6]
  Example 2:

  Input: nums = [-1,1,0,-3,3]
  Output: [0,0,9,0,0]
  

  Constraints:

  2 <= nums.length <= 105
  -30 <= nums[i] <= 30
  The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
  

  Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)

*/ 

/* 

  approach #0 - brute force 

*/ 

var productExceptSelf = function(nums) {
  
  // arr-> array which stores result
  let arr = []
  let product = 1

  for(let i = 0 ; i < nums.length; i++) {
    let s = nums[i]
    for(let j = 0; j < nums.length; j++) {
      if(i !== j) {
        product = product*nums[j]
      }
      //if the current value index is equal to j index then skip the element
      else {
        continue
      }
    }

    //push the result
    arr.push(product)

    //initialise the product variable to 1 again after the inner loop completes
    product = 1
  }
  
  return arr
};




/* 

  approach #1 - left and right product lists

*/ 

var productExceptSelf = function(nums) {
  const length = nums.length;
  const L = [];
  const R = [];
  const answer = [];

  L[0] = 1

  for (let i = 1; i < length; i++) {
    L[i] = nums[i - 1] * L[i-1]
  }

  R[length - 1] = 1;

  for (let j = length - 2; j >= 0; j--) {
    R[j] = nums[j+1] * R[j+1]
  }

  for (let k = 0; k < length; k++) {
    answer[k] = R[k] * L[k]
  }
  
  return answer;
};



/* 

  approach #2 - O(1) space approach

  Runtime: 116 ms, faster than 83.21% of JavaScript online submissions for Product of Array Except Self.
  Memory Usage: 49.5 MB, less than 56.75% of JavaScript online submissions for Product of Array Except Self.

*/ 

var productExceptSelf = function(nums) {
  const length = nums.length;

  const answer = [];

  answer[0] = 1

  for (let i = 1; i < length; i++) {
    answer[i] = nums[i - 1] * answer[i-1] // same as doing nums[i - 1] * L[i-1] in Approach #1
  }

  // R contains the product of all the elements to the right of "j"
  // Note: for the element at index 'length - 1', there are no elements to the right,
  // so the R would be 1
  let R = 1

  for (let j = length - 1; j >= 0; j--) {
    answer[j] *= R // same as doing L[j] * R[j] in Approach #1, but on the fly 
    R *= nums[j] // calculate the product to the right of "j" 
  }
  
  return answer;
    
};

/* v.2 */ 

var productExceptSelf = function(nums) {
  let len = nums.length,
       result = new Array(len);
  result[0] = 1;
  
  for (let i = 1; i < len; i ++) {
      result[i] = result[i - 1] * nums[i - 1];
  }
  
  let r = 1;

  for (let i = len -1; i >= 0; i --) {
    result[i] = result[i] * r;
    r *= nums[i]
  }
  return result;
};




// var productExceptSelf = function(nums) {
//   const n = nums.length;
//   const res = Array(n).fill(1);

//   let left = (right = 1);
//   for (let i = 0; i < n; i++) {
//     res[i] *= left;
//     res[n - 1 - i] *= right;
//     left *= nums[i];
//     right *= nums[n - 1 - i];
//   }
//   return res;
// };



/* 

  apprach #3 - Take the product of whole array and divide by nums[i] on each index.

  Runtime: 112 ms, faster than 91.85% of JavaScript online submissions for Product of Array Except Self.
  Memory Usage: 49.2 MB, less than 69.43% of JavaScript online submissions for Product of Array Except Self.

  Count the total Product without the zeros and count the number of 0s.
  Now to calculate result at each index check if it is 0 or not,
  if a valid value and count of zeros is 0 then calculate by dividing.
  else there must be a zero which will make the product 0 so set as 0.
  If the current value is 0 then.
  check if count of zeros is 1 then this is the only zero so set the result as total Product
  else if there are more than one zero then this value will be 0 because of other zeros

*/ 

var productExceptSelf = function(nums) {
  let zeroes = -1;
  let product = 1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == 0) {
      if (zeroes != -1)
        return nums.fill(0);
      zeroes = i;
    } else
      product = nums[i] * product;
  }

  if (zeroes == -1)
    return nums.map(num => product / num);
  else {
     nums.fill(0);
     nums[zeroes] = product;
     return nums;
  }
};





/* other solution 1 */ 

/*
We have to return an array so we will create a result array.
res[i]  = the product of elements on the left of i and elements on the right of i
        = left[i-1] * right[i+1], 
        where left[i] is the product of elements from 0 to i and right[i] is the product of elements from end of array to i
We will fill these two arrays, left[] and right[], and then iterate through result array and fill it with correct products. 
*/
var productExceptSelf = function(nums) {
  if (nums === null || nums.length <= 1) {
      return [];
  }
  let n = nums.length;
  let left = new Array(n), right = new Array(n), res = new Array(n);
  for (let i = 0; i < n; i++) {
      left[i] = i > 0 ? nums[i] * left[i-1] : nums[i];
  }
  for (let i = n-1; i >= 0; i--) {
      right[i] = i < n-1 ? nums[i] * right[i+1] : nums[i];
  }
  for (let i = 1; i < n-1; i++) {
      res[i] = left[i-1] * right[i+1];
  }
  res[0] = right[1];
  res[n-1] = left[n-2];
  return res;
  // T.C: O(N)
  // S.C: O(N), even though we assume that the output array is not counted as extra space,
  // we use two extra arrays of length n
};
/*
Add optimisation to the solution above.

Instead of using two arrays left[] and right[], we will keep track of product from left and product from right.
Hence, at each i, res[i] = productFromLeft * productFromRight. Since we can't have access to productFromLeft and
productFromRight at the same time without storing them somewhere, we will set res[i] to productFromLeft when
iterating from the start and we will multiply productFromRight to each res[i] as we iterate through from the end.
*/

var productExceptSelf = function(nums) {
  if (nums === null || nums.length <= 1) {
      return [];
  }
  let productFromLeft = 1, productFromRight = 1;
  let res = new Array(nums.length);
  for (let i = 0; i < nums.length; i++) {
      res[i] = productFromLeft;
      productFromLeft *= nums[i];
  }
  for (let i = nums.length-1; i >= 0; i--) {
      res[i] *= productFromRight;
      productFromRight *= nums[i];
  }
  return res;
  // T.C: O(N)
  // S.C: O(1), assuming that we do not count the output array as extra space
}

/* other solution 2 */ 

/* 
  
  JS beats 99% (O(1) space, O(n) time)

  The idea is that during the first loop we count products in one way. Then we go through the second loop from the end and use first loop information as product before [i] element. Using ans array + couple of variables for simplicity sake as our storage.

*/

const productExceptSelf = (nums) => {
    let ans = []
    let after = 0;
    let before = 0;
    let lastEl = 0;
    const len = nums.length
    ans[0] = nums[0]
    //first loop left -> right
    for (let i = 1; i < len; i++) {
        ans[i] = nums[i] * ans[i - 1]
    }

    lastEl = ans[len - 2]

    after = nums[len - 1]
    //second loop right -> left
    for (let j = len - 2; j > 0; j--) {
        before = ans[j - 1]
        ans[j] = after * before
        after = nums[j] * after

    }

    ans[0] = after
    ans[len - 1] = lastEl

    return ans
};

/* other solution 3 */ 

// O(1) solution 
const productExceptSelf = function(nums) {
  let output = Array(nums.length)
  let productsLeftOfMe = 1
  for(let i = 0; i < nums.length; i++){
      output[i] = productsLeftOfMe
      productsLeftOfMe *= nums[i]
  }
  let productsRightOfMe = 1
  for(let i = nums.length-1; i >= 0; i--){
      output[i] *= productsRightOfMe
      productsRightOfMe *= nums[i]
  }
  return output
};