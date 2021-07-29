/* 

  Given a string s, find the length of the longest substring without repeating characters.
  Example 1:

  Input: s = "abcabcbb"
  Output: 3
  Explanation: The answer is "abc", with the length of 3.
  Example 2:

  Input: s = "bbbbb"
  Output: 1
  Explanation: The answer is "b", with the length of 1.
  Example 3:

  Input: s = "pwwkew"
  Output: 3
  Explanation: The answer is "wke", with the length of 3.
  Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
  Example 4:

  Input: s = ""
  Output: 0

*/ 

/* 

  approach #1 - brute force 

 

*/ 









/* 

  approach #2 - 2 pointers 

  O(n)

    we only iterate once through the entire collection.
    Space: O(n)
    if we have a duplicate free string than its O(n)

*/ 

function lengthOfLongestSubstring(s) {
  
  if(s.length < 2) return s.length;
  let char_set = new Set(s[0]); // initially just add the first char to the set.
  let left_char_index = 0;
  let longest_substring_length = 0;

  for (let right_char_index = 1; right_char_index < s.length; right_char_index++) {
    // Check for duplicates, remove them, update left pointer
    while (char_set.has(s[right_char_index])) {
        char_set.delete(s[left_char_index]);
        left_char_index++;
    }
    char_set.add(s[right_char_index]); 
    longest_substring_length = Math.max(longest_substring_length, char_set.size);
  }

  return longest_substring_length;
};










/* 

  approach #3 - sliding window ( hashmap )

  O(n) 

*/ 

var lengthOfLongestSubstring = function(s) {
  const map = {};
  let left = 0,
      right = 0,
      max_len = 0;
  
  while(right < s.length) {
      if(s[right] in map && map[s[right]] >= left) {
          left = map[s[right]] + 1;
      }
      map[s[right]] = right;
      ++right;
      
      max_len = Math.max(max_len, right - left);
  }
  return max_len;
}

/* O(n) again */ 

var lengthOfLongestSubstring = function(s) {
  const map = new Map();
  let left = 0;
  let right = 0;
  let maxL = 0;
  
  while(right < s.length) {
    if(map.has(s[right])) {
        left = Math.max(left, map.get(s[right]) + 1);
    }

    maxL = Math.max(right - left + 1, maxL);
    map.set(s[right], right);
    right++;
  }

  return maxL;
};


/* v.3 --- sliding window ( map ) */ 

var lengthOfLongestSubstring = function(s) {
  
  let letters = new Map()
  let highestLength = 0
  let length = 0

  // loop thru s until you find a repeating character and then slide and move to the letter of the repeating charcter
  for(i = 0; i < s.length; i++) {
    
    // this checks if a letter is no longer need for e.i abba when you go to b a is no longer used so you increase the length since it doesn't exist anymore
    if(letters.get(s[i]) !== undefined && letters.get(s[i]) >= i - length) {
        length = i - letters.get(s[i])
    } else {
        length++
    }

    letters.set(s[i], i)
    highestLength = Math.max(highestLength, length)
  }
  
  return highestLength
};


/* v.3 --- sliding window ( set ) */ 


var lengthOfLongestSubstring = function(s) {
  const set = new Set();
  let max = (l = r = 0);

  while (r < s.length) {
    if (!set.has(s[r])) {
      set.add(s[r++]);
      max = Math.max(max, set.size);
    } else set.delete(s[l++]);
  }
  return max;
};


/* 

  approach #v.4 - sliding window ( queue )

  O(n^2)  

  Runtime: 108 ms, faster than 83.75% of JavaScript online submissions for Longest Substring Without Repeating Characters.
  Memory Usage: 39.7 MB, less than 99.87% of JavaScript online submissions for Longest Substring Without Repeating Characters.

*/


var lengthOfLongestSubstring = function(s) {
  const queue = [];
  let left = 0,
      right = 0,
      max_len = 0;
  
  while(right < s.length) {
      while(queue.indexOf(s[right]) !== -1) {
         queue.shift();
          ++left;
      }
      queue.push(s[right]);
      ++right;
      
      max_len = Math.max(max_len, queue.length);
  }
  return max_len;
}





/* another sliding window */ 

/* 

  Runtime: 104 ms, faster than 89.73% of JavaScript online submissions for Longest Substring Without Repeating Characters.
  Memory Usage: 43.2 MB, less than 75.32% of JavaScript online submissions for Longest Substring Without Repeating Characters.

*/ 

var lengthOfLongestSubstring = function(s) {
  //slide window
  let count = 0;

  if(s.length < 1){
      return 0;
  }

  let i = 0;
  let j = 0;
  let n = s.length;

  let map = new Map();

  while (i < n && j < n) {
    let char = s[j];

    if (!map.has(char)) {
      map.set(char)
      j++;
      count = Math.max(count,j - i);
    } else {
      map.delete(s[i]);
      i++;
    }
  }

  return count;
}


/* *no map necessary */ 

var lengthOfLongestSubstring = function(s) {
  let longest = 0;
  let current = '';
  
  for (let i = 0; i < s.length; i++) {
    current = current.substring(current.indexOf(s[i]) + 1)        
    current += s[i];
    
    if (current.length > longest) {
        longest = current.length;
    }
  }
  
  return longest;
}