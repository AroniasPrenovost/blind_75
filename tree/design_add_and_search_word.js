/* 
  
  Design a data structure that supports adding new words and finding if a string matches any previously added string.

  Implement the WordDictionary class:

  WordDictionary() Initializes the object.
  void addWord(word) Adds word to the data structure, it can be matched later.
  bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.

  Example:

    Input
    ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
    [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
    Output
    [null,null,null,null,false,true,true,true]

  Explanation
    WordDictionary wordDictionary = new WordDictionary();
    wordDictionary.addWord("bad");
    wordDictionary.addWord("dad");
    wordDictionary.addWord("mad");
    wordDictionary.search("pad"); // return False
    wordDictionary.search("bad"); // return True
    wordDictionary.search(".ad"); // return True
    wordDictionary.search("b.."); // return True
    

  Constraints:

    1 <= word.length <= 500
    word in addWord consists lower-case English letters.
    word in search consist of  '.' or lower-case English letters.
    At most 50000 calls will be made to addWord and search.

*/ 




/* 


  approach #1 - hashmap 


*/ 



/**
 * Initialize your data structure here.
 */
 var WordDictionary = function() {
  this.m = new Map(); // (length x, list of strings of length x)
  // T.C: O(1)
};

/** 
* @param {string} word
* @return {void}
*/
WordDictionary.prototype.addWord = function(word) {
  let len = word.length;
  if (this.m.has(len)) {
      this.m.get(len).push(word);
  } else {
      this.m.set(len, [word]);
  }
  // T.C: O(1)
};

/** 
* @param {string} word
* @return {boolean}
*/
WordDictionary.prototype.search = function(word) {
  let len = word.length;
  if (!this.m.has(len)) {
      return false;
  }
  let words = this.m.get(len);
  for (let i = 0; i < words.length; i++) {
      let match = true;
      for (let j = 0; j < words[i].length; j++) {
          if (word[j] !== "." && word[j] !== words[i][j]) {
              match = false;
              break;
          }
      }
      if (match) {
          return true;
      }
  }
  return false;
  // T.C: O(k*N), where k = length of word, N = # of words
};

/** 
* Your WordDictionary object will be instantiated and called as such:
* var obj = new WordDictionary()
* obj.addWord(word)
* var param_2 = obj.search(word)
*/







/* 


  approach #2 - Trie and DFS, Heavily Commented Clear Solution


*/ 

function Node () {
  // children object to store children nodes
  this.children = {};
  
  // boolean to check if the current node represents a letter that is the ending of a word
  this.isWordEnding = false;
  
  // note: you might also want to store this.char here for debugging purposes or for different problems.
}

var WordDictionary = function() {
  // the root is a node itself.
  this.root = new Node();
};

WordDictionary.prototype.addWord = function(word) {
  // we will traverse the trie starting from the root node and add nodes for each letter in word.
  let currentNode = this.root;
  
  for (const char of word) {
      // if a node exists for a given letter then don't do anything.
      // if not create a new node for that letter.
      currentNode.children[char] = currentNode.children[char] || new Node();
      
      // move on to the next node.
      currentNode = currentNode.children[char];
  }
  
  // after looping, the currentNode variable will point to the node representing the last letter of word.
  // so we mark that node as a word ending.
  currentNode.isWordEnding = true;
};

WordDictionary.prototype.search = function(word) {
  // helper function to call recursively
  const searchHelper = (currentNode, i) => {
      
      // if we reach the i that's the length of word and currentNode is a word ending, word exists.
      if (i === word.length) return currentNode.isWordEnding
      
      const char = word[i]
      
      // if char is a dot, that means we can match it with any letter.
      // to do that programmatically, we go through all of the children of the current node. why?
      // we don't know which, if any, of the children can use the dot to make the given string.
      // so we go through all of them and check if any of them can return true.
      if (char === '.') {
          for (const char of Object.keys(currentNode.children)) {
              const child = currentNode.children[char];
              if (searchHelper(child, i + 1)) return true
          }
          
          // if no child can make use of the dot to come up with the given word,
          // then even the alternative version (e.g 'pad') 
          // of the given string (e.g 'pa.') doesn't exist in our dictionary.
          return false
      } 
      
      // if char isn't a dot, it's more straightforward...
      else {
          // looking for a letter that should come after another and can't find it?
          // that means the word doesn't exist in our dictionary so return false.
          if (!(char in currentNode.children)) return false
          
          // go on to the next node in our dictionary and the next letter in the word
          return searchHelper(currentNode.children[char], i + 1)
      }
  }
}
  
  




/* 

  approach #3 - Using a Trie and backtracking to find solutio

  Before you do this problem, I highly suggest you finish Implementing a Trie problem. That is a pre-req for this problem. In addition, understanding recursion and backtracking is essential.

  If we find a period, we basically use it as a DFS search in the sense that we iterate through all neighbors of a node.

  Also, remember that for a trie the neighbors is a hashmap. This gives us O(1) lookup for neighbors (letters).

*/ 


class Node {
	constructor(letter) {
		this.isWord = false;
		this.letter = letter;
		this.neighbors = {}; // neighbors with O(1) lookup
	}
}

class Trie {
	constructor() {
		this.head = new Node();
	}

	insert(word) {
		let mover = this.head;

		for (var i = 0; i <= word.length - 1; i++) {
			let letter = word[i];

			if (!(letter in mover.neighbors)) {
				mover.neighbors[letter] = new Node(letter);
			}

			mover = mover.neighbors[letter];
		}

		mover.isWord = true;
	}

	search(word) {
		let mover = this.head;

		for (var i = 0; i <= word.length - 1; i++) {
			let letter = word[i];

			if (!(letter in mover.neighbors)) return false;

			mover = mover.neighbors[letter];
		}

		return mover.isWord; // boolean
	}

	startsWith(prefix) {
		let mover = this.head;

		for (var i = 0; i <= prefix.length - 1; i++) {
			let letter = prefix[i];

			if (!(letter in mover.neighbors)) return false;

			mover = mover.neighbors[letter];
		}

		return true; // boolean
	}
}

class WordDictionary {
	constructor() {
		this.trie = new Trie();
	}

	addWord(word) {
		this.trie.insert(word);
	}

	// We need to iterate through the trie head
	search(word) {
		let mover = this.trie.head;

		return this.dfsSearch(mover, word, 0);
	}

	dfsSearch(head, word, index) {
		let letter = word[index];

		if (word.length - 1 === index && letter in head.neighbors) {
			return head.neighbors[letter].isWord;
		} else if (word.length - 1 === index && letter === '.') {
			for (const neighbor in head.neighbors) {
				if (head.neighbors[neighbor].isWord) return true;
			}
		}

        // IF we find a period, we need to iterate through each of its neighbors
        // if none of the neighbors are a fit, we return false
		if (letter === '.') {
			let neighbors = Object.keys(head.neighbors); // keys
			// Iterate through each neighbor
			for (const neighbor of neighbors) {
				if (this.dfsSearch(head.neighbors[neighbor], word, index + 1))
					return true;
			}
			return false;
		} else if (!(letter in head.neighbors)) {
			return false;
		} else if (letter in head.neighbors) {
			return this.dfsSearch(head.neighbors[letter], word, index + 1);
		}
	}
}




/* 

  approach #4 - Breadth-First Search (BFS)

*/ 

class WordDictionary {
  constructor() {
    this.trie = {};
  }

  addWord(word) {
    let node = this.trie;
    for(const w of word) {
        if(!node[w]) node[w] = {};
        node = node[w];
    }
    node['wordBreak'] = true;
  }

  search(word) {
    const dfs = (node, str) => {
        for(let i = 0; i < str.length; i++) {
            const w = str[i];
            if(w === '.') {
                const keys = Object.keys(node);
                let j = 0;
                while(j < keys.length) {
                    if(dfs(node[keys[j]], str.slice(i + 1))) return true;
                    j++;
                }
                return false;
            }
            if(!node[w]) return false;
            node = node[w];
        }
        return node.wordBreak === true;
    }
    
    return dfs(this.trie, word);
  }
}