/* 

  Write a function to find the longest common prefix string amongst an array of strings.

  If there is no common prefix, return an empty string "".


  Example 1:

    Input: strs = ["flower","flow","flight"]
    Output: "fl"s
    Example 2:

    Input: strs = ["dog","racecar","car"]
    Output: ""
    Explanation: There is no common prefix among the input strings.
    

  Constraints:

  1 <= strs.length <= 200
  0 <= strs[i].length <= 200
  strs[i] consists of only lowercase English letters.

*/ 

/* 

  #1 - horizontal scanning 





  Complexity Analysis

    Time complexity : O(S) , where S is the sum of all characters in all strings.

    In the worst case all nn strings are the same. The algorithm compares the string S1 with the other strings
    ​
    There are S character comparisons, where S is the sum of all characters in the input array.

    Space complexity : O(1). We only used constant extra space.

*/ 


/* fast */ 

const longestCommonPrefix = (strs) => {
  if (!strs.length) return '';

  let prefix = strs[0];

  for (let i = strs.length; --i;) {
    for (;strs[i].indexOf(prefix) !== 0;) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (!prefix.length) return '';
    }
  }

  return prefix;
};

console.log(longestCommonPrefix(["flower","flow","flight"]));
console.log(longestCommonPrefix(["dog","racecar","car"]));

/* 

  a little more understandable 

*/

var longestCommonPrefix = function(strs) {
  let prefix = '';
  
  if (strs.length === 1) {
    return strs[0];
  }

  for (let i = 0; i < strs[0].length; i++) {
    let currentChar = strs[0][i];
    if (currentChar && strs.every((s) => s[i] == currentChar)) {
        prefix += currentChar;
    } else {
        return prefix;
    }
  }
  
  return prefix;
};

console.log(longestCommonPrefix(["flower","flow","flight"]));
console.log(longestCommonPrefix(["dog","racecar","car"]));


/* 

  maybe more understandable?

*/ 

var longestCommonPrefix = function(strs) {
  if(strs.length === 0) {
      return '';
  }

  if(strs.length === 1) {
      return strs[0];
  }
  
  let prefix = strs[0];
  for(let i = 1; i < strs.length; i++) {
    while(strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1); // remove last character from the string
      if(!prefix) {
        return '';
      } 
    }
  }
  
  return prefix;
};


console.log(longestCommonPrefix(["flower","flow","flight"]));
console.log(longestCommonPrefix(["dog","dogracecar","dogcar"]));


/* 


  this is a little better... 

*/ 

var longestCommonPrefix = function(strs) {
  let prefix = strs[0];


  
  for(let i = 1; i < strs.length; i++) {
    console.log('prefix', prefix)
    let item = strs[i];
    
    while(prefix !== "" && item.indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, (prefix.length - 1));    
    }
  }

  return prefix;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog", "dogracecar", "dogcar"]));
console.log(longestCommonPrefix(["do", "racecar", "arrange"]));


/* 

  another try... 

*/

var longestCommonPrefix = function(strs) {
	let prefix = '';
	let prev = '';

	if (strs.length === 1 ) {
    return strs[0];
  }

	if (strs[0].length === 0 ) {
    return prefix;
  }

	for (let l=0; l<strs[0].length; l++){
		if (strs[l]?.length === 0 ) {
      return strs[l];
    }

		prev = prefix;
		prefix += strs[0][l];

		for (let i=0; i<strs.length; i++){
		  if(!strs[i].startsWith(prefix)) {
        return prev;
      }
		}
	}
	return prefix;
}

console.log(longestCommonPrefix(["flower","flow","flight"]));
console.log(longestCommonPrefix(["dog","dogracecar","dogcar"]));
