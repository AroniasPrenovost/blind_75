/* 

  Given an m x n board of characters and a list of strings words, return all words on the board.

  Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

  

  Example 1:

      Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
      Output: ["eat","oath"]


  Example 2:

      Input: board = [["a","b"],["c","d"]], words = ["abcb"]
      Output: []
  

  Constraints:

      m == board.length
      n == board[i].length
      1 <= m, n <= 12
      board[i][j] is a lowercase English letter.
      1 <= words.length <= 3 * 104
      1 <= words[i].length <= 10
      words[i] consists of lowercase English letters.
      
      All the strings of words are unique.

*/ 


/*

  approach #1 

  Most of the solutions*, including the top rated one do not implement pruning. The reason is because it's quite a bit more difficult to reason about. However, pruning improves the runtime massively. It is most likely the difference between a hire vs a strong hire when interviewing.

  For Javascript,
    Without pruning: 900ms
    With pruning: 130ms
  
  *The leetcode official solution does implement pruning, but we can prune even more aggressively. The official solution also requires keeping track of the parent node, which I find a little confusing. Tbh, I'm a little unsure of how my solution compares with the official solution. The official solution travels down unnecessary paths, but leaf node removal is very efficient. On the other hand, my solution's remove() method is a little expensive every time we find a word, but could possibly be worth it due to better pruning. Please let me know in comments what you think.

  Algorithm

    The main algorithm is still pretty standard, but we introduce prefixCount and remove() method to our Trie. prefixCount = how many words current prefix is a part of. (Should be familiar if you did other Leetcode Trie problems). Now, whenever we find a word, we remove it from our Trie immediately (as opposed to the official solution, which does it "lazily"). By doing so, we can prune entire subtrees when prefixCount drops to 0.

    With prefixCount, we also now know exactly the max number of words we may find given a certain node. So now, we track how many words we have found while recursing. And we break early when we have found the prefixCount! This way, we do not unnecessarily recurse deeper when there are no more words to be found.

*/

class Trie {
  constructor() {
    this.root = {};
  }
  
  insert(word) {
    let node = this.root;
    
    for(const char of word) {
      if(!node[char]) {
        node[char] = {};
      }
      
      node = node[char];
      node.prefixCount = (node.prefixCount || 0) + 1;
    }
    
    node.word = word;
  }
  
  remove(word) {
    let node = this.root;
    
    for(const char of word) {
      node[char].prefixCount--;
      
      if(node[char].prefixCount === 0) {
        delete node[char];
        return;
      }
      node = node[char];
    }
    
    delete node.word;
  }
}

var findWords = function(board, words) {
  const ROWS = board.length;
  const COLS = board[0].length;
  const foundWords = [];
  const trie = new Trie();
  
  // 1) construct the trie
  for(const word of words) {
    trie.insert(word);
  }
  
  const directions = [[1,0],[-1,0],[0,1],[0,-1]];
  function dfs(r, c, node) {
    let numFound1 = 0;
    
    if(node.word) {
      foundWords.push(node.word);
      trie.remove(node.word);
      numFound1++;
    }
    
    // coordinate (r,c) not within bounds
    if(r < 0 || r >= ROWS || c < 0 || c >= COLS) {
      return numFound1;
    }
    
    const char = board[r][c];
    // char continuation at (r,c) is not in trie
    if(!node[char]) {
      return numFound1;
    }
  
    // at this point, board[r][c] is a valid character continuation in trie
    board[r][c] = '#';
    // record max number of words we can find with current prefix
    const PREFIX_COUNT = node[char].prefixCount;
    let numFound2 = 0;
    for(const [dr, dc] of directions) {
      numFound2 += dfs(r + dr, c + dc, node[char]); 
      
      // found all possible words with this prefix. Break early.
      if(numFound2 === PREFIX_COUNT) break;
    }
    
    board[r][c] = char;
    return numFound1 + numFound2;
  }
  
  // 2) iterate through board recursively square by square
  for(let r = 0; r < ROWS; r++) {
    for(let c = 0; c < COLS; c++) {
      dfs(r, c, trie.root);
    }
  }
  
  return foundWords;
}












/* 

  approach #2 - backtracking with trie 

  This goes into the trie and then determines whether to return, compared to the Second Solution, which makes sure that it is the correct way before going further.

  Time: O(mxn * 4), iterating the board and also each letters dfs
  Space: O(mxn + totalLetters), I created a visited board and also a Trie 

*/ 

class Trie {
    constructor() {
        this.children = new Array(127)
        
        for (let i=0; i<this.children.length; i++) {
            this.children[i] = null
        }
        
        this.isWord = false
        this.isFound = false
    }
    
    insertWordToTrie(word) {
        let node = this
        for (let i=0; i<word.length; i++) {
            let letterCharCode = word[i].charCodeAt(0)
            // previously I forgot this, so it overrided same letters with a new Trie if that letter already existed
            if (node.children[letterCharCode] === null) {
                node.children[letterCharCode] = new Trie()
            }
            node = node.children[word[i].charCodeAt(0)]
        }
        node.isWord = true
    }
    
    verifyWord() {
        return this.isWord
    }
    
    verifyFound() {
        return this.isFound
    }
}


function dfs(board, row, col, str, visited, trie, result) {
    // prevent out of bounds
    if (row < 0) return
    if (row >= board.length) return
    if (col < 0) return
    if (col >= board[0].length) return

    // prevent revisiting the same place
    if (visited[row][col] === true) return
   
    // go into the subTrie of the current letter to see if it exists
    let node = trie.children[board[row][col].charCodeAt(0)]
    if (node === null) return
    
    str += board[row][col]
    
    // if it is a word and that the isFound is false, then push it into the result array
    // this also prevents adding repetitive words
    if (node.verifyWord() === true && node.verifyFound() === false) {
        result.push(str)
        node.isFound = true
    }
    
    visited[row][col] = true
    dfs(board, row+1, col, str, visited, node, result)
    dfs(board, row-1, col, str, visited, node, result)
    dfs(board, row, col+1, str, visited, node, result)
    dfs(board, row, col-1, str, visited, node, result)
    visited[row][col] = false
    return
}

var findWords = function(board, words) {
    let result = []
    let trie = new Trie()

    for (let i=0; i<words.length; i++) {
        trie.insertWordToTrie(words[i])
    }
        
    let visited = []
    for (let i=0; i<board.length; i++) {
        visited.push([])
        for (let j=0; j<board[i].length; j++) {
            visited[i][j] = false
        }
    }
        
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<board[i].length; j++) {
            dfs(board, i, j, "", visited, trie, result)
        }
    }
    
    return result
};
 




/* v.3 */ 

var findWords = function(board, words) {
  const trie = new Trie();
  for (const string of words) {
    trie.add(string); 
  }
  
  // Dimensions: 
  let m = board.length, n = board[0].length; 
  // Where we will store our results
  const finalWords = {}; 

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      dfs(trie.root, row, col, m, n, board, finalWords)
    }
  }

  return Object.keys(finalWords);

å}

function dfs(trieNode, row, col, m, n, board, finalWords) {
 å // in bounds check or have we visited we want to return and not startsWith 
  if (row < 0 || row >= m || col < 0 || col >= n || board[row][col] === '$') return; 
  const char = board[row][col]; 
  // Not in trieNode break
  if (!(char in trieNode)) return; 
  // Mark as visited
  board[row][col] = '$'; 
  // Update trie node at the letter 
  trieNode = trieNode[char]; 
  // If the asterisk is in the trieNode add it to container
  if ("*" in trieNode) finalWords[trieNode["*"]] = true; 
  // Directions:
  dfs(trieNode, row - 1, col, m, n, board, finalWords);
  dfs(trieNode, row + 1, col, m, n, board, finalWords);
  dfs(trieNode, row, col - 1, m, n, board, finalWords);
  dfs(trieNode, row, col + 1, m, n, board, finalWords);
  // Revert back 
  board[row][col] = char; 
}


class Trie {å
  constructor() {
    this.root = {}; 
    this.endSymbol = '*'; 
  }

  add(word) {
    let current = this.root;
    for (const letter of word) {
      if (!(letter in current)) current[letter] = {}; 
      current = current[letter]; 
    }
    current[this.endSymbol] = word; 
  }
}



 

