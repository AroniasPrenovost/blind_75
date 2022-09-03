/* 

  You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

  Return the length of the longest substring containing the same letter you can get after performing the above operations.

  Example 1:

  Input: s = "ABAB", k = 2
  Output: 4
  Explanation: Replace the two 'A's with two 'B's or vice versa.
  Example 2:

  Input: s = "AABABBA", k = 1
  Output: 4
  Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
  The substring "BBBB" has the longest repeating letters, which is 4.
  

  Constraints:

  1 <= s.length <= 105
  s consists of only uppercase English letters.
  0 <= k <= s.length

*/ 




/* 

  approach #1 - 2 pointer solution ( sliding window )

  Runtime: 76 ms, faster than 99.80% of JavaScript online submissions for Longest Repeating Character Replacement.
  Memory Usage: 40.2 MB, less than 22.95% of JavaScript online submissions for Longest Repeating Character Replacement.

*/ 


var longestRepeatingCharacterReplacement = function(s, k) {
  let mostFreq = -Infinity, max = -Infinity;
  let arr = new Array(26).fill(0);
  let start = 0;

  for (let end = 0; end < s.length; end++) {
    let idx = s.charCodeAt(end) - 65;
    arr[idx] += 1;
    mostFreq = Math.max(mostFreq, arr[idx]);
    let charsToModify = (end-start+1) - mostFreq;
    // validate window (so that we can turn the current window into substring w/
    // the same characters using k modifications)
    // we simply need to advance `start` pointer by 1 to validate window
    // Why? window size - mostFreq = # of characters to modify, right?
    // window size just got smaller by, so # of characters to modify also just got
    // smaller by 1. Most freq value may stay unchanged or decrease by 1. There is
    // no chance that it increases by reducing window size hence there is no need to
    // worry about it
    if (charsToModify > k) {
        let idx2 = s.charCodeAt(start) - 65;
        arr[idx2] -= 1;
        start++;
    }
    // Keep track of the maximum valid substring length 
    max = Math.max(max, end-start+1);
  }

  return max;
  // T.C: O(N)
  // S.C: O(1)
};






/* 

  v.2 pointer solution 

  Maintain left and right pointer, max instances of a single char, and visit counts for each char.
  for each char in string
  - increment visit count for this char
  - if new visit count is higher than max, update max
  - if length of current string without max char count is greater than k,
    - then we know the new char made it such that there are more chars missing than can be replaced by k,
    - so we will remove the first char
    - and increment left pointer
  - increment right pointer to look at next char.
In the end, the answer is whatever the window size is. This is because we never shrink the window size.
   - As we look at new chars, we increase the window size.
  - Once we see we can no longer increase due to limitation of k, we slide the window forward.
    - In these inbetween states, it's possible the window doesn't span a valid subset,
      - but that doesn't matter because the window size at one point did span a valid set.
    - Instead, we wait until there's a possibility of a better set, which is when there is a substring with more instances of some char.  

*/ 

const longestRepeatingCharacterReplacement = (s, k) => {
  let left = 0;
  let right = 0;
  let maxCharCount = 0;
  const visited = {};

  while (right < s.length) {
    const char = s[right];
    visited[char] = visited[char] ? visited[char] + 1 : 1;

    if (visited[char] > maxCharCount) maxCharCount = visited[char];

    if (right - left + 1 - maxCharCount > k) {
      visited[s[left]]--;
      left++;
    }

    right++;
  }

  return right - left;
};




/* 

  v.3 solution 

  Time Complexity: O(N)

*/ 

var longestRepeatingCharacterReplacement = function(s, k) {
  let left = 0;
  let right = 0;
  let mostFreq = 0;
  let maxLen = 0;
  let freqMap = {};
  
  for(right = 0; right < s.length; right++) {
      freqMap[s[right]] = freqMap[s[right]] + 1 || 1;
      mostFreq = Math.max(freqMap[s[right]], mostFreq);
      
      while(right-left+1 - mostFreq > k) {
          freqMap[s[left]] -= 1;
          left++;
      }
      maxLen = Math.max(right-left+1, maxLen);
  }
  return maxLen;
};

console.log(longestRepeatingCharacterReplacement('ABA', 1)); // 3 
console.log(longestRepeatingCharacterReplacement('AABABBA', 1)); // 4 


/* 

  v.4 - Sliding Window Technique with left and right pointers
  
  Within the winodw, we define its length using right - left + 1, in addition, we define the most frequent character's count using mostFreq. 
  
  If the length - mostFreq > k, this means we exceeded our operation limit to make the current window a valid string. Thus, we need to shrink left pointers.

*/ 
 var longestRepeatingCharacterReplacement = function(s, k) {
  let left = 0, right = 0, max = 0, mostFreq = 0;
  let freqHash = {};
  
  for (let right=0;right<s.length;right++) {
      freqHash[s[right]] = freqHash[s[right]] + 1 || 1;
      mostFreq = Math.max(mostFreq, freqHash[s[right]]);
      while(right - left + 1 - mostFreq > k) {
          freqHash[s[left]]-=1;
          left++;
      }
      max = Math.max(max, right - left + 1);
  }
  
  return max;    
};
