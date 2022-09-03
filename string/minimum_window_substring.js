/* 

    approach #1.1


    Time Complexity: O(S + T) where S and T are the respective lengths of strings s and t
    Space Complexity: O(S + T)

    Intuition

    This is actually very similar to the Permutation in String problem. The difference is that we don't match based on string length since we aren't finding an exact permutation/anagram. Instead, we want the minimal substring which means that we move our window based on finding the smallest possible solution that takes care of the counts of all the characters in t. However, instead of keeping track of checking the exact count of each character each time we encounter a matching a character in s, we instead only need to keep track of how many unique characters there are in t and when a unique character goes down to 0 (or less, since having more characters than we need is okay too). Since the length only goes down each time a character reaches exactly 0, we will never reach the count of all unique characters until every unique character has reached 0.

    The key insight is that once we find the first substring that satisfies the condition, we need to start moving the left part of the window until we have the minimal substring that satisfies it since we don't necessarily need all the characters on the left. In the test case provided:

    s = "ADOBECODEBANC"
    t = "ABC"

    The minimal substring is just BANC, but we won't encounter it until we've covered all of s. At that point, we need to trim our substring from the left until we get to the minimal substring which can be accomplished with a while loop that moves the left pointer while the substring condition is true.

*/ 
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if (t.length > s.length) return '';
    
    const neededChars = {};
    
    for (let char of t) {
        neededChars[char] = (neededChars[char] || 0) + 1;
    }
    
    let left = 0;
    let right = 0;
    let neededLength = Object.keys(neededChars).length;
    let substring = '';
    
    while (right < s.length) {
        const rightChar = s[right];
        neededChars[rightChar]--;
        if (neededChars[rightChar] === 0) {
            neededLength--;
        }
        
        while (neededLength === 0) {
            if (!substring || substring.length > right - left + 1) {
                substring = s.slice(left, right + 1);
            }
            
            const leftChar = s[left];
            // If the leftChar in charMap is at exactly 0 before being 
            // incremented, we now need more leftChars so that its count
            // in charMap goes down to exactly 0
            if (neededChars[leftChar] === 0) {
                neededLength++;
            }
            neededChars[leftChar]++;
            left++;
               
        }
        
        right++;
    }
    
    return substring;
};

console.log(minWindow('ADOBECODEBANC', 'ABC')); // 'BANC'
















/* 

  approach #1.2 - sliding window 

  SUMMARY
  Use two pointers(left & right) to :

  Find a valid window (a substring that contains all the characters we need to match)
  Check if this valid window is the shortest known valid window. If it is, update your answer.
  Minimize the valid window. If it is still valid repeat step 2.
  Repeat steps 1 - 3 for the entirety of the input string.

 
*/ 

  // heavily commented and exclicit variable names to improve comprehension 

var minWindow = function(s, t){
  // Setup the pointers and other variables we will need
  let left = 0;
  let right = 0;
  let stringLength = s.length;
  let currentWindowMap = {};
  let numMatchedCharactersInCurrentWindow = 0;
  
  // This variable is used to return our eventual answer...
  // think of it as [currentLeftPosition, currentRightPosition, smallestKnownResultLength ]
  let currentMinimumRangeAndLength = [0, stringLength -1, Infinity];

  // Null check
  if(stringLength < t.length){ return ""};
  
  // Make a map of the characters we're looking for
  let initialMap = makeCharMap(t,0);
  let charsToMatchMap = initialMap.map;

  // count how many characters we are looking for
  let numCharsToMatch = initialMap.count;

  // This while loop handles iteration of the entire input string. 
  while(right < stringLength){
      
      // Grab the string character
      let currentChar = s.charAt(right);
      
      // Record the current character to the currentWindowMap
      if(!currentWindowMap[currentChar]){
          currentWindowMap[currentChar] = 1;
      } else {
          currentWindowMap[currentChar]++;
      }
      
      // If the current character we are evaluating IS a character we are looking for
      // AND we have the exact quantity of this character with our current window then
      // increment our count of matched characters        
      if(charsToMatchMap[currentChar] && currentWindowMap[currentChar] === charsToMatchMap[currentChar]){
          numMatchedCharactersInCurrentWindow++;
      }
      
      // At this point we have a valid window and need to DECREASE the size of the window until it is 
      // no longer valid
      while(numMatchedCharactersInCurrentWindow === numCharsToMatch && left <= right ){
          let currentLeftChar = s.charAt(left);

          if(right - left + 1 < currentMinimumRangeAndLength[2]){
              currentMinimumRangeAndLength = [left, right, right - left + 1]
          }
          
          currentWindowMap[currentLeftChar]--;
          
          // Check the validity of narrowing string
          // If the map of characters in the current window is less than the quantity we need
          // to find (ie  the charsToMatchMap) then we no longer have a valid window and need to 
          // decrement our cout of the matched characters within the current window (this breaks us out
          // of this inner while loop)
          if(charsToMatchMap[currentLeftChar] && currentWindowMap[currentLeftChar] < charsToMatchMap[currentLeftChar]) {
              numMatchedCharactersInCurrentWindow--;
          }
          left++;
      }
      right++;
  }
  
  // If our minimum length is still Infinity then we did not find a valid answer and 
  // should record an empty string
  if(currentMinimumRangeAndLength[2] === Infinity){
      return "";
  }
  
  // Otherwise we DID find a valid answer and we use our references to the smallest known indexes
  // to return the substring
  return s.substring(currentMinimumRangeAndLength[0], currentMinimumRangeAndLength[1] + 1);
}


makeCharMap = (string, charsCount) => {
  let map = {};
  for(const char of string){
      if(!map[char]){
          map[char] = 1;
          // NOTE: We only increment ONCE, when the character is undefined. Incrementing for each
          // character leads to difficult handling of corner cases such as "aaaa" & "aaaa" as inputs
          charsCount++;
      } else{
          map[char]++;
      }
  }
  return {map: map, count: charsCount};
}


/* 

  approach #2 ( sliding window, same )
    
  https://leetcode.com/problems/minimum-window-substring/discuss/26808/Here-is-a-10-line-template-that-can-solve-most-'substring'-problems

  Runtime: 116 ms, faster than 46.51% of JavaScript online submissions for Minimum Window Substring.
  Memory Usage: 41.5 MB, less than 64.31% of JavaScript online submissions for Minimum Window Substring.

*/

var minWindow = function(s, t) {
  let m = new Map();
  for (let i = 0; i < t.length; i++) {
      m.set(t[i], m.get(t[i]) + 1 || 1);
  }

  let start = 0, end = 0;
  let minStart = null, minEnd = null;
  let uniqueChars = m.size; // # of unique characters in t
  while (end < s.length) {
      if (m.has(s[end])) {
          m.set(s[end], m.get(s[end]) - 1);
          // unique chars to collect decrements by 1
          if (m.get(s[end]) === 0) {
              uniqueChars -= 1;
          }
      }
      while (uniqueChars === 0 && start <= end) {
          if (minStart === null || minEnd - minStart > end - start) {
              minStart = start;
              minEnd = end;    
          }
          if (m.has(s[start])) {
              m.set(s[start], m.get(s[start]) + 1); 
              // unique chars to collect increments by 1
              if (m.get(s[start]) === 1) {
                  uniqueChars += 1;
              }
          }
          start++;
      }
      end++;
  }
  return minStart === null ? "" : s.substring(minStart, minEnd + 1);
  // T.C: O(N)
  // S.C: O(N)
};


/* 

    approach #3 ( sliding window, same )

    Runtime: 96 ms, faster than 92.44% of JavaScript online submissions for Minimum Window Substring.
    Memory Usage: 41.2 MB, less than 72.34% of JavaScript online submissions for Minimum Window Substring.
    
*/


var minWindow = function(s, t) {
    let hashTable = {};

	/* Adding all element into the hash table
	 *
	 *  explanation of hashTable[e] || 0:
	 *  If it does not exist in the hashTable, give the initial value of 0
	 */
	t.split("").forEach( e => hashTable[e] = (hashTable[e] || 0) + 1);

	// left and right variable represent two pointers which specify the window range
	// counter is used as a flag, if it is equal to 0, then the window is valid; invalid otherwise.
	let left = 0, right = 0, counter = t.length;

	// minWindowSize is the global min size of the window, we will update its value if there are smaller window size.
	let minWindowSize = Number.MAX_VALUE;
	// resultBeginIndex is used for the final output, it is the left side index of our result
	let resultBeginIndex = 0;

	/* Start shrinking the window from left, if it becomes invalid, expand its right pointer
	 *  We use counter to check if it is still valid
	 *  explanation of ++hashTable[s[left++]] > 0: if hashTable[s[left]] + 1 > 0, counter++,
	 *  then minus 1 from left pointer.
	 *
	 *  It is totally fine to write code as below:
	 *  if(hashTable[s[left]] + 1 > 0){
	 *     counter++;
	 *  }
	 *  hashTable[s[left]]++;
	 *  left++;
	 */
	while(right < s.length){
		if(hashTable[s[right++]]-- > 0) counter--;
		while(counter === 0){
			// update minWindowSize if there are smaller size
			if(right - left < minWindowSize) {
				minWindowSize = right - left;
				resultBeginIndex = left;
			}
			if(++hashTable[s[left++]] > 0){
				counter++;
			}
		}
	}

	// if the minWindowSize is never change, means there is no possible answer, so return "".
	// explanation: if (minWindowSize === Number.MAX_VALUE) return "";
	//              else return s.substr(resultBeginIndex, minWindowSize);
	return minWindowSize === Number.MAX_VALUE ? "" : s.substr(resultBeginIndex, minWindowSize);
};

 



