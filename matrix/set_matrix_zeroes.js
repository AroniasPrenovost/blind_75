/* 

  Given an m x n matrix. If an element is 0, set its entire row and column to 0. Do it in-place.

  Follow up:

  A straight forward solution using O(mn) space is probably a bad idea.
  A simple improvement uses O(m + n) space, but still not the best solution.
  Could you devise a constant space solution?
  

  Example 1:


  Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
  Output: [[1,0,1],[0,0,0],[1,0,1]]
  Example 2:


  Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
  Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
  

  Constraints:

  m == matrix.length
  n == matrix[0].length
  1 <= m, n <= 200
  -231 <= matrix[i][j] <= 231 - 1

*/


/*

  approach #1 - brute force - additional memory approach 

  time:  O(m * n)
  space: O(m + n)

*/

 
var setZeroes = function (mat) {
  let rows = mat.length,
    cols = mat[0].length,
    rowIndex = new Array(rows).fill(-1),
    colIndex = new Array(cols).fill(-1);

  // traverse all the elements of input matrix as usual
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
	    // if 0 is found, update the indexes of rowIndex and colIndex with 0
      if (mat[i][j] === 0) {
        rowIndex[i] = 0;
        colIndex[j] = 0;
      }
    }
  }

  // again traverse the matrix
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
	  /* if the there is 0 in either of rowIndex or colIndex matrix and if the
	    data in original input matrix is not 0 then change it to 0. 
		Works without AND cond too(runtime is a bit more)*/
      if ((rowIndex[i] === 0 || colIndex[j] === 0) && mat[i][j] !== 0) {
        mat[i][j] = 0;
      }
    }
  }
  return mat
};



/*

  approach #2 - additional memory approach 

*/


var setZeroes = function(matrix) {
  var track = []
  
  // find zeros
  for(var i = 0; i < matrix.length; i++){
    for(var j = 0; j < matrix[0].length; j++){
      if(matrix[i][j] === 0) {
        track.push([i, j])                
      }
    }
  }

  for(var i = 0; i < track.length; i++){
    var [x, y] = track[i]
    
    // update row
    for(var j = 0; j < matrix[0].length; j++){
      matrix[x][j] = 0
    }
    
    // udpate column
    for(var j = 0; j < matrix.length; j++){
      matrix[j][y] = 0
    }

  }
};




/*

  approach #3 - O(1) Space, Efficient Solution 


  You know, and I know, that interviewers love when you make helper functions.

  We break this up into 3 different steps:

  Find the zeroes in the matrix (associated row and column) O(n^2) time
  Set rows to zero
  Set columns to zero
  What made this problem originally confusing was the idea that I was going to turn the entire row and column to zero as SOON as I found a zero. However, if you break this up into parts and find zeroes first, you can remove duplicate rows and columns work, and simplify it. This way, we never do duplicate work.

  The power of hash tables allow us to not have duplicate keys, aka no duplicate rows/columns to go through!!!

*/
 
 

var setZeroes = function(matrix) {
  const zeroRow = new Set();
  const zeroCol = new Set();
  
  for(let i = 0; i < matrix.length; i++) {
      
      for(let j = 0; j < matrix[0].length; j++) {
          
          if(matrix[i][j] === 0) {
              zeroRow.add(i);
              zeroCol.add(j);
          }
      }
  }
  
  for(let r of zeroRow) {
      for(let j = 0; j < matrix[0].length; j++) {
          matrix[r][j] = 0;
      }
  }
  
  for(let c of zeroCol) {
      for(let i = 0; i < matrix.length; i++) {
          matrix[i][c] = 0;
      }
  }
};





/* example solution w/ helpers */ 



const setZeroes = (matrix) => {
	let [rows, columns] = findZeroes(matrix);

	setRowsToZero(matrix, rows);
	setColumnsToZero(matrix, columns);

	return matrix;
};

const findZeroes = (matrix) => {
	let rowsHash = {},
		columnsHash = {};

	for (var row = 0; row <= matrix.length - 1; row++) {
		for (var col = 0; col <= matrix[0].length - 1; col++) {
			let value = matrix[row][col];

			if (value === 0) {
				rowsHash[row] = true;
				columnsHash[col] = true;
			}
		}
	}

	return [Object.keys(rowsHash), Object.keys(columnsHash)];
};

const setRowsToZero = (matrix, rows) => {
	rows.forEach((row) => {
		for (var i = 0; i <= matrix[0].length - 1; i++) {
			matrix[row][i] = 0;
		}
	});
};

const setColumnsToZero = (matrix, columns) => {
	columns.forEach((column) => {
		for (var i = 0; i <= matrix.length - 1; i++) {
			matrix[i][column] = 0;
		}
	});
};




