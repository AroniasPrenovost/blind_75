/* 

  Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

  A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

  For example, "ace" is a subsequence of "abcde".
  A common subsequence of two strings is a subsequence that is common to both strings.

  

  Example 1:

      Input: text1 = "abcde", text2 = "ace" 
      Output: 3  
      Explanation: The longest common subsequence is "ace" and its length is 3.



  Example 2:

      Input: text1 = "abc", text2 = "abc"
      Output: 3
      Explanation: The longest common subsequence is "abc" and its length is 3.



  Example 3:

      Input: text1 = "abc", text2 = "def"
      Output: 0
      Explanation: There is no such common subsequence, so the result is 0.
  

  Constraints:

    1 <= text1.length, text2.length <= 1000
    text1 and text2 consist of only lowercase English characters.

*/ 



/* 

  approach #1 - memoization 

*/ 






/* 

  approach #2 - improved memoization 

*/ 





/* 

  approach #3 - dynamic programming 

*/ 



var longestCommonSubsequence = function(text1, text2) {
  // column = text1 charcters => j
  // row = text2 characters => i
  let dp = [];

  // initialize dp table
  for(let i = 0; i <= text2.length; i++) dp.push([]);

  // fill the first row with 0
  for(let j=0; j<=text1.length; j++) dp[0][j] = 0;

  // fill the first col with 0
  for(let i=0; i<=text2.length; i++) dp[i][0] = 0;

  // fill the rest of the table
  for(let i = 0; i < text2.length; i++) {
      for(let j = 0; j < text1.length; j++) {
          const n = i+1;
          const m = j+1;
          
          if(text1[j] === text2[i]) {
              dp[n][m] = dp[n-1][m-1] + 1;
          } else {
              dp[n][m] = Math.max(dp[n-1][m], dp[n][m-1]);
          }
      }
  }

  // return the last cell in the table
  return dp[text2.length][text1.length];
};




/* 

  approach #4 - dynamic programming with space optimization  

*/ 




 
/* __ alpha __ */ 

/* 

  the basic idea is: with single string, for each character, there are 2 options: keep it or delete. With 2 string, for each character, there are 4 options combination:
  string a keep, string b keep,
  string a not keep, string b keep,
  string a keep, string b not keep,
  string a , b both not keep

  use two pointers represent 4 options above:

  1+helper(i+1, j+1)
  helper(i+1, j)
  helper(i, j+1)
  helper(i+1, j+1)
  the base case is when i == text1.length || j == text2.length return 0, because text1 = 'asdas' text2='' = 0, ethier one empty string always return 0.

*/ 


// recursion
var longestCommonSubsequence = function(text1, text2) {
  const helper = function(i, j) {
    if(i == text1.length || j == text2.length) {
      return 0;
    }

    if(text1[i] == text2[j]) {
      return 1+helper(i+1, j+1);
    } else {
      return Math.max(helper(i+1, j), helper(i, j+1), helper(i+1, j+1));
    }
  }
  
  return helper(0, 0)
};

// recursion with mem
var longestCommonSubsequence = function(text1, text2) {
  let mem = new Array(text1.length+1);
  for(let i = 0; i < mem.length; i++) {
    mem[i] = new Array(text2.length+1);
  }
  
  const helper = function(i, j) {
    if(i == text1.length || j == text2.length) {
      return mem[i][j] = 0;
    }
    
    if(mem[i][j] != undefined) {
      return mem[i][j];
    }

    if(text1[i] == text2[j]) {
      return mem[i][j] = 1+helper(i+1, j+1);
    } else {
      return mem[i][j] = Math.max(helper(i+1, j), helper(i, j+1), helper(i+1, j+1));
    }
  }
  
  return helper(0, 0)
};

// dp bottom up with 2d
var longestCommonSubsequence = function(text1, text2) {
  let mem = new Array(text1.length+1);
  for(let i = 0; i < mem.length; i++) {
    mem[i] = new Array(text2.length+1).fill(0);
  }
  
  for(let i = 1; i <= text1.length; i++) {
    for(let j = 1; j <= text2.length; j++) {
      if(text1[i-1] == text2[j-1]) {
        mem[i][j] = 1+mem[i-1][j-1];
      } else {
        mem[i][j] = Math.max(mem[i-1][j], mem[i][j-1], mem[i-1][j-1]);
      }
    }
  }
  return mem[text1.length][text2.length];
};

// dp bottom up with 1d
var longestCommonSubsequence = function(text1, text2) {
  let mem = new Array(text2.length+1).fill(0);
  
  for(let i = 1; i <= text1.length; i++) {
    let next = new Array(text2.length+1).fill(0);
    for(let j = 1; j <= text2.length; j++) {
      if(text1[i-1] == text2[j-1]) {
        next[j] = 1+mem[j-1];
      } else {
        next[j] = Math.max(mem[j], next[j-1], mem[j-1]);
      }
    }
    mem = next;
  }
  return mem[text2.length];
};