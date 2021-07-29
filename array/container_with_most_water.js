/* 

  Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.

  Notice that you may not slant the container.

  

  Example 1:


  Input: height = [1,8,6,2,5,4,8,3,7]
  Output: 49
  Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
  Example 2:

  Input: height = [1,1]
  Output: 1
  Example 3:

  Input: height = [4,3,2,1,4]
  Output: 16
  Example 4:

  Input: height = [1,2,1]
  Output: 2
  

  Constraints:

  n == height.length
  2 <= n <= 105
  0 <= height[i] <= 104

*/ 


/* 

  approach #1 - brute force 

 

*/ 

 



/* 

  approach #2 - two pointer approach 

  O(n)

  Runtime: 104 ms, faster than 25.07% of JavaScript online submissions for Container With Most Water.
  Memory Usage: 47.6 MB, less than 87.01% of JavaScript online submissions for Container With Most Water.

  Before we go on, we need to look at the given test cases, and make some facts up to start writing our code:

  We can see that the area of the container is limited by the smallest side, so we need to know what the smallest side is every iterations
  The area of a container is (right - left) multiplied by the smallestSide.
  If the area is greater than our result, we have a new result
  When moving the left or right pointer, we want to get rid of the smaller side, so iterate from that side
  With this we can do the problem in O(n) time and constant space by having a left and right pointer, and moving these pointers inward.

*/ 

/* v.1 */

/*
  This question is asking us what's the largest area,
  regardless of the inside bars, only counting the outside ones

  output - area number
  input - heights array
  constraints - oN run time is probably best
  exceptions - one height array?

  basically find the highest product between length and shorter height

  we'll have two pointers, right and left index
  at each new index change, we'll calculate the shortest side and the area
  update the result based on the new area and the current result
  update the left or right index
  return the end result
*/

var maxArea = function(height) {
    let [result, leftIndex, rightIndex] = [0, 0, height.length - 1];
    
    while (leftIndex < rightIndex) {
        // calculate the shortest side and the area
        let shortestSide = Math.min(height[leftIndex], height[rightIndex]);
        let area = (rightIndex - leftIndex) * shortestSide;
        
        // compare area and result to update the result 
        result = Math.max(area, result);

        // update the left or right index
        if (height[leftIndex] < height[rightIndex]) leftIndex++;
        else rightIndex--;
    }
    return result;
};


/* v.2 */ 

var maxArea = function(height) {
  
  let l = 0;
  let r = height.length-1;
  let max = 0;
  
  while(l<r){
    let lh = height[l];
    let rh = height[r];
    let min_h = Math.min(lh,rh) //find minimum height of l and r
    max = Math.max(max,min_h*(r-l)) //find area
    lh < rh ? l++ : r--;
  }

  return max;
};



/* v.3 */ 

var maxArea = function(height) {
  let n = height.length;
  
  let max = 0;
  let left = 0;
  let right = n - 1;
  
  while (left < right) {
    let area = (right - left) * Math.min(height[left], height[right]);
    
    max = Math.max(max, area);
    
    if (height[left] < height[right]) {
        left++;
    } else {
        right--;
    }
  }
  
  return max;
}