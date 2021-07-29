/* 

  Given an m x n matrix, return all elements of the matrix in spiral order.

  Example 1:


  Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
  Output: [1,2,3,6,9,8,7,4,5]
  Example 2:

  Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
  Output: [1,2,3,4,8,12,11,10,9,5,6,7]
  
  Constraints:

  m == matrix.length
  n == matrix[i].length
  1 <= m, n <= 10
  -100 <= matrix[i][j] <= 100

*/

/*

  approach #1 

  Runtime: 80 ms, faster than 45.80% of JavaScript online submissions for Spiral Matrix.
  Memory Usage: 38.4 MB, less than 51.89% of JavaScript online submissions for Spiral Matrix.

*/ 

var spiralOrder = function(matrix) {
          
  let r = matrix.length, c=matrix[0].length;
  let [left, right, top, bottom] = [0, c-1, 0, r-1];

  let arr = [];

  while(left<=right && top <= bottom){
      for(let i=left; i<=right; i++) arr.push(matrix[top][i])
      top++;


      for(let i=top; i<=bottom; i++) arr.push(matrix[i][right])
      right--;


      if(top<=bottom){               // condition 1
          for(let i=right; i>=left; i--) arr.push(matrix[bottom][i])
          bottom--;
      }
    

      if(left<=right){               // condition 2
          for(let i=bottom; i>=top; i--) arr.push(matrix[i][left])
          left++;
      }
    
      

  }


  return arr
};



/*

  approach #2 - using DFS

  Runtime: 72 ms, faster than 89.28% of JavaScript online submissions for Spiral Matrix.
  Memory Usage: 38.4 MB, less than 51.89% of JavaScript online submissions for Spiral Matrix.

*/ 

var spiralOrder = function(matrix) {

  const m = matrix.length;
  const n = matrix[0].length;
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];
  const answer = [];
  const visit = Array.from(Array(m), () => Array(n).fill(false));

  function inRange(x, y) {
    return (0 <= x && x < m && 0 <= y && y < n);
  }

  function dfs(x, y, dir) {
    if (!inRange(x, y) || visit[x][y]) return;
    
    visit[x][y] = true;
    answer.push(matrix[x][y]);
    
    let nx = x + dx[dir];
    let ny = y + dy[dir];
    
    if (inRange(nx, ny) && !visit[nx][ny]) {
        dfs(nx, ny, dir);
    } else {
      dir = (dir + 1) % 4;
      nx = x + dx[dir];
      ny = y + dy[dir];
      
      dfs(nx, ny, dir);
    }
  }

  dfs(0, 0, 0);

  return answer;
};


/*

  approach #3 - using DFS

  Runtime: 68 ms, faster than 97.35% of JavaScript online submissions for Spiral Matrix.
  Memory Usage: 37.8 MB, less than 96.23% of JavaScript online submissions for Spiral Matrix.

*/ 


var spiralOrder = function(matrix) {
  var res = [];
  while(matrix.length) {
      // add first row
      res = matrix.length ? [...res, ...matrix.shift()] : res;

      // add last column
      res = matrix.length && matrix[0].length ? [...res, ...matrix.map(r => r.pop())] : res;
      
      // add last row (reversed)
      res = matrix.length ? [...res, ...matrix.pop().reverse()] : res;
      
      // add first column (reversed)
      res = matrix.length && matrix[0].length ? [...res, ...matrix.map(r => r.shift()).reverse()] : res;
  }
  return res;
};



/* 


    approach #4 


    We will use directional approach in case.
    i.e
    d=0 left to right
    d=1 top to down
    d=2 right to left
    d=3 down to top


*/ 



var spiralOrder = function(matrix) {
  let left=0;
  let right=matrix[0].length-1;
  let top=0;
  let down=matrix.length-1;
  let d=0
  let res=[]
  while(left<=right && top<=down){
        
       if(d==0){
       for(let i=left;i<=right;i++){
           res.push(matrix[top][i])
       }
      top++
       } 
      else if(d==1){
          for(let i=top;i<=down;i++){
              res.push(matrix[i][right])
          }
       right--;
      }   
      else if(d==2){
          for(let i=right;i>=left;i--){
              res.push(matrix[down][i])
          }
          down--;
      } 
      else {
          for(let i=down;i>=top;i--){
              res.push(matrix[i][left])
          }
         left++
      }
       d=(d+1)%4
      }
  return res
}




/* 

  approach #5

  Runtime: 80 ms, faster than 45.80% of JavaScript online submissions for Spiral Matrix.
  Memory Usage: 38.1 MB, less than 84.51% of JavaScript online submissions for Spiral Matrix.

*/ 

var spiralOrder = function(matrix) {
  const res = []
  while(matrix.length){
    const first = matrix.shift()
    res.push(...first)
    for(const m of matrix){
      let val = m.pop()
      if(val)
        res.push(val)
        m.reverse()   
    }
    matrix.reverse()
  }
  return res
};





/*

  approach #6 - DFS + linked-list like movement
  
  Runtime: 88 ms, faster than 17.87% of JavaScript online submissions for Spiral Matrix.
  Memory Usage: 38.9 MB, less than 6.35% of JavaScript online submissions for Spiral Matrix.

*/ 


var spiralOrder = function(matrix) {
  if (!matrix.length) return [];
  
  // define valid point
  let valid = (node) => {
      let [i, j] = node;
      if (!(0 <= i && i < matrix.length)) return false;
      if (!(0 <= j && j < matrix[0].length)) return false;
      return true;
  }
  
  // define possible moves
  let moves = new Map();
  moves.set('up', ([i, j]) => [i-1, j]);
  moves.set('right', ([i, j]) => [i, j+1]);
  moves.set('down', ([i, j]) => [i+1, j]);
  moves.set('left', ([i, j]) => [i, j-1]);
  
  // standard dfs
  let parents = new Set();
  let output = [matrix[0][0]];
  let dfs = (node) => {
      // not revisiting 
      if (parents.has(node.toString())) return;
      parents.add(node.toString());
      // keep exploring children
      for (let move of moves.values()) {
          // link list like movement
          let next_node = node;
          while (valid(move(next_node)) && !parents.has(move(next_node).toString())) {
              // no revisiting
              parents.add(next_node.toString());
              next_node = move(next_node);
              let [i, j] = next_node;
              output.push(matrix[i][j]);
          }
          dfs(next_node);
      }
  }

  dfs([0,0]);
  return output;
};





/* 

  example #2

  Runtime: 76 ms, faster than 75.18% of JavaScript online submissions for Spiral Matrix.
  Memory Usage: 38.4 MB, less than 51.89% of JavaScript online submissions for Spiral Matrix.

*/


var spiralOrder = function(matrix) {
  
  var res = [];
  while(matrix.length) {
    // add first row
    res = matrix.length ? [...res, ...matrix.shift()] : res;

    // add last column
    res = matrix.length && matrix[0].length ? [...res, ...matrix.map(r => r.pop())] : res;

    // add last row (reversed)
    res = matrix.length ? [...res, ...matrix.pop().reverse()] : res;

    // add first column (reversed)
    res = matrix.length && matrix[0].length ? [...res, ...matrix.map(r => r.shift()).reverse()] : res;
  }

  return res;
};





/*

  Solution 1: Elegant solution that mutates the original matrix using pop() & shift();

  Runtime: 76 ms, faster than 75.18% of JavaScript online submissions for Spiral Matrix.
  Memory Usage: 38.3 MB, less than 51.89% of JavaScript online submissions for Spiral Matrix.

*/

var spiralOrder = function(matrix) {
    let res = []
    while(matrix.length>0) {  // cut the top->right->bottom->left sides until matrix is empty
        let top = matrix.shift()
        let bottom = (matrix.pop() || []).reverse()
        let left = [], right = []
        for (let i=0; i<matrix.length; i++) {
            if (matrix[i].length>0) right.push( matrix[i].pop() )
            if (matrix[i].length>0) left.unshift( matrix[i].shift())
        }
        res.push(...top,...right,...bottom,...left)
    }
    return res
};

/*

  Solution 2: Solution does not mutate the original matrix

*/

var spiralOrder = function(matrix) {    
    if (!matrix || !matrix.length) return []
    
    let res = [], rows = matrix.length, cols=matrix[0].length
    
    for (let k=0; k<Math.round(Math.min(rows,cols)/2); k++){
		
		// top row
        for (let i=k; i<=cols-k-1; i++) {
            res.push( matrix[k][i] )
        }
		
		// right column
        for (let j=k+1; j<=rows-k-2; j++) {
            res.push( matrix[j][cols-k-1] )
        }
		
		// bottom row
        for (let i=cols-k-1; i>=k; i--) {
            if (rows-k-1 !== k)  res.push( matrix[rows-k-1][i] )  // skip if only one row left
        }
		
		// left column
        for (let j = rows-k-2; j>=k+1; j--) {
            if (cols-k-1 !== k) res.push( matrix[j][k] )   // skip if only one column left
        }
    }
    return res
};




/* 


  approach #3 - Depth-first Search 

    dir is parameter for indicate direction of searching.

    dir:0 is right, dir:1 is bottom, dir:2 is left and dir:3 is up
    with modular, we can populate next direction.



    Runtime: 72 ms, faster than 89.28% of JavaScript online submissions for Spiral Matrix.
    Memory Usage: 38.4 MB, less than 51.89% of JavaScript online submissions for Spiral Matrix.

*/

var spiralOrder = function(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];
  const answer = [];
  const visit = Array.from(Array(m), () => Array(n).fill(false));
  
  function inRange(x, y) {
      return (0 <= x && x < m && 0 <= y && y < n);
  }
  
  function dfs(x, y, dir) {
    if (!inRange(x, y) || visit[x][y]) return;
    
    visit[x][y] = true;
    answer.push(matrix[x][y]);
    
    let nx = x + dx[dir];
    let ny = y + dy[dir];
    
    if (inRange(nx, ny) && !visit[nx][ny]) {
        dfs(nx, ny, dir);
    } else {
        dir = (dir + 1) % 4;
        nx = x + dx[dir];
        ny = y + dy[dir];
        
        dfs(nx, ny, dir);
    }
  }
  
  dfs(0, 0, 0);
  
  return answer;
};