/* 

  Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

  Note that the same word in the dictionary may be reused multiple times in the segmentation.

  Example 1:

        Input: s = "leetcode", wordDict = ["leet","code"]
        Output: true
        Explanation: Return true because "leetcode" can be segmented as "leet code".

  Example 2:

      Input: s = "applepenapple", wordDict = ["apple","pen"]
      Output: true
      Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
      Note that you are allowed to reuse a dictionary word.

  Example 3:

      Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
      Output: false
 

  Constraints:

  1 <= s.length <= 300
  1 <= wordDict.length <= 1000
  1 <= wordDict[i].length <= 20
  s and wordDict[i] consist of only lowercase English letters.
  All the strings of wordDict are unique.

*/ 

 





/* 

  approach #1 - brute force 


*/


var wordBreak = function(s, wordDict) {
  if(!wordDict) return false;
	
  // Create a DP table of len(s) elements, and set true when if mark index i when s(i) is a word that can be formed from wordDict
  let dp = new Array(s.length + 1);
  dp[0] = true; //word of length 0 is always true;
 
  for(let i = 1; i <= s.length; i++) {
    // i denotes that word length.
    for(let j = 0; j<i; j++) {
	  
      if(dp[i]) break; // will not need to set dp[i] if it's already true
    
      if(dp[j] && wordDict.indexOf(s.substring(i,j)) >= 0) {
        // dp[j] = previous substring, s.substring(i,j) = remaining substring
        dp[i] = true;
        break;
      }
    }
  }

  return Boolean(dp[s.length]); 
};


/* 


  approach #2 - recursion with memoization 

  Starting from the first character of the string, if it matches with the first character of any word in Dictionary, 
  we check if that entire word matches and then recursively check the rest of the string excluding that word.
  We then cache our results in the memo array

  Runtime: 76 ms, faster than 96.52% of JavaScript online submissions for Word Break.
  Memory Usage: 38.8 MB, less than 97.91% of JavaScript online submissions for Word Break.

*/ 
 

var wordBreak = function(s, wordDict, memo={}) {
    if(s in memo) return memo[s];
    if(s.length===0) return true;
    for(const word of wordDict) {
        if(s.indexOf(word)===0) {
            const suffix = s.slice(word.length);
            if(wordBreak(suffix, wordDict, memo)) {
                memo[suffix]= true; 
                return true;
            }
        }  
    }
    memo[s] = false;
    return false;
};

/* v.2 */ 

let wordBreak = function (s, wordDict){
	let memo = [];
	function backtrack(start){
		if(start === s.length)
			return true;
		if(memo[start] !== undefined)
			return memo[start];
		let value = false;
		for(let word of wordDict){
			if(s[start] === word[0]){
				if(s.substr(start, word.length) === word)
					value = value || backtrack(start+word.length)
			}
		}
		memo[start] = value;
		return memo[start];
	}
	return backtrack(0);
}






/* tablulation */ 

var wordBreak = function(target, wordDict, ) {
  var table = Array(target.length+1).fill(false);
  table[0]= true;
  for(var i=0; i<table.length; i++) {
       if(table[i]!==false) {
           for(word of wordDict){
               const newWord = target.slice(i, i+word.length)
               if(newWord === word && i+word.length<table.length) {
                   console.log(newWord, word);
                   table[i+word.length] = true;
               }
           }
       }  
  }
  return table[target.length]
};



/* 


  approach #3 - breadth-first search 


*/


var wordBreak = function(s, wordDict) {
  const wordSet = new Set(wordDict);
  const visited = Array(s.length).fill(false)
  const queue = [0];
  
  while(queue.length) {
      const start = queue.shift();
      if(visited[start]) continue;
      
      for(let end = start + 1; end <= s.length; end++) {
          if(!wordSet.has(s.slice(start, end))) continue;
          if(end === s.length) return true;
          queue.push(end);
      }
      visited[start] = true;
  }
  return false;    
};



/* v.2 */ 

const wordBreak = (s, wordDict) => {
  if (wordDict == null || wordDict.length === 0) return false;
  const set = new Set(wordDict);

  // When s = 'catsandog', wordDict = ['cats', 'ca', 'ts']
  // After 'cats' and 'ca', it will become 'andog', 'tsandog'
  // For 'tsandog', after 'ts', it will become 'andog' again, visited set here is for memoization
  const visited = new Set();
  const q = [0];

  while (q.length) {
    const start = q.shift();

    if (!visited.has(start)) {
      for (let end = start + 1; end <= s.length; end++) {
        if (set.has(s.slice(start, end))) {
          if (end === s.length) return true;
          q.push(end);
        }
      }
      visited.add(start);
    }
  }
  return false;
};





/* 


  approach #4 - dynamic programming 


*/



var wordBreak = function (s, wordDict) {
  const dp = (str, memo) => {
      if (!str) return true;
      if (memo.has(str)) return memo.get(str);
      let i = wordDict.length;
      while (i--) {
          const word = wordDict[i];
          if (str.slice(0, word.length) == word) {
              memo.set(str, true);
              if (dp(str.slice(word.length), memo)) {
                  return true;
              }
          }
      }
      memo.set(str, false);
      return false;
  }

  return dp(s, new Map());
};




/* v.2 */ 

const wordBreak = (s, wordDict) => {
  if (wordDict == null || wordDict.length === 0) return false;

  const set = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let end = 1; end <= s.length; end++) {
    for (let start = 0; start < end; start++) {
      const w = s.slice(start, end);
      if (dp[start] === true && set.has(w)) {
        dp[end] = true;
        break;
      }
    }
  }
  
  return dp[s.length];
};







/*    alpha    */ 

// Brute force with Recursive:

var wordBreak = function(s, wordDict) {
    // Initiate the start index to run the loop
    let start = 0;

    //Recursive functions
    return wordBreakRecursive(s, wordDict, start);
};

function wordBreakRecursive(s, wordDict, start) {

    // Create a wordDic Set * not necessary we can use array itself
    let wordSet = new Set(wordDict);

    // Check for the start and s.length
    if(start == s.length) {
        return true
    }

    // run the loop from start + 1 because last index of previous recursive plus + 1 to move forward
    // ex - leet which ends at index 3 so to run the loop which should start at code which is index 4 
    for(let end = start + 1; end <= s.length; end++) {

        // Check for substring exist in word Dic and also check for recursive return true where we pass end index which is start of recursive function
        if(wordSet.has(s.substring(start, end)) && wordBreakRecursive(s, wordDict, end)) {
            return true;
        }
    }

    // Return false if we did not find any match and recursive function return false
    return false;

}

// Brute force with Recursive w/ memoization
//    Time Complexity : O(n^2)
//    Space Complexity: O(n)


var wordBreak = function(s, wordDict) {
    // Initiate the start index to run the loop
    let start = 0;

    // Create a memo array
    const memo = new Array(s.length);

    //Recursive functions
    return wordBreakRecursive(s, wordDict, start, memo);
};

function wordBreakRecursive(s, wordDict, start, memo) {

    // Create a wordDic Set * not necessary we can use array itself
    let wordSet = new Set(wordDict);

    // Check for memo value
    // If memo value exist than we can directly keep the recursive and return the value so that we don't need to repeat the recursive path where we already pass
    if(memo[start] !== undefined) {
        return memo[start];
    }

    // Check for the start and s.length
    if(start == s.length) {
        return true
    }

    // run the loop from start + 1 because last index of previous recursive plus + 1 to move forward
    // ex - leet which ends at index 3 so to run the loop which should start at code which is index 4 
    for(let end = start + 1; end <= s.length; end++) {

        // Check for substring exist in word Dic and also check for recursive return true where we pass end index which is start of recursive function
        if(wordSet.has(s.substring(start, end)) && wordBreakRecursive(s, wordDict, end, memo)) {
            return memo[start] = true;
        }
    }
	// Return the memo for start index if did not match
    return memo[start] = false;

}