/* 

  Given an array of strings strs, group the anagrams together. You can return the answer in any order.

  An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

  

  Example 1:

  Input: strs = ["eat","tea","tan","ate","nat","bat"]
  Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
  Example 2:

  Input: strs = [""]
  Output: [[""]]
  Example 3:

  Input: strs = ["a"]
  Output: [["a"]]
  

  Constraints:

  1 <= strs.length <= 104
  0 <= strs[i].length <= 100
  strs[i] consists of lower-case English letters.



  So basically sort the each string and add it our map and push it to array and finally return

*/ 


/* 

  approach #1 - categorized by sorted string 

    - intuition: Two strings are anagrams if and only if their sorted strings are equal.

       O(n) * O(m log m)
        - n is the length of the array
        - m is the word
    
    Runtime: 128 ms, faster than 83.49% of JavaScript online submissions for Group Anagrams.
    Memory Usage: 48.8 MB, less than 88.65% of JavaScript online submissions for Group Anagrams.
*/ 

var groupAnagrams = function(strs) {
  //step 1 create a map
  let map = new Map()
  getMap(map, strs)
  
  let result = []
  getResult(map, result)
  
  return result;
};

const getMap = (map, strs) => {
  let sorted, arr;
  for(let word of strs){
      //sort the string, any anagram will be equal to each other once it is sorted
      // so turn into array sort and turn into string
      sorted = word.split("").sort().join("")

      if(map.has(sorted)){
        //if the map has the sorted string that means is an anagram so make the sorted
        //string a key to an array of the anagram words
        arr = map.get(sorted)
        arr.push(word)
        map.set(sorted, arr)
      }else{
        // if the map doest have that sorted word create key of sorted with a value
        // of the unsorted word
        map.set(sorted, [word])
      }
  }
}

const getResult = (map, result) => {
//iterate over the map and simply push the array in the map to the result
  map.forEach((value, key) => {
      result.push(value)
  })
}

/* v.2 */ 



var groupAnagrams = function(strs) {
  if (strs.length === 1) {
      return [strs];
  }
  
  let scored  = {};
  let output = [];

  for (let str of strs) {
      let currentScore = str.split('').sort().join('');
      if (scored[currentScore] !== undefined) {
          output[scored[currentScore]].push(str);
      } else {
          scored[currentScore] = output.length;
          output.push([str]);
      }
  }
  return output;
}

/* v.3 */ 


var groupAnagrams = function(strs) {
    
  if(strs <= 1) return [strs];
  
  let resultArray = [];
  let mapObject = {};
  let i = 0;
  
  for(let str of strs){
      let tempString = str;
      str = str.split('').sort().join('')
      if(mapObject[str] !== undefined){
         resultArray[mapObject[str]].push(tempString)
     } else {
         resultArray[i] = [tempString];
         mapObject[str] = i
         i++
     }
  }
  
  return resultArray
};


/* v.4 */ 

var groupAnagrams = function(strs) {
  let map = new Map();
  
  for (let i = 0; i < strs.length; i ++) {
    let str = strs[i];
    sortedStr = str.split('').sort();
    if(!map[sortedStr]) {
        map[sortedStr] = [str]
    } else {
        map[sortedStr].push(str);
    }
  }

  return Object.values(map);
}

/* v.5 */ 

const groupAnagrams = strs => {
  const map = {};
  for (let str of strs) {
    const sorted = str.split('').sort().join('');
    map[sorted] !== undefined ? map[sorted].push(str) : map[sorted] = [str];
  }
  return Object.values(map);
};

/* 

  approach #2 - categorize by count 

    - intuition: Two strings are anagrams if and only if their character counts (respective number of occurrences of each character) are the same.

    We can transform each string \text{s}s into a character count, \text{count}count, consisting of 26 non-negative integers representing the number of \text{a}a's, \text{b}b's, \text{c}c's, etc. We use these counts as the basis for our hash map.

    Runtime: 128 ms, faster than 83.49% of JavaScript online submissions for Group Anagrams.
    Memory Usage: 49.3 MB, less than 74.74% of JavaScript online submissions for Group Anagrams.
    
*/ 


/**
 * @param {string[]} strs
 * @return {string[][]}
 *
 * key point: 
 * prime multiply prime is unique, each char canbe represented by a prime
 * since [a-z] to  [0-25]
 * use `[charCodeAt() - 97]` to get unique index from the prime array
 * the prodcut can be set to the key name "prod"
 **/
 var groupAnagrams = function (strs) {
  const map = {};
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];

  strs.forEach(str => {
    let prod = str.split("").reduce((r, c) => r * primes[c.charCodeAt() - 97], 1);
    map[prod] ? map[prod].push(str) : map[prod] = [str];
  });
  return Object.values(map);
};


/* v.2 */ 

var groupAnagrams = function(strs) {
  const map = {};
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
  
  for (var i = 0; i < strs.length; i++) {
    let prod = strs[i].split("").reduce((r, c) => r * primes[c.charCodeAt() - 97], 1);
    map[prod] ? map[prod].push(strs[i]) : map[prod] = [strs[i]]
  }  
    
  return Object.values(map);
}



/* 

  v.3 
  
  Runtime: 120 ms, faster than 94.96% of JavaScript online submissions for Group Anagrams.
  Memory Usage: 50.3 MB, less than 41.01% of JavaScript online submissions for Group Anagrams.

*/

var groupAnagrams = function(strs) {
  const prime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103]; 
  let res = {};

  for(let i = 0; i<strs.length;i++){
    let key = 1;
    for(let j = 0;j<strs[i].length;j++){
      key *= prime[strs[i][j].charCodeAt(0)-'a'.charCodeAt(0)];
    }
    if(res[key]!==undefined){
      res[key].push(strs[i]);
    }else{
      res[key]=[strs[i]];
    }	
  }

  return Object.values(res);
}