/*



    Given two strings s and t, return true if t is an anagram of s, and false otherwise.

    

    Example 1:

    Input: s = "anagram", t = "nagaram"
    Output: true

    Example 2:

    Input: s = "rat", t = "car"
    Output: false

    

    Constraints:

        1 <= s.length, t.length <= 5 * 104
        s and t consist of lowercase English letters.

    

    Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?



*/


/*

  Approach #1 - sorting 

  Runtime: 116 ms, faster than 28.48% of JavaScript online submissions for Valid Anagram.
  Memory Usage: 44.2 MB, less than 29.33% of JavaScript online submissions for Valid Anagram.

*/ 

var isAnagram = function(s, t) {
  s = s.toLowerCase().split('').sort().join(''); 
  t = t.toLowerCase().split('').sort().join(''); 
  return t == s; 
};


/*

  Approach #2 - hashing 

  Runtime: 112 ms, faster than 36.55% of JavaScript online submissions for Valid Anagram.
  Memory Usage: 39.5 MB, less than 97.03% of JavaScript online submissions for Valid Anagram.

*/ 

var isAnagram = function(s, t) {
  if (s.length !== t.length) return false;

  let map = new Map();
  
  for (let i = 0; i < s.length; i ++) {
      !map[s[i]] ? map[s[i]] = 1 : map[s[i]] ++
  }
  
  for (let i = 0; i < t.length; i ++) {
      if(map[t[i]]) {
          map[t[i]] --;
      } else {
        return false;
      }
  }
  return true
};



/* 

    Approach #3

    O(N) Space Complexity

    Runtime: 104 ms, faster than 49.51% of JavaScript online submissions for Valid Anagram.
    Memory Usage: 40.8 MB, less than 69.04% of JavaScript online submissions for Valid Anagram.


*/


function isAnagram(s, t) {
  if (s.length !== t.length) return false; //Edge

  let map = {};
  let map1 = {};

  for (let char of s) map[char] = map[char] + 1 || 1;

  for (let char of t) map1[char] = map1[char] + 1 || 1;
      
  for (let key in map){
      if (map[key] !== map1[key]) return false; //Char freq must match between s and t for there to be a valid anagram
  }
  return true;
}

/* 

    Approach #4 -- what if they were unicode characters? 

    Use a hash table instead of a fixed size counter. 
    Imagine allocating a large size array to fit the entire range of unicode characters, which could go up to more than 1 million. 
    A hash table is a more generic solution and could adapt to any range of characters.

    O(1) Space Complexity

    Runtime: 84 ms, faster than 96.45% of JavaScript online submissions for Valid Anagram.
    Memory Usage: 39.4 MB, less than 97.03% of JavaScript online submissions for Valid Anagram.


*/  


function isAnagram(s, t) {
    if (s.length != t.length) return false;
        
    let table = new Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        table[s.charCodeAt(i) - 97]++;
    }

    for (let i = 0; i < t.length; i++) {
        table[t.charCodeAt(i) - 97]--;
        if (table[t.charCodeAt(i) - 97] < 0) return false;
    }
    
    return true;
}



 


