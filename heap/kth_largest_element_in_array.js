/* 

    Given an integer array nums and an integer k, return the kth largest element in the array.

    Note that it is the kth largest element in the sorted order, not the kth distinct element.

    You must solve it in O(n) time complexity.

    

    Example 1:

    Input: nums = [3,2,1,5,6,4], k = 2
    Output: 5
    Example 2:

    Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
    Output: 4
    

    Constraints:

    1 <= k <= nums.length <= 105
    -104 <= nums[i] <= 104





Approach 0: Sort
  The naive solution would be to sort an array first and then return kth element from the end, something like sorted(nums)[-k] on Python. 
  That would be an algorithm of \mathcal{O}(N \log N)O(NlogN) time complexity and \mathcal{O}(1)O(1) space complexity. 
  This time complexity is not really exciting so let's check how to improve it by using some additional space.


Approach 1: Heap
  The idea is to init a heap "the smallest element first", and add all elements from the array into this heap one by one keeping the size of the heap always less or equal to k. That would results in a heap containing k largest elements of the array.

  The head of this heap is the answer, i.e. the kth largest element of the array.

  The time complexity of adding an element in a heap of size k is \mathcal{O}(\log k)O(logk), and we do it N times that means \mathcal{O}(N \log k)O(Nlogk) time complexity for the algorithm.

  In Python there is a method nlargest in heapq library which has the same \mathcal{O}(N \log k)O(Nlogk) time complexity and reduces the code to one line.

  This algorithm improves time complexity, but one pays with \mathcal{O}(k)O(k) space complexity.





  ** sorts imply o(nlogn), which is wors than o(n)

*/ 




/* 

  divide and conquer - quick select 

    Time complexity : \mathcal{O}(N)O(N) in the average case, \mathcal{O}(N^2)O(N 2) in the worst case.
    Space complexity : \mathcal{O}(1)O(1).

*/


var findKthLargest = function(nums, k) {
  if (!nums.length) return nums;
  // standard quick select algorithm
  let random = (i, j) => Math.trunc(i + Math.random()*(j - i));
  let quick_select = (_nums, k) => {
      if (!_nums.length) return false;
      let pivot = random(0, _nums.length);
      // divide
      let [left, right] = [[], []];
      for (let [i, e] of _nums.entries()) {
          if (i == pivot) continue;
          if (e < _nums[pivot]) left.push(e);
          else right.push(e);
      }
      // conquer
      if (left.length == k) return _nums[pivot];
      if (left.length > k) return quick_select(left, k);
      return quick_select(right, k - (left.length+1));
  }
  return quick_select(nums, nums.length - k);
};


console.log(findKthLargest([3,2,1,5,6,4], 2)); // 5
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // 4


/* 

  |||||||||||||
  Approach 2: Quickselect
    This textbook algorthm has \mathcal{O}(N)O(N) average time complexity. https://en.wikipedia.org/wiki/Quickselect 
    Like quicksort, it was developed by Tony Hoare, and is also known as Hoare's selection algorithm.
    It is also an in-place algorithm, requiring only constant memory overhead if tail call optimization is available, or if eliminating the tail recursion with a loop:

    The approach is basically the same as for quicksort. For simplicity let's notice that kth largest element is the same as N - kth smallest element, hence one could implement kth smallest algorithm for this problem.

    First one chooses a pivot, and defines its position in a sorted array in a linear time. This could be done with the help of partition algorithm.

    To implement partition one moves along an array, compares each element with a pivot, and moves all elements smaller than pivot to the left of the pivot.

    As an output we have an array where pivot is on its perfect position in the ascending sorted array, all elements on the left of the pivot are smaller than pivot, and all elements on the right of the pivot are larger or equal to pivot.

    Hence the array is now split into two parts. If that would be a quicksort algorithm, one would proceed recursively to use quicksort for the both parts that would result in \mathcal{O}(N \log N)O(NlogN) time complexity. Here there is no need to deal with both parts since now one knows in which part to search for N - kth smallest element, and that reduces average time complexity to \mathcal{O}(N)O(N).

    Finally the overall algorithm is quite straightforward :

    Choose a random pivot.

    Use a partition algorithm to place the pivot into its perfect position pos in the sorted array, move smaller elements to the left of pivot, and larger or equal ones - to the right.

    Compare pos and N - k to choose the side of array to proceed recursively.

          Time complexity : \mathcal{O}(N)O(N) in the average case, \mathcal{O}(N^2)O(N 2) in the worst case.
          Space complexity : \mathcal{O}(1)O(1).


          

*/


var findKthLargest = function (nums, k) {
  let temp;

  for (let i = 0; i < nums.length; i++) {
      for (let j = (i + 1); j < nums.length; j++) {
          if (nums[i] > nums[j]) {
              temp = nums[i];
              nums[i] = nums[j];
              nums[j] = temp;
          }
      }
  }

  return nums[nums.length - k];
};

console.log(findKthLargest([3,2,1,5,6,7], 2)); // 6
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // 4
