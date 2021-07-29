/* 

  A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

  The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

  How many possible unique paths are there?

  



  Example 1:

      Input: m = 3, n = 7
      Output: 28




  Example 2:

      Input: m = 3, n = 2
      Output: 3
      Explanation:
      From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
      1. Right -> Down -> Down
      2. Down -> Down -> Right
      3. Down -> Right -> Down
  
  
  
  
  
  Example 3:

      Input: m = 7, n = 3
      Output: 28
  




  
  Example 4:

      Input: m = 3, n = 3
      Output: 6
  





  Constraints:

    1 <= m, n <= 100
    It's guaranteed that the answer will be less than or equal to 2 * 109.


*/ 




/* 

  approach #1 - dynamic programming

*/ 



 
var uniquePaths = function(m, n) {
  // initially filling the whole matrix with 1's
  const dp=Array.from({length:m}).map(()=>new Array(n).fill(1));
      
    // starting from 2nd row(index 1) and 2nd col(index 1) as we know the no. of paths for 1st row(index 0) and 1st col(index 0) is always 1.
    for(let i=1;i<m;i++){
        for(let j=1;j<n;j++){
            dp[i][j] = dp[i][j-1] + dp[i-1][j];
        }
    }

    return dp[m-1][n-1];
  };


  /* 

    v.2 

    Create an m+1 x n+1 matrix with all values 0. (Exchanging that extra memory for minimalism!)
    Set bottom OR right cell of finish cell to 1.
    Iterate from finish cell to start, and while iterating set the sum of bottom and right cell values as current cell value.

*/ 

var uniquePaths = function(m, n) {
    const matrix = new Array(m + 1).fill(1).map(() => new Array(n + 1).fill(0));
    
    matrix[m][n - 1] = 1;
    
    for(let mi = m - 1; mi >= 0; mi--) {
        for(let ni = n - 1; ni >= 0; ni--) {
            matrix[mi][ni] = matrix[mi][ni + 1] + matrix[mi + 1][ni];            
        }
    }
    
    return matrix[0][0];
};




/* v.3 */ 

var uniquePaths = function(m, n) {
  if (m === 1 || n === 1) return 1;
  let dp = new Array(m).fill().map(x => new Array(n));

  for (let i = 0; i < m; i ++) {
    dp[i][0] = 1 
  }
  for (let i = 0; i < n; i ++) {
    dp[0][i] = 1 
  }

  for (let i = 1; i < m; i ++) {
    for (let j = 1; j < n; j ++) {
      dp[i][j] = dp[i][j-1] + dp[i-1][j]
    }
  }

  return dp[m-1][n-1]
};



/* v.4 */ 


var uniquePaths = function(m, n) {
    // big idea: the number of ways to reach a cell c[i][j]
    // is equal to the number of ways to reach the cell above c[i-1][j]
    // plus the number of ways to make the cell left c[i][j-i], because you
    // can only reach c[i][j] via either of those two cells
	
    if(m === 0 || n === 0) return 0;
    if(m === 1 || n === 1) return 1;
    
    // initialise DP with base cases
    const dp = Array(m ).fill(
        Array(n).fill(1)
    );
    
    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    
    // return value for bottom right
    return dp[m-1][n-1];
};



/* v.5 */ 


var uniquePaths = function(m, n) {
  const dp = [];
  
  for (let i = 0; i <= m; i++) {
      dp[i] = new Array(n + 1).fill(0);
  }
  
  for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
          if (i === 1 || j === 1) {
              dp[i][j] = 1;
          } else {
              dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
          }
      }
  }
  
  return dp[m][n];
};


/* v.6 */

var uniquePaths = function(m, n) {
  const dp = Array(n).fill(1);
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] = dp[j - 1] + dp[j];
    }
  }

  return dp[n - 1];
};


/*
    
  v.7  

  The DP formula is map[m, n] = map[m - 1, n] + map[m, n - 1]

  Based on this, we will have a top-down solution via the formula, however it's too time-consuming

  So, we later come up with a bottom-top idea for this question.

  besides, we can only use one single array and override it repeatedly, that's how we can reduce space complexity from O(mn) to O(n)

  Time O(mn)
  space O(n) 

*/

var uniquePaths = function(m, n) {
  if (m === 1 || n === 1) return 1;

  var arr = [];
  var i, j;

  for (i = 1; i < m; i++) {
    for (j = 1; j < n; j++) {
      arr[j] = (arr[j] || 1) + (arr[j - 1] || 1);
    }
  }

  return arr[n - 1];
};



/* v.8 */ 
var uniquePaths = function(m, n) {
  // At each position, how many unique paths to get to the finish position
  const cache = {};
  // At the finish position, there is one and only one way to get to itself
  cache[n - 1, m - 1] = 1;
  // Start from the end, work our way back
  for(let i = n - 1; i >= 0; i--) {
      for(let j = m - 2; j >= 0; j--) {
          let pathsToFinish = 0;
          // Can go right
          if (j + 1 < m) {
              const pathsFromRight = cache[i, j + 1] || 0;
              pathsToFinish += pathsFromRight;
          }
          // Can go down
          if (i + 1 < n) {
              const pathsFromBottom = cache[i + 1, j] || 0;
              pathsToFinish += pathsFromBottom;
          }
          cache[i, j] = pathsToFinish;
      }
  }
  return cache[0,0];
};