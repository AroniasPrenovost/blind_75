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

  approach #2 - brute force 

 

*/ 

function lengthOfLongestSubstring(s) {
  var k = 0;
  var maxLength = 0;
  for(i = 0; i < s.length; i++) {
    for (j = k; j < i; j++) {
      if (s[i] === s[j]) {
        k = j + 1;
        break;
      }
    }
    if (i - k + 1 > maxLength) {
      maxLength = i - k + 1;
    }
  }
  return maxLength;
}

console.log(lengthOfLongestSubstring('abcabcbb'));




/* 













*/ 

var lengthOfLongestSubstring = function(s) {
  var start = 0, maxLen = 0;
  var map = new Map();

  for(var i = 0; i < s.length; i++) {
    var ch = s[i];
    
    if(map.get(ch) >= start) {
        start = map.get(ch) + 1;
    }
      
    map.set(ch, i);
    
    maxLen = Math.max(maxLen, i - start + 1);
  }

  return maxLen;
};

console.log(lengthOfLongestSubstring('abcrabcbb'));









/* 

  3.1 one-pass w/ hashmap! 


  Time complexity :  O(n). Index jj will iterate nn times.

  Space complexity :  O(min(m,n)). Same as the previous approach.


*/ 

const longestSubstring = function(s) {
  let longest = 0;
  let start = 0;  // start of the current substring
  let seen = {};  // hashmap to keep track of characters in the current substring
  for (let i = 0; i < s.length; i++) {
      let char = s[i];
      if (seen[char]) {
          // if the character is in the hashmap, then we know that we have seen it before
          // so we need to update the start of the current substring
          start = Math.max(start, seen[char]);
      }
      // we add the current character to the hashmap
      seen[char] = i + 1;
      // we update the longest substring
      longest = Math.max(longest, i - start + 1);
  }
  return longest;
};

console.log(lengthOfLongestSubstring('abcabcbb'));


/* 

  Space complexity : O(min(m, n))O(min(m,n)). Same as the previous approach.
  
  We need O(k)O(k) space for the sliding window, where kk is the size of the Set. The size of the Set is upper bounded by the size of the string nn and the size of the charset/alphabet mm.

*/ 
/* 





  using a map 

*/ 


const lengthOfLongestSubstring = (s) => {
  // reference to what is needed to update maxLen
  let tempMax = 0 
  // initalize at 0 
  let maxLen = 0;
  // use Map data structure due to ease of .get() and .set() methods 
  const map = new Map();   

  for(let i = 0; i < s.length; i++) { 
      const char = s[i]; 
    
      // check to see if character has been encountered before. if so, and the index was equal to or greater than the current tempMax, reset tempMax to index it was seen plus 1. 
      // important because if the index it was last seen is less than tempMax that means tempMax isn't incremented up, making it easier to use it to update our maxLen below
      // if it was encountered at a high index that means it will be harder to increase our maxLen since there is a repeat character pretty close to the current character
      // new characters don't result in tempMax being increased since the lookup returns undefined which will return false for the evaluation
      // this makes it easy for maxLen to be increased since that calculation looks at the index we are currently at which will always be pretty high since the loop always moves right
      if (map.get(char) >= tempMax) { 
          tempMax = map.get(char) + 1; 
      }

      // always update the index number we saw a character in the map 
      map.set(char, i); 
    
      // use tempMax to determine to update maxLen or not. adding 1 here offsets the addition of 1 when tempMax is recalculated
      // its used to determine if adding the current character is to our advantage or not as tempMax holds a reference to how far away our last repeat is
      // subtracting current index from how far away last repeat gives us that difference and the 1 says to update or not. note it has to be greater for it to be worth updating
      maxLen = Math.max(maxLen, i - tempMax + 1); 
  }

  return maxLen
}







/* #2.2 one pass */ 

var lengthOfLongestSubstring = function(s) {
  var tmp = {},
      currentMaxRange = 0,
      lastRepIndex = 0,
      len = s.length,
      i;
  for(i = 0; i < len; i += 1) {
      var currentChar = s[i];
      if(typeof tmp[currentChar] !== 'undefined') {
          currentMaxRange = Math.max(currentMaxRange, i - lastRepIndex);
          lastRepIndex = Math.max(tmp[currentChar], lastRepIndex);
      } 
      tmp[currentChar] = i + 1;
      
  }
  return Math.max(currentMaxRange, i - lastRepIndex);
};


console.log(lengthOfLongestSubstring('abcabcbb'));


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
