/* 



****____

This problem is very similar to the Word Break leetcode problem. I suggset doing that one first, or doing this problem then going back to that problem.

In this problem, we need an O(1) way to lookup if a substring is a valid letter or not. To do this, I created a hash with the corresponding letters. The values don't really matter, but it looks pretty.

We create an array of s.length + 1, since we need the idx=0 of that array to be 1. This is the initial step (and the way I look at it, there's only one way to get to zero, so I put zero).

Now, we have a static i per loop, and have a j that's moving throughout the string. If we find that a substring is in the hash, we add to our dp array. At the end, the last index will be the total number of combinations.

I highly suggest drawing this out. Drawing out DP (dynamic programming) problems has helped me immensely, and is the best way to see the algorithm in action.

// O(n^2) time
// O(n) space (dp array)

****____




  A message containing letters from A-Z can be encoded into numbers using the following mapping:

  'A' -> "1"
  'B' -> "2"
  ...
  'Z' -> "26"
  To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:

  "AAJF" with the grouping (1 1 10 6)
  "KJF" with the grouping (11 10 6)
  Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

  Given a string s containing only digits, return the number of ways to decode it.

  The answer is guaranteed to fit in a 32-bit integer.

  

  Example 1:

      Input: s = "12"
      Output: 2
      Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).


  Example 2:

      Input: s = "226"
      Output: 3
      Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).


  Example 3:

      Input: s = "0"
      Output: 0
      Explanation: There is no character that is mapped to a number starting with 0.
      The only valid mappings with 0 are 'J' -> "10" and 'T' -> "20", neither of which start with 0.
      Hence, there are no valid ways to decode this since all digits need to be mapped.


  Example 4:

      Input: s = "06"
      Output: 0
      Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").
  

  Constraints:

    1 <= s.length <= 100
    s contains only digits and may contain leading zero(s).


*/ 



/* 

  approach #1 - recursive iterative approach w/ memoization 

*/ 


// Javascript Memoized solution - usually averages to about better than 80% of submissions. Hope this helps explain!

/**
 * @param {string} s
 * @return {number}
 */

 var numDecodings = function(s, index = 0, memo = {}) {
  // Positive base case - we found an encoding!
  if (index > s.length) {
      return 1;
  }
  
  // Negative base case - no encoding possible because:
  // 1. '0' is not a valid encoding
  // 2. Any number that starts with '0' is not a valid encoding
  if (s[index] === '0') {
      return 0;
  }
  
  // Memoized case - we've already found the number of solutions from this index
  if (index in memo) {
      return memo[index]
  }
  
  const take1Num = numDecodings(s, index + 1, memo)
  const twoNumberCombination = parseInt(s[index] + s[index + 1], 10)
  let take2Num = 0;
  
  if (index < s.length - 1 && twoNumberCombination <= 26) {
      take2Num = numDecodings(s, index + 2, memo)
  }
  
  // We need to figure out the combinations of either using 1 number or 2 numbers
  // for example, "13" and "1" then "3" will result in different next indexes, so the total
  // combinations is the sum of both
  const totalNumCombinations = take1Num + take2Num;
  
  // Memoize the total number of combinations at this index so
  // if we ever hit it again, we don't have to recalculate it
  memo[index] = totalNumCombinations;
  return memo[index]
};


/* v.2 */

// top down memoization 
var numDecodings = function(s) {
  return count(s,0);
};

var count = function(str, i, memo=[]) {
  if (str[i] == "0") return 0;
  if (i >= str.length - 1) return 1;
  if (memo[i]) return memo[i];

  // try to take 1 and 2
  let res = count(str, i+1, memo);
  if (parseInt(str[i] + str[i+1]) <= 26) {
      res += count(str, i+2, memo);
  }

  memo[i] = res;
  return res;
}; 




/* 

  approach #2 - iterative 

*/ 



/* 

  approach #2 - iterative, constant space 

*/ 








/* 

  some more alpha 
  
  Javascript DP O(1) space with explanation comments  

*/ 
 

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    let n = s.length;
    
    // Empty string and string that start with 0 is not valid
    if (n === 0 || s[0] === '0') {
        return 0;
    }
    
    // Obviously
    if (n === 1) {
        return 1;
    }
    
    // way1 is the answer for s.slice(0, i)
    let way1 = 1;
    // way2 is the answer for s.slice(0, i - 1)
    let way2 = 1;
    
    // Iterate through each digit and calcuate the answer for s.slice(0, i + 1) for each iteration
    for (let i = 1; i < n; i++) {
        // Current digit is 0, and even if we combine it with the
        // previous digit we can't make a valid letter so we return 0 immediately
        if (s[i] === '0' && s[i - 1] != '1' && s[i - 1] != '2') {
            return 0;
        }
        
        let currWay;
        
        // In this iteration we are calculating the answer for s.slice(0, i + 1)
        // There 3 valid cases:
        
        // 1) Current digit is 0, it must be combined with last digit
        //    so the answer is same as the answer for the s.slice(0, i - 1)
        if (s[i] === '0') {
            currWay = way2;
        // 2) Current digit can be combined with last digist or 
        //    be used as a standalone digit so the answer is
        //    the total of the answer for s.slice(0, i) and s.slice(0, i - 1)
        } else if (s[i - 1] !== '0' && parseInt(s[i - 1] + s[i]) <= 26) {
            currWay = way1 + way2;
        // 3) Current digit can only be used as a standalone digit
        //    so the answer is the same as the answer for s.slice(0, i)
        } else {
            currWay = way1;
        }
        
        way2 = way1;
        way1 = currWay;
    }
    
    return way1;
};


// Without comments for easy of reading code:
var numDecodings = function(s) {
    let n = s.length;
    
    if (n === 0 || s[0] === '0') {
        return 0;
    }
    
    if (n === 1) {
        return 1;
    }
    
    let way1 = 1;
    let way2 = 1;
    
    for (let i = 1; i < n; i++) {
        if (s[i] === '0' && s[i - 1] != '1' && s[i - 1] != '2') {
            return 0;
        }
        
        let currWay;
        if (s[i] === '0') {
            currWay = way2;
        } else if (s[i - 1] !== '0' && parseInt(s[i - 1] + s[i]) <= 26) {
            currWay = way1 + way2;
        } else {
            currWay = way1;
        }
        
        way2 = way1;
        way1 = currWay;
    }
    
    return way1;
};




/* 

  recursive dp solution 

*/ 