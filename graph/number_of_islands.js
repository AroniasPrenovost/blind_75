/* 

  Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

  An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

  Example 1:

      Input: grid = [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]
      ]
      Output: 1



  Example 2:

      Input: grid = [
        ["1","1","0","0","0"],
        ["1","1","0","0","0"],
        ["0","0","1","0","0"],
        ["0","0","0","1","1"]
      ]
      Output: 3
  



  Constraints:

      m == grid.length
      n == grid[i].length
      1 <= m, n <= 300
      grid[i][j] is '0' or '1'.

*/ 


/* 

  approach #1 - Depth-First Search (BFS)

*/ 



var numIslands = function(grid) {
  let count = 0;
  
  function depthSearch(x, y) {
      if (grid[x][y] === '1') {
          grid[x][y] = '0';
      } else {
          return;
      }

      if (x < grid.length - 1) {
          depthSearch(x+1, y);
      }
      
      if (y < grid[x].length - 1) {
          depthSearch(x, y+1);
      }
      
      if (x > 0 && x < grid.length) {
          depthSearch(x-1, y);
      }
      
      if (y > 0 && y < grid[x].length) {
          depthSearch(x, y-1);
      }
  }
  
  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] === '1') {
              count++;
              depthSearch(i, j);
          }
      }
  }
  
  return count;
};



/*  another example   */ 

var numIslands = function(grid) {
  // General strategy is: Loop over grid, at the first 1, mark 1 island and kick off a dfs
  // Mark all the 1s you can find as 0s, and continue the loop
  // Every one you find in the loop will be the start of a new island
  
  let i, l, j, m;
  let count = 0;
  
  // dfs function that we use below inside the grid;
  let dfs = function (x, y) {
      // shorthand for up, down, left and right locations
      let dirs = [[0,-1], [1, 0], [0,1], [-1, 0]];
      
      // mark our current spot as a zero, or recursive dfs' will find this spot again
      grid[x][y] = '0';
      
      // loop over the directions, check if we're still on the "board" and if we find an attached 1,
      // then dfs from that location
      dirs.forEach(function(dir) {
          let posX = x + dir[0];
          let posY = y + dir[1];
         
          if (posX > -1 && posX < grid.length && posY > -1 && posY < grid[0].length && grid[posX][posY] === '1') { 
              dfs (posX,posY); 
          }
      });
  }
  
  // loop over grid to find 1s
  for (i = 0, l = grid.length; i < l; i++) {
      for (j = 0, m = grid[0].length; j < m; j++) {
          
          // when you find a 1, start a new island
          if (grid[i][j] === '1') {
              count ++;
              // see which other 1s are attached to this 1, change those to zeroes
              // so that the next 1 we find in the grid loop has to be a new island
              // put a console.log(grid); above and below this line to see how islands get marked off
              dfs(i, j);
          }   
      }     
  }

  return count;
}




/* another example */

/**
 * @param {character[][]} grid
 * @return {number}
 */
 function inbound (grid, i, j) {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}

const Dx = [1, 0, 0, -1];
const Dy = [0, 1, -1, 0];

function helper (grid, i, j) {
  for (let k = 0; k < 4; k++) {
      const x = i + Dx[k];
      const y = j + Dy[k];
      if (inbound(grid, x, y) && grid[x][y] === '1') {
          grid[x][y] = '0';
          helper(grid, x, y);
      }
  }
}

var numIslands = function(grid) {
  // dfs
  let island = 0;
  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] === '1') {
              helper(grid, i, j);
              island++;
          }
      }
  }
  return island;
};




/* another example */ 


var numIslands = function (grid) {
  var islands = 0;

  // find land pieces
  for (var r = 0; r < grid.length; r++) {
      for (var c = 0; c < grid[r].length; c++) {
          if ('1' === grid[r][c]) {
              walk(grid, r, c);
              islands++;
          }
      }
  }

  return islands;
};

// do dfs walf and mark visited land pieces
function walk(grid, row, col) {
  if ('1' === grid[row][col]) {
      grid[row][col] = '*'; // mark land piece as visited
      /* left*/       if (col > 0) walk(grid, row, col - 1);
      /* right */     if (col < grid[row].length - 1) walk(grid, row, col + 1);
      /* top */       if (row > 0) walk(grid, row - 1, col);
      /* bottom */    if (row < grid.length - 1) walk(grid, row + 1, col);
  }





/* 

  DFS w/ comments w/o classes
  time: O(MxN) iterating through the entire grid
  space: O(MxN) due to stack calls in the process of recursion

*/ 

var numIslands = function(grid) {
    let count = 0
    
    // searches the entire grid
    for (let i=0; i<grid.length; i++) {
        for (let j=0; j<grid[i].length; j++) {
            if (grid[i][j] == '1') {
                // the count increments when it finds new land
                count++
                dfs(grid, i, j)
            }
        }
    }
    return count
};

function dfs(grid, r, c) {
    let totalRows = grid.length
    let totalCols = grid[0].length
    
    if (r < 0 || r == totalRows || c < 0 || c == totalCols) {
        return
    }
    
    // if the current position is a water, it stops
    if (grid[r][c] == '0') {
        return
    }
    
    // if the current position is land, it changes its value so it can find new lands in the next iteration of the nested loop
    if (grid[r][c] == '1') {
        grid[r][c] = '0'
    }
    
    // if it finds a island, it keeps going to find the rest and it keeps going in the same direction it finds a piece, such that if it goes up, and it finds an island it would keep going up until theres no more pieces of that island before heading back down while also searching the 3 directions
    dfs(grid, r+1, c)
    dfs(grid, r-1, c)
    dfs(grid, r, c+1)
    dfs(grid, r, c-1)
}

/* 

  DFS with classes
  Note: Not using Singleton Pattern

*/ 

class DFSMethod {
    count = 0
    grid = []

    constructor(grid) {
        this.grid = grid
        this.totalRows = this.grid.length
        
        if (this.totalRows === 0) {
            return
        }
        
        this.totalCols = this.grid[0].length
        this.iterateGrid()
    }    
    
    iterateGrid() {
        for (let i=0; i<this.grid.length; i++) {
            for (let j=0; j<this.grid[0].length; j++) {
                if (this.grid[i][j] === '1') {
                    this.count++
                    this.dfs(i, j)
                }    
            }
        }        
    }
    
    dfs(i, j) {
        if (i < 0 || i === this.totalRows || j < 0 || j === this.totalCols) {
            return
        }
                
        if (this.grid[i][j] === '0') {
            return 
        }
        
        if (this.grid[i][j] === '1') {
            this.grid[i][j] = '0'
        }
        
        this.dfs(i+1, j)
        this.dfs(i-1, j)
        this.dfs(i, j+1)
        this.dfs(i, j-1)
    }

    getResult() {
        return this.count
    }
}


var numIslands = function(grid) {
// as seen here, singleton pattern is not used as new objects has to be created to get the results
    let sumOfIslands = new DFSMethod(grid)
    return sumOfIslands.getResult()
};



/* another approach */ 


var numIslands = function (grid) {
  if (grid.length === 0 || grid === null) return 0;
  let islandCount = 0;
  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] == "1") {
              islandCount++;
              findIsland(i, j, grid)
          }
      }
  }

  function findIsland(row, col, grid) {
      if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length || grid[row][col] == "0") {
          return;
      }
      grid[row][col] = "0"
      findIsland(row - 1, col, grid);
      findIsland(row + 1, col, grid)
      findIsland(row, col + 1, grid);
      findIsland(row, col - 1, grid)
  }
  return islandCount;
}


/* recursive DFS solution */ 
var numIslands = function(grid) {
    
  let counter = 0;
  
  if(grid.length < 0) {
      return 0;
  }
  
  
  for(i = 0; i < grid.length; i++) {
      for(j = 0; j < grid[0].length; j++) {
       //If we find a piece of land, keep expanding outwards until we find all of the islands via traverse function call
          if(grid[i][j] === '1') {
              grid = traverse(i, j, grid)
              counter++;
          }
          
      }
  }
  
  return counter;
};

let traverse = function(x, y, grid) {
  //If we're out of bounds or reach 0's, return. 
  if( x > grid.length - 1 || y > grid[0].length - 1 || x < 0 || y < 0 || grid[x][y] === '0' ) {
      return;
  } else {
      // Mark the grid coordinate as "water" aka visited. 
      grid[x][y] = '0';
  }
  
//Traverse up, right, down, left
  traverse(x+1, y, grid)
  traverse(x, y+1, grid)
  traverse(x-1, y, grid)
  traverse(x, y-1, grid)
  
  return grid;
  
}






/* v.3  

    Iterate over the grid using 2 loops
    If found "1"
    Increment the count of islands
    Run DFS to change all "1"s of the found island to 0s to avoid counting it again with the next loop (we sort of remove the island after we found it)

*/ 


/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  let count = 0;

  for (let i = 0; i < grid.length; i ++) {
    for (let j = 0; j < grid[i].length; j ++) {
      if (grid[i][j] === '1') {
        count += 1;
        dfs(grid, i, j);
      }
    }
  }

  return count;
};

function dfs(grid, i, j) {
  if (!grid[i] || grid[i] && grid[i][j] === '0') {
    return;
  } else {
    grid[i][j] = '0';

    // top
    if (i - 1 >= 0) {
      dfs(grid, i - 1, j);
    }

    // right
    if (j + 1 < grid[i].length) {
      dfs(grid, i, j + 1);
    }

    // bottom
    if (i + 1 < grid.length) {
      dfs(grid, i + 1, j);
    }

    // left
    if (j - 1 >= 0) {
      dfs(grid, i, j - 1);
    }
  }

  return;
}


/* 


  approach #2 - Breadth-First Search (BFS)


*/ 

/* 

  BFS without classes

  Refer to this for space and time complexities
  https://stackoverflow.com/questions/50901203/dfs-and-bfs-time-and-space-complexities-of-number-of-islands-on-leetcode
  https://leetcode.com/problems/number-of-islands/discuss/478326/Question-about-time-complexity

  Note: M = row, N = columns

  time: O(MN) due to searching the entire grid, it is proportional to the total number of vertexes and edges of the graph visited
  space: O(MN) due to the queue size but sooner it would go down and become empty

*/ 

var numIslands = function(grid) {
    let countIslands = 0
    
    // this nested for loop would iterate throguh the entire grid to find anymore islands
    for (let i=0; i<grid.length; i++ ){
        for (let j=0; j<grid[i].length; j++) {
            if (grid[i][j] == "1") {
                countIslands++
                
                // bfs would spread to find more pieces of its current island, then make them all '0' so finding other islands would be easier
                bfs(grid, i, j)
            }
        }
    }
    return countIslands
};


function bfs(grid, r, c) {
    let totalRows = grid.length
    let totalCols = grid[0].length
    
    // use the positions as queues since that is where the bfs would spread
    let queue = [[r,c]]
    while (queue.length > 0) {
        let curr = queue.shift()
        let currRow = curr[0]
        let currCol = curr[1]
        
        // if its less than 0, its out of bounds, if its equal to to the total, then it is also out of bounds since arrays start at 0, while lengths starts at 1 if an element exists inside
        if (currRow < 0 || currRow == totalRows || currCol < 0 || currCol == totalCols) {
            continue
        }
        
        // if equal to 0 then continue since 0 is not apart of the islands
        if (grid[currRow][currCol] == '0') {
            continue
        }
        
        // if found an island/parts of an island, convert it to 0
        if (grid[currRow][currCol] == '1') {
            grid[currRow][currCol] = '0'
        }
                
        // looks in all directions if found an island/parts of an island
        queue.push([currRow+1, currCol])
        queue.push([currRow-1, currCol])
        queue.push([currRow, currCol+1])
        queue.push([currRow, currCol-1])
    }
    
}

/* 

  BFS with classes using Singleton Pattern
  no need to reintialize the objects because it will use more memory space when for an example. Using a lot of different test cases. It doesn’t need to create new objects but instead use already existing ones
  if you keep local, it will remove itself after it finishes the program
  singleton pattern, where one object specifclaly has one instance

*/ 

class GetCount {
    // queeu is outside because it doesn't need to be reinitalized
    // this instnace is reusable
    queue = []
    
    constructor() {
    }

    doit(grid) {
        let totalRows = grid.length
        let totalCols = grid[0].length
        
        let count = 0
        for (let r = 0; r<totalRows; r++) {
            for (let c = 0; c<totalCols; c++) {
                if (grid[r][c] === '1') {
                    count++
                    this.bfs(grid, r, c)
                }
            }
        }
        return count
    }

    bfs(grid, r, c) {
        let totalRows = grid.length
        let totalCols = grid[0].length
        // my previous mistake was putting [0, 0] instead of [this.r, this.c], since it continues from the previous iteration isntead of restarting back at [0, 0]
        this.queue.push([r, c])
        while (this.queue.length > 0) {
            let curr = this.queue.shift()
            let currRow = curr[0]
            let currCol = curr[1]
            
            if (currRow < 0 || currCol < 0 || currRow == totalRows || currCol == totalCols) continue
            
            if (grid[currRow][currCol] === '0') continue
            
            if (grid[currRow][currCol] === '1') {
                grid[currRow][currCol] = '0'
            }
            
            this.queue.push([currRow+1, currCol])
            this.queue.push([currRow-1, currCol])
            this.queue.push([currRow, currCol+1])
            this.queue.push([currRow, currCol-1])
            
        }
    }

}

var numIslands = function(grid) {
    let totalCount = new GetCount()
    
    return totalCount.doit(grid)
};





/* 

  approach #2 - Union Find (aka Disjoint Set)

    Weighted quick-union and path compression
    Time: O(MxN) where M is num rows and N is num cols
    Space: O(MxN) as required by UnionFind data structure

*/ 


const numIslands = function(grid) {
  if (grid === null || grid.length === 0) return 0

  let num_rows = grid.length,
      num_cols = grid[0].length,
      uf = new UnionFind(grid)

  for (let row = 0; row < num_rows; ++row) {
      for (let col = 0; col < num_cols; ++col) {
          if (grid[row][col] === '1') {
              grid[row][col] = '0'

              if (row - 1 >= 0 && grid[row-1][col] === '1') {
                  uf.union(row * num_cols + col, (row - 1) * num_cols + col)
              }

              if (row + 1 < num_rows && grid[row+1][col] === '1') {
                  uf.union(row * num_cols + col, (row + 1) * num_cols + col)
              }

              if (col - 1 >= 0 && grid[row][col-1] === '1') {
                  uf.union(row * num_cols + col, row  * num_cols + col - 1)
              }

              if (col + 1 < num_cols && grid[row][col+1] === '1') {
                  uf.union(row * num_cols + col, row  * num_cols + col + 1)
              }
          }
      }
  }

  return uf.getCount()
};

class UnionFind {
 constructor(grid) {
     this.count = 0

     let m = grid.length
     let n = grid[0].length
     this.parent = new Array(m*n)
     this.rank = new Array(m*n)

     for (let i = 0; i < m; ++i) {
         for (let j = 0; j < n; ++j) {
             const idx = i * n + j
             if (grid[i][j] === '1') {
                 this.parent[idx] = idx
                 ++this.count
             } else {
                 this.parent[idx] = -1
             }
             this.rank[i * n + j] = 0
         }
     }
 }

 find(i) { // path compression
     if (this.parent[i] !== i) {
         const val = this.find(this.parent[i])
         this.parent[i] = val
     }
     return this.parent[i]
 }

 union(a, b) {
     let root_a = this.find(a)
     let root_b = this.find(b)

     if (root_a !== root_b) {
         if (this.rank[root_a] > this.rank[root_b]) {
             this.parent[root_b] = root_a
         } else if (this.rank[root_a] < this.rank[root_b]) {
             this.parent[root_a] = root_b
         } else {
             this.parent[root_b] = root_a
             this.rank[root_a] += 1
         }
         --this.count
     }
 }

 getCount() {
     return this.count
 }
}



/* v.2 */ 

function UnionFind(grid) {
  this.count = 0;
  this.father = new Array(grid.length * grid[0].length);
  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
          const k = i * grid[0].length + j;
          this.father[k] = k;
          if (grid[i][j] === '1') {
              this.count++;
          }
      }
  }
}

UnionFind.prototype.find = function (x) {
  if (this.father[x] === x) {
      return x;
  }
  this.father[x] = this.find(this.father[x]);
  return this.father[x];
}

UnionFind.prototype.union = function (a, b) {
  const root_a = this.find(a);
  const root_b = this.find(b);
  if (root_a !== root_b) {
      this.father[root_a] = root_b;
      this.count--;
  }
}

const Dx = [0, 1, -1, 0];
const Dy = [1, 0, 0, -1];

function inbound(grid, x, y) {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
}

var numIslands = function(grid) {
  if (!grid || grid.length === 0 || !grid[0] || grid[0].length === 0) {
      return 0;
  }
  
  const unionFind = new UnionFind(grid);
  
  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] === '1') {
              for (let k = 0; k < 4; k++) {
                  let x = i + Dx[k];
                  let y = j + Dy[k];
                  if (inbound(grid, x, y) && grid[x][y] === '1') {
                      unionFind.union(x * grid[0].length + y, i * grid[0].length + j);
                  }
              }   
          }
      }
  }
  return unionFind.count;
};