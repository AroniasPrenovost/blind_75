/* 

  Given an m x n grid of characters board and a string word, return true if word exists in the grid.

  The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

  Example 1:
    Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
    Output: true

  Example 2:
    Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
    Output: true

  Example 3:
    Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
    Output: false
  
  Constraints:

  m == board.length
  n = board[i].length
  1 <= m, n <= 6
  1 <= word.length <= 15
  board and word consists of only lowercase and uppercase English letters.
  

  Follow up: Could you use search pruning to make your solution faster with a larger board?

*/ 


/* 

  approach #1 - backtracking ( depth-first search )

  Runtime: 280 ms, faster than 66.20% of JavaScript online submissions for Word Search.
  Memory Usage: 38.9 MB, less than 74.04% of JavaScript online submissions for Word Search.

*/ 


var exist = function(board, word) {
  const rLen = board.length,
  cLen = board[0].length,
  wLen = word.length;

  const dfs = (r, c, i) => {
    if (i === wLen) return true; // We are done
    if (r >= rLen || r < 0 || c >= cLen || c < 0) return false; // Out of bounds

    const char = board[r][c]; // Store char in temp var
    if (char !== word[i]) return false; // No match
    board[r][c] = '#'; // Mark as visited

    if (
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1)
    )
      return true; // Keep checking

    board[r][c] = char; // Done visiting, set element back to char
  };

  for (let r = 0; r < rLen; r++) {
    for (let c = 0; c < cLen; c++) {
      if (dfs(r, c, 0)) return true; // Start dfs from each element
    }
  }

  return false;
};

/* 

  approach #1 - backtracking ( depth-first search )

  Runtime: 280 ms, faster than 66.20% of JavaScript online submissions for Word Search.
  Memory Usage: 38.9 MB, less than 74.04% of JavaScript online submissions for Word Search.

*/ 

var exist = function(board, word) {
  let height = board.length;
  let width = board[0].length;
  let found = false;
  
  const dfs = (i, j, index = 0) => {
    if(i < 0 || i > height - 1 || j < 0 || j > width - 1) return
    if(board[i][j] !== word[index]) return;
    if(index == word.length - 1) {
        found = true
        return;
    }
    
    // mark during this DFS call
    board[i][j] = '#';

    // only dfs if not found
    if(!found) {
        dfs(i,   j+1, index+1)
        dfs(i+1, j,   index+1)
        dfs(i,   j-1, index+1)
        dfs(i-1, j,   index+1)
    }

    // reset afterwards
    board[i][j] = word[index];
  }
  
  for(let i = 0; i < height && !found; i++) {
    for(let j = 0; j < width && !found; j++) {
      if(board[i][j] == word[0]) {
          dfs(i, j)
      }
    }
  }

  return found
};

/* 

  approach #3 - backtracking ( depth-first search )

*/ 

var exist = function(board, word) {
  const ROW_NUM = board.length, COL_NUM = board[0].length;
  
  function callDFS(r, c, idx) {
      if(word.length === idx) return true;
      if(r >= ROW_NUM || r < 0 || board[r][c] !== word[idx]) return false; 
      
      board[r][c] = '#'; // mark as visited
      
      if (callDFS(r+1, c, idx+1)||
          callDFS(r-1, c, idx+1)||
          callDFS(r, c+1, idx+1)||
          callDFS(r, c-1, idx+1)) return true;
          
      board[r][c] = word[idx]; // reset the board
  }
  
  for(let r = 0; r < ROW_NUM; r++) {
      for(let c = 0; c < COL_NUM; c++) {
          if(board[r][c] === word[0] && callDFS(r, c, 0)) return true;
      }
  }

  return false;    
};