/* 

Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

 

Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

 

Constraints:

    1 <= s.length <= 2 * 105
    s consists only of printable ASCII characters.



    o(n)

*/ 

/* 

  Approach #1: Compare with reverse

  Runtime: 88 ms, faster than 92.89% of JavaScript online submissions for Valid Palindrome.
  Memory Usage: 43.3 MB, less than 39.19% of JavaScript online submissions for Valid Palindrome.

*/ 

var isPalindrome = function(s) {
  s = s.toLowerCase();                        
  let str = s.replace(/[^a-z0-9]/gi, '');            // non spaces and punctuation
  var strReverse = str.split('').reverse().join('');  
  
  return (str == strReverse);
};

console.log(isPalindrome("A man, a plan, a canal: Panama")); 



/* 

  Approach #2: Two Pointers

  start at both ends and iterate inwards, comparing the elements at each 'step' in

  Runtime: 100 ms, faster than 51.39% of JavaScript online submissions for Valid Palindrome.
  Memory Usage: 40.9 MB, less than 78.65% of JavaScript online submissions for Valid Palindrome.

    Thoughts on Solution Complexity:

    Time: need to check every char in string at least once (at most 3 times?: replace, toLowerCase, main loop) → O(n)
    Space: need extra space for converted string in memory → O(n)
    where n = length of input string


*/ 

var isPalindrome = function(s) {

    let str = s.replace(/[^0-9A-Za-z]/gmi,'').toLowerCase();
    let i = 0; 
    let j = str.length - 1;
    
    while (i < j) {
      if (str[i] !== str[j]) {
        return false;
      }
      i++;
      j--;
    }
    return true;
  };
