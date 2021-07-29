/* 

  There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

  The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

  The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

  Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

  

  Example 1:

      Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
      Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]




  Example 2:

      Input: heights = [[2,1],[1,2]]
      Output: [[0,0],[0,1],[1,0],[1,1]]
  

  Constraints:

    m == heights.length
    n == heights[r].length
    1 <= m, n <= 200
    0 <= heights[r][c] <= 105


*/ 




/* 


  approach #1 - Breadth-First Search (BFS)


*/ 




function pacificAtlantic(matrix) {
  if (!matrix.length) {
    return [];
  }
  let pacific = make(matrix);
  let atlantic = make(matrix);
  for (let row = 0; row < matrix.length; row++) {
    bfs(row, 0, pacific, matrix);
    bfs(row, matrix[0].length - 1, atlantic, matrix);
  }
  for (let col = 0; col < matrix[0].length; col++) {
    bfs(0, col, pacific, matrix);
    bfs(matrix.length - 1, col, atlantic, matrix);
  }
  return union(atlantic, pacific);
};

const make = matrix => new Array(matrix.length).fill().map(row => new Array(matrix[0].length).fill(false));

function bfs(x, y, ocean, matrix) {
  let q = [[x, y]];
  ocean[x][y] = true;
  while (q.length) {
    let [i, j] = q.shift();
    for (let [newI, newJ] of [[i , j+1], [i+1, j], [i, j-1], [i-1, j]]) {
      if (newI >= 0 && newI < ocean.length && newJ >= 0 && newJ < ocean[0].length) {
        if (matrix[i][j] <= matrix[newI][newJ] && !ocean[newI][newJ]) {
          q.push([newI, newJ]);
          ocean[newI][newJ] = true;
        }
      }
    } 
  }
}

function union(atlantic, pacific) {
  let union = [];
  for (let i = 0; i < atlantic.length; i++) {
    for (let j = 0; j < atlantic[0].length; j++) {
      if (atlantic[i][j] && pacific[i][j]) {
        union.push([i, j]);
      }
    }
  }
  return union;
}






/* 


  approach #2 - Depth-First Search (DFS)


    It should be obvious from the start that we'll need to solve this problem in reverse. We know that the edges of the input matrix (M) will flow water out to the ocean on their respective sides, and we can tell whether an adjacent cell will funnel water to the current cell, so we'll have to start from the edges and work our way inward.

    Unfortunately, since the path the water will take can possibly wind around, we can't do a straight one-time iteration. Instead, we'll have to use a depth first search (DFS) approach with either a stack/queue structure or recursion.

    For each cell that touches an ocean, we'll have to follow the reverse path of the water up the continent as far as it will go. Since we only want cells that are reached by both oceans, we'll need a data structure to store the preliminary data for the cells while we wait for the opposite ocean to potentially find the same cell.

    There are a few ways we can do this, but I'll choose a dynamic programming (DP) array (dp). Since there's no real reason to mimic the 2-D matrix structure of M, we can just use a flattened 1-D array instead, which should save some processing overhead. In order to store both oceans' data discretely in dp, we can use +1 for one and +2 for the other. That means that when a cell goes to 3, it should be added to our answer array (ans).

    Our DFS recursion function (dfs) should also check to make sure that we haven't already marked this cell with the current ocean (w) by using a bitwise AND (&) operator. Then, at the end of dfs we should fire off new recursions in all four directions, if possible.

*/ 



var pacificAtlantic = function(M) {
  if (!M.length) return M
  let y = M.length, x = M[0].length, ans = [],
      dp = new Uint8Array(x * y) // Javascript can use the lighter, typed Uint8Array for dp.
  const dfs = (i, j, w, h) => {
      let ij = i * x + j
      if ((dp[ij] & w) || M[i][j] < h) return
      dp[ij] += w, h = M[i][j]
      if (dp[ij] === 3) ans.push([i,j])
      if (i + 1 < y) dfs(i+1, j, w, h)
      if (i > 0) dfs(i-1, j, w, h)
      if (j + 1 < x) dfs(i, j+1, w, h)
      if (j > 0) dfs(i, j-1, w, h)
  }   
  for (let i = 0; i < y; i++) {
      dfs(i, 0, 1, M[i][0])
      dfs(i, x-1, 2, M[i][x-1])
  }
  for (let j = 0; j < x; j++) {
      dfs(0, j, 1, M[0][j])
      dfs(y-1, j, 2, M[y-1][j])
  }
  return ans
};










/* v.2 */ 

/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */

/*

basic idea -->
populate cells reached from atlantic and cells reached from pacific with dfs
loop through matrix
add coords to return array if they exist in both the atlantic matrix and the pacific matrix
return result

dfs --> 
1. base - return if out of bounds
2. base - return if our previous spot was larger because we are only marking spot as true
if it is larger than prev (prev) **this is tricky, we aren't checking if the water is
able to flow to this spot from a previous spot...instead we are checking if water can flow out FROM this spot
TO the "prev" spot, so really prev is kind of a confusing name, because it represents the next spot that water could flow to
2. base - if the spot is already marked as true we can just return, because it means that water from this spot can already reach ocean
3. if we've reached this point it means that our flow has not yet been interrupted from our starting point
so we CAN reach our ocean (pacific or atlantic) from the current spot, so we simply mark that in our ocean i.e. ocean[i][j] = true
4. call dfs recursively on all 4 surrounding spots


*/
var pacificAtlantic = function(matrix) {
  if (matrix.length === 0) return [] 
 let numRows = matrix.length
 let numCols = matrix[0].length
 
 let atlantic = []
 let pacific = []
 for (let i = 0;i<numRows;i++){
     atlantic.push(new Array(numCols).fill(false))
     pacific.push(new Array(numCols).fill(false))
 }
 
 for (let col=0 ;col<matrix[0].length;col++){
     dfs(matrix, 0, col, Number.MIN_SAFE_INTEGER, pacific)
     dfs(matrix, numRows - 1, col, Number.MIN_SAFE_INTEGER, atlantic)
 }
  
  for (let row = 0;row<matrix.length; row++){
      dfs(matrix, row, 0, Number.MIN_SAFE_INTEGER, pacific)
      dfs(matrix, row, numCols - 1, Number.MIN_SAFE_INTEGER, atlantic)
  }
  
  let res = []
  for (let i=0;i<numRows;i++){
      for (let j=0;j<numCols;j++){
          if (atlantic[i][j] && pacific[i][j]){
              res.push([i, j])
          }
      }
  }
  return res
}
 


const dfs = (matrix, i, j, prev, ocean) =>{
//checkOutOfBounds
  if (i<0 ||
     i > matrix.length -1 ||
     j < 0 ||
     j > matrix[i].length - 1
    ) return
  
  
  if (matrix[i][j] < prev) return
  if (ocean[i][j]) return
  ocean[i][j] = true
  
  dfs(matrix, i+1, j, matrix[i][j], ocean)
  dfs(matrix, i-1, j, matrix[i][j], ocean)
  dfs(matrix, i, j+1, matrix[i][j], ocean)
  dfs(matrix, i, j-1, matrix[i][j], ocean)    
}
