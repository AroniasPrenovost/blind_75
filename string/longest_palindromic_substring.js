/* 

  Given a string s, return the longest palindromic substring in s.

  

  Example 1:

  Input: s = "babad"
  Output: "bab"
  Note: "aba" is also a valid answer.
  Example 2:

  Input: s = "cbbd"
  Output: "bb"
  Example 3:

  Input: s = "a"
  Output: "a"
  Example 4:

  Input: s = "ac"
  Output: "a"
  

  Constraints:

  1 <= s.length <= 1000
  s consist of only digits and English letters (lower-case and/or upper-case),

*/ 

/* 

This article is for intermediate readers. It introduces the following ideas: Palindrome, Dynamic Programming and String Manipulation. Make sure you understand what a palindrome means. A palindrome is a string which reads the same in both directions. For example, SS = "aba" is a palindrome, SS = "abc" is not.

Solution
Approach 1: Longest Common Substring
Common mistake

Some people will be tempted to come up with a quick solution, which is unfortunately flawed (however can be corrected easily):

Reverse SS and become S'S 
′
 . Find the longest common substring between SS and S'S 
′
 , which must also be the longest palindromic substring.

This seemed to work, let’s see some examples below.

For example, SS = "caba", S'S 
′
  = "abac".

The longest common substring between SS and S'S 
′
  is "aba", which is the answer.

Let’s try another example: SS = "abacdfgdcaba", S'S 
′
  = "abacdgfdcaba".

The longest common substring between SS and S'S 
′
  is "abacd". Clearly, this is not a valid palindrome.

Algorithm

We could see that the longest common substring method fails when there exists a reversed copy of a non-palindromic substring in some other part of SS. To rectify this, each time we find a longest common substring candidate, we check if the substring’s indices are the same as the reversed substring’s original indices. If it is, then we attempt to update the longest palindrome found so far; if not, we skip this and find the next candidate.

This gives us an O(n^2)O(n 
2
 ) Dynamic Programming solution which uses O(n^2)O(n 
2
 ) space (could be improved to use O(n)O(n) space). Please read more about Longest Common Substring here.


Approach 2: Brute Force
The obvious brute force solution is to pick all possible starting and ending positions for a substring, and verify if it is a palindrome.

Complexity Analysis

Time complexity : O(n^3)O(n 
3
 ). Assume that nn is the length of the input string, there are a total of \binom{n}{2} = \frac{n(n-1)}{2}( 
2
n
​
 )= 
2
n(n−1)
​
  such substrings (excluding the trivial solution where a character itself is a palindrome). Since verifying each substring takes O(n)O(n) time, the run time complexity is O(n^3)O(n 
3
 ).

Space complexity : O(1)O(1).


Approach 3: Dynamic Programming
To improve over the brute force solution, we first observe how we can avoid unnecessary re-computation while validating palindromes. Consider the case "ababa". If we already knew that "bab" is a palindrome, it is obvious that "ababa" must be a palindrome since the two left and right end letters are the same.

We define P(i,j)P(i,j) as following:

P(i,j) = \begin{cases} \text{true,} &\quad\text{if the substring } S_i \dots S_j \text{ is a palindrome}\\ \text{false,} &\quad\text{otherwise.} \end{cases}P(i,j)={ 
true,
false,
​
  
if the substring S 
i
​
 …S 
j
​
  is a palindrome
otherwise.
​
 

Therefore,

P(i, j) = ( P(i+1, j-1) \text{ and } S_i == S_j )P(i,j)=(P(i+1,j−1) and S 
i
​
 ==S 
j
​
 )

The base cases are:

P(i, i) = trueP(i,i)=true

P(i, i+1) = ( S_i == S_{i+1} )P(i,i+1)=(S 
i
​
 ==S 
i+1
​
 )

This yields a straight forward DP solution, which we first initialize the one and two letters palindromes, and work our way up finding all three letters palindromes, and so on...

Complexity Analysis

Time complexity : O(n^2)O(n 
2
 ). This gives us a runtime complexity of O(n^2)O(n 
2
 ).

Space complexity : O(n^2)O(n 
2
 ). It uses O(n^2)O(n 
2
 ) space to store the table.

Additional Exercise

Could you improve the above space complexity further and how?


Approach 4: Expand Around Center
In fact, we could solve it in O(n^2)O(n 
2
 ) time using only constant space.

We observe that a palindrome mirrors around its center. Therefore, a palindrome can be expanded from its center, and there are only 2n - 12n−1 such centers.

You might be asking why there are 2n - 12n−1 but not nn centers? The reason is the center of a palindrome can be in between two letters. Such palindromes have even number of letters (such as "abba") and its center are between the two 'b's.


*/ 


/* 

  approach #1 - longest common substring 

  Some people will be tempted to come up with a quick solution, which is unfortunately flawed 
  (however can be corrected easily):


*/ 





/* 

  approach #2 - brute force 

  "
    check: c
    c is palindrome
    check: ca
    check: cab
    check: caba
    ---
    check: a
    a is palindrome
    check: ab
    check: aba
    aba is palindrome
    ---
    check: b
    b is palindrome
    check: ba
    ---
    check: a
    a is palindrome
    ---
    Longest Palindromic Substring: aba
  "

  very inefficient and will demand lot of operations if the string will be longer 

  O(n³)


  Runtime: 656 ms, faster than 34.38% of JavaScript online submissions for Longest Palindromic Substring.
  Memory Usage: 44.7 MB, less than 43.01% of JavaScript online submissions for Longest Palindromic Substring.


*/

var longestPalindrome = function(s) {

  let isPalin = function(s,i,j){
    while(i < j){
        if(s[i] !== s[j]) return false;
        i++;
        j--;
    }
    return true;
  }
      
  let result = '';
  for(let i = 0; i < s.length; i++){
    for(let j = i+1; j < s.length; j++){
    // check if both the elements are same
    
    if(s[i] == s[j]){
        // check is they are palindrome of each other
        if(isPalin(s,i,j)){
          // if palindrom returns true, then we check how long is the substring
          // if the substring is equals to original strings length return temp
          // and if the new palindrome length is greater than the previously set palindrome then reset the result with
          // string
          let temp = s.substring(i,j+1);
          if(temp.length > result.length) result = temp;
          if(temp.length == s.length) return temp;
        }
      }
    }
  }

  if(result == '' && s.length >=1) {
    result = s[0]; 
  }
  
  return result; 
}


/* 

  approach #3 - dynamic programming 

  Runtime: 1408 ms, faster than 20.76% of JavaScript online submissions for Longest Palindromic Substring.
  Memory Usage: 79.6 MB, less than 7.93% of JavaScript online submissions for Longest Palindromic Substring.

*/



var longestPalindrome = function(s) {

  let len = s.length,
       dp = new Array(len).fill(null).map(x => new Array(len).fill(false)),
       lps = '';
   
   for (let i = 0; i < len; i ++) {
       dp[i][i] = true;
       lps = s.slice(i, i + 1)
   }
   
   for (let i = 0; i < len; i ++) {
       if (s[i] === s[i + 1]) dp[i][i+1] = true;
       if(dp[i][i+1]) lps = s.slice(i, i + 2)
   }
   
   for (let i = len - 1; i >= 0; i --) {
       for (let j = i + 2; j < len; j ++) {
           dp[i][j] = dp[i+1][j-1] && s[i] === s[j];
           if(dp[i][j]) lps = lps.length < (j - i+ 1) ? s.slice(i, j + 1) : lps;
       }
   }
   return lps;
}



/* 

  approach #4 - expand around center 

  Runtime: 120 ms, faster than 70.51% of JavaScript online submissions for Longest Palindromic Substring.
  Memory Usage: 45.5 MB, less than 28.58% of JavaScript online submissions for Longest Palindromic Substring.

 
  constraints - ?? this will probably be n^2 runtime,

  - one runthrough to find a palindrome and another to find it at each index
  edge cases -
    - palindrome can have 1 middle character or 2 middle characters
    - we'll have to calculate both at each index

  we'll find palindromes starting from the "middle" index using the findLongestFromIndex function

  we'll have one iteration to get the longest palindromes at each index,
  the other iteration to actually find the palindrome

  after calculating the two palindromes, we'll take the longer
  and compare it to the current longest

  at the end, return the longest palindrome

*/


var longestPalindrome = function(s) {
  let longest = '';

  // this function finds the longest palindrome using the index as the middle
  const findLongestFromIndex = (str, i, j) => {
    let palindrome = '';
    while (i >= 0 && j < str.length && str[i] === str[j]) {
        palindrome = str.slice(i, j + 1);
        i--;
        j++;
    }
    return palindrome;
  }

  for (let i = 0; i < s.length; i++) {
  // palindromes using one and two characters as the middle
    const palindrome1 = findLongestFromIndex(s, i, i);
    const palindrome2 = findLongestFromIndex(s, i, i + 1);
    const longerPalindrome = palindrome1.length > palindrome2.length ? palindrome1 : palindrome2;
    
    if (longerPalindrome.length > longest.length) {
        longest = longerPalindrome;
    }
  }

  return longest;
};

/* 

  approach #4 - expand around center v.2

  Runtime: 104 ms, faster than 86.43% of JavaScript online submissions for Longest Palindromic Substring.
  Memory Usage: 40 MB, less than 90.21% of JavaScript online submissions for Longest Palindromic Substring.

*/ 

var longestPalindrome = function(s) {
  if (s.length < 1) return "";
  let maxSubStart = 0;
  let maxSubLength = 0;
    
    
  function expandAroundCenter(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }
    
  for (let i = 0; i < s.length; i++) {
    const lengthCenteredAtChar = expandAroundCenter(s, i, i);
    const lengthCenteredAtSpace = expandAroundCenter(s, i, i + 1);
    const longestSubAtChar = Math.max(lengthCenteredAtChar, lengthCenteredAtSpace)
    if (longestSubAtChar > maxSubLength) {
      maxSubLength = longestSubAtChar;
      maxSubStart = i - Math.floor((maxSubLength - 1) / 2);
    }
  }
  return s.substr(maxSubStart, maxSubLength);
}




/* 

  approach #5 - Manacher's algorithm 

  O(n) complexity 

  Runtime: 84 ms, faster than 99.76% of JavaScript online submissions for Longest Palindromic Substring.
  Memory Usage: 44.5 MB, less than 50.40% of JavaScript online submissions for Longest Palindromic

  "here's a working DP solution. I know there's an efficient but gnarly O(n) algorithm called Manacher's, but can't remember it off the top of my head" 

*/

 
var longestPalindrome = function(s) {
      
      /* Preprocess s: insert '#' between characters, so we don't need to worry about even or odd length palindromes. */
      var newStr = "#";
      for (var i = 0; i < s.length; i++) newStr += s.charAt(i) + "#";
      /* Process newStr */
      /* dp[i] is the length of LPS centered at i */
      var dp = [];
      /**
       * For better understanding, here we define "friend substring", or "friend":
       * "friend substring" has the largest end-index in all checked substrings that
       * are palindromes. We start at friendCenter = 0 and update it in each cycles.
       */
      var friendCenter = 0, friendRadius = 0, lpsCenter = 0, lpsRadius = 0;
      /* j is the symmetry of i with respect to friendCenter */
      var j;
      for (var i = 0; i < newStr.length; i++) {
          /* Calculate dp[i] */
          if (friendCenter + friendRadius > i) {
              /**
               * This is the most important part of the algorithm.
               * 
               * Normally we start from dp[i] = 1 and then try to expand dp[i] by doing brute-force palindromic
               * checks. However, if i is in the range of friend (friendCenter + friendRadius > i), we can expect
               * dp[i] = dp[j] because friend is a palindrome. This only works within the range of friend, so the
               * max dp[i] we can trust = (friendEnd - i).
               * 
               * Here is an example:
               *
               *     friendStart   j             friendCenter  i     friendEnd                         
               *               |   |             |             |     |
               * String: - - d c b a b c d - - - - - - - d c b a b c ? - - - - - - - -
               *               [--------friend (palindrome)--------]
               *
               * In this example, (friendEnd - i) = 3, so we can only be certain that radius <= 3 part around i
               * is a palindrome (i.e. "cbabc" part). We still need to check the character at "?".
               */
              j = friendCenter - (i - friendCenter);
              dp[i] = Math.min(dp[j], (friendCenter + friendRadius) - i);
          }
          else {
              /* Calculate from scratch */
              dp[i] = 1;
          }
          /* Check palindrome and expand dp[i] */
          while (i + dp[i] < newStr.length && i - dp[i] >= 0 && newStr[i + dp[i]] == newStr[i - dp[i]]) dp[i]++;
          /* Check if i should become the new friend */
          if (friendCenter + friendRadius < i + dp[i]) {
              friendCenter = i;
              friendRadius = dp[i];
          }
          /* Update longest palindromic substring */
          if (lpsRadius < dp[i]) {
              lpsRadius = dp[i];
              lpsCenter = i;
          }
      }
      return s.substring((lpsCenter - lpsRadius + 1) / 2, (lpsCenter + lpsRadius - 1) / 2);
  }
  