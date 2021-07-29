/* 

 

*/ 


/* 

  approach #1 - rotate groups of 4 cells 

  Runtime: 80 ms, faster than 60.51% of JavaScript online submissions for Rotate Image.
  Memory Usage: 39.1 MB, less than 20.43% of JavaScript online submissions for Rotate Image.

  Time O(N^2) - Space O(1)

*/ 



var rotate = function(matrix) {
  let n = matrix.length, depth = ~~(n / 2)
  for (let i = 0; i < depth; i++) {
      let len = n - 2 * i - 1, opp = n - 1 - i
      for (let j = 0; j < len; j++) {
          let temp = matrix[i][i+j]
          matrix[i][i+j] = matrix[opp-j][i]
          matrix[opp-j][i] = matrix[opp][opp-j]
          matrix[opp][opp-j] = matrix[i+j][opp]
          matrix[i+j][opp] = temp
      }
  }
};


/* Trick solution, didn't notice that it has to be solved in place. */ 

var rotate = function(matrix) {
  const n = matrix.length; // number of rows and columns
  let res = [] // new array to store
  for (let i=0; i<n; i++) {
      let line = [];
      for (let j=0; j<n; j++) {
          line.push(matrix[i][j]);
      }
      res.push(line);
  }
  for (let i=0; i<n; i++) {
      for (let j=0; j<n; j++) {
          matrix[i][n-j-1] = res[j][i]
      }
  }
};
 


/* v.3? */

var rotate = function(matrix) {
 
  let n = matrix.length //this is optional 
    
  //[1,2,3],>>>>    [1,4,7]
  //[4,5,6],>>>>    [2,5,8]
  //[7,8,9]>>>>     [3,6,9]
  //rows become columns and columns become rows  Look at above ^^ 
  for(let i = 0; i<n; i++){
    for(let j = i; j< n; j++){
      let temp = matrix[i][j]
      matrix[i][j] = matrix[j][i]
      matrix [j][i] = temp
    }
  }

  //[1,4,7],>>>>    [7,4,1]
  //[2,5,8],>>>>    [8,5,2]
  //[3,6,9]>>>>     [9,6,2]
  //swap first and last ele from each row in this case; we swap 1 and 7 and it becomes 7 and 1 Look Above ^^
  for(let i = 0; i< n; i++){
    for(let j = 0; j<(n/2); j++){
      let temp = matrix[i][j]
      matrix[i][j] = matrix[i][n-1-j]
      matrix[i][n-1-j] = temp 
    }
  }
};

 
/* 

  approach #2 - Reverse on Diagonal and then Reverse Left to Right

  'transpose and reverse' 

  Runtime: 76 ms, faster than 82.27% of JavaScript online submissions for Rotate Image.
  Memory Usage: 38.6 MB, less than 69.23% of JavaScript online submissions for Rotate Image.

*/ 
 
const rotate = (matrix) => {
  const n = matrix.length;
  // transpose
  for(let i = 0; i< n; i++) {
      for(let j = i; j < n ; j++) {
        const tmp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = tmp;
      }
  }
  // reverse each row
  for(const row of matrix) {
      row.reverse();
  }
};

/* 

  v.2 

  The loop starts from the first column of the last row.

*/ 

var rotate = function(matrix) {
  let len = matrix.length;
  for(let i = 0; i < len; i++) {
    for(let j = len - 1; j >= 0; j--) {
      matrix[i].push(matrix[j].shift()); 
    }
  }
};

/* 
  v.3 

  transpose 

*/ 


var rotate = function(matrix) {
  for(let i = 0; i < matrix.length; i++) {
      for(let j = i; j < matrix[0].length; j++) {
          [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
      }
  }
  
  matrix.forEach(row => {
      row.reverse()
  })
};

/* 
  v.4

  transpose 

*/ 

var rotate = function(matrix) { // [[]]
  // VARIABLE TO SHORTEN OUR TRAVERSE TO ONLY TOP HALF OF DIAGONAL
  let col = 1;
  
  for(let i = 0;i<matrix.length;i++){
    for(let j = col++;j<matrix[0].length;j++){
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  for(let r of matrix){
    r.reverse();
  }
};

 








/* 

  concise notes 

*/ 

/*
Rotate Image

You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
*/

var rotate = function (matrix) {
  if (matrix === null || matrix.length === 0 || matrix[0].length === 0) {
    return;
  }
  // we don't count the single entry in the center as a layer
  let numOfLayers = Math.floor(matrix.length / 2);
  for (let i = 0; i < numOfLayers; i++) {
    rotateLayer(matrix, i, matrix.length - 1 - i);
  }
  // T.C: O(N^2)
  // S.C: O(1)
};

const rotateLayer = (matrix, start, end) => {
  for (let i = 0; start + i < end; i++) {
    let tempTop = matrix[start][start + i]; // save top
    matrix[start][start + i] = matrix[end - i][start]; // left to top
    matrix[end - i][start] = matrix[end][end - i]; // bottom to left
    matrix[end][end - i] = matrix[start + i][end]; // right to bottom
    matrix[start + i][end] = tempTop;
  }
};


// Idea:
// 1. Transpose the matrix.
// 2. Reverse each row.
var rotate = function(matrix) {
    if (matrix.length == 0 || matrix[0].length == 0) return;
    let n = matrix.length;
    
    for (let row = 0; row < n; row++) {
        for (let col = row; col < n; col++) { // col starts at row because we just modified the top and left boundaries so we don't want to further modify it 
            if (row == col) continue; // optimisation
            [matrix[row][col], matrix[col][row]] = [matrix[col][row], matrix[row][col]];
        }
    }
    for (let row = 0; row < n; row++) {
        matrix[row].reverse();
    }
    // Time Complexity: O(n^2)
    // Space Complexity: O(1)
};



/* another couple examples */ 


const rotate = matrix => {
  const matrixLength = matrix.length;
  
  if (matrixLength !== 1) {
      for (let i = 0; i < matrixLength; i++) {
          for (let j = i; j < matrixLength; j++) {
              [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]] 
          }
      }
      for (let i = 0; i < matrixLength; i++) {
          let j = 0; let k = matrixLength - 1;
          while (j < k) {
              [matrix[i][j], matrix[i][k]] = [matrix[i][k], matrix[i][j]] 
              j++;
              k--;
          }
      }
  }
}

// Clean and verbose solution
const rotate = matrix => {
  const matrixLength = matrix.length;
  if (matrixLength !== 1) {
    matrix = transpose(matrix, matrixLength);
    matrix = mirror(matrix, matrixLength);
  }
}

const transpose = (matrix, matrixLength) => {
  for (let i = 0; i < matrixLength; i++) {
      for (let j = i; j < matrixLength; j++) {
          [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]] 
      }
  }
  return matrix;
}

const mirror = (matrix, matrixLength) => {
  for (let i = 0; i < matrixLength; i++) {
      let j = 0; let k = matrixLength - 1;
      while (j < k) {
          [matrix[i][j], matrix[i][k]] = [matrix[i][k], matrix[i][j]] 
          j++;
          k--;
      }
  }
  return matrix;
}