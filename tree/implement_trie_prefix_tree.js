/* 

 
A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. 
There are various applications of this data structure, such as autocomplete and spellchecker. (autocomplete / spellcheckers)

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 

Example 1:

Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
 

Constraints:

1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 * 104 calls in total will be made to insert, search, and startsWith.


*/ 


/**
 * Initialize your data structure here.
 */
 
 
  // T.C: O(m), m = length of key
  // S.C: O(1)
 

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

/* 

  - could use a hashmap, but those are only helpful to look up the full word in o(1) time 


*/ 

 
class Trie {
  constructor() {
      this.root = {}; 
      this.endOfWord = false; 
  }
  
  insert(word) {
      let node = this.root; 
      for (const char of word) {
          // Does the character exist ? No, then we need to add it to our hash map 
          if (!(char in node)) {
            node[char] = {}; 
          }
          // Character exist, then skip that node
          node = node[char]; 
      }
      // Word is complete set to true
      node[this.endOfWord] = true; 
  }
  
  search(word) {
      let node = this.root; 
      for (const char of word) {
          // Does the character exist ? No, so its not in our trie we need to return false
          if (!(char in node)) {
            return false; 
          }
          // Node exist, so skip that character and check next 
          node = node[char]; 
      }
      // All the words have been checked, so just return if the endOfword is in the node
     return this.endOfWord in node
      
  }
  
  startsWith(prefix) {
      let node = this.root; 
      for (const char of prefix) {
          // Does prefix exist in trie? No, so return false
          if (!(char in node)) return false; 
          // Check next node
          node = node[char];
      }
      // All nodes have been checked return false
      return true;
  };
}

var trie = new Trie();
trie.insert('Aron'); 
console.log(trie.search('t')); // false
console.log(trie.search('Aron')); // true 



/* v.3 */ 

// This solution uses a terminating character of '*'.

var Trie = function() {
  this.map = {}
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  const splitWord = word.split('')
  let curr = this.map
  
  for (const letter of splitWord) {
    if (!curr[letter]) curr[letter] = {}
    curr = curr[letter]
  }
  
  curr['*'] = true
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word, prefix = false) {
  const splitWord = word.split('')
  let curr = this.map
  
  for (const letter of splitWord) {
    if (curr[letter]) curr = curr[letter]
    else {
      return false
    }
  }
  
  return prefix || (curr['*'] ?? false)
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  return this.search(prefix, true)
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
