/* 

  Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).


  Example 1:

      Input: root = [3,9,20,null,null,15,7]
      Output: [[3],[9,20],[15,7]]


  Example 2:

      Input: root = [1]
      Output: [[1]]


  Example 3:

      Input: root = []
      Output: []
  

  Constraints:

    The number of nodes in the tree is in the range [0, 2000].
    -1000 <= Node.val <= 1000

*/ 




/* 


  approach #1 - recursion


*/ 

var levelOrder = function(root) {
  if(!root) return [];
  var traversal = function(node, level, result) {
      if (!node) return;
      if (result[level]) {
          result[level].push(node.val);
      } else {
          result[level] = [node.val];
      }
      if (node.left) traversal(node.left, level + 1, result);
      if (node.right) traversal(node.right, level + 1, result);
  }
  var result = [];
  traversal(root, 0, result);
  return result;
};


/* v.2 */ 

var levelOrder = function(root) {
  const result = [];
  
  function traverse(node, level) {
      if(!node) return;
      
      if(!result[level]) result[level] = [node.val];
      else result[level].push(node.val);
      
      traverse(node.left, level+1);
      traverse(node.right, level+1);
  }
  
  traverse(root, 0);
  return result;
};




/* 

  approach #2 - iteration 
  
  --> Breadth-First Search (BFS) using a queue <-- 


  A binary tree level order traversal generally recommends a breadth first search (BFS) approach with the use of a queue data structure. When we process a node (curr), we'll push the node's children onto the end of the queue in the order in which we want to traverse (in this case, left to right). In this way, we'll have finished putting the next row in the queue at the same time we finish iterating through this row.

  To help us keep track of the rows, we just nest the main loop inside another loop. At the beginning of the outer loop, we capture the queue length, which will tell us how long the row is. Then we can iterate through that many nodes, popping them off the queue's front one at a time, then process any end-of-row instructions. In the case of this problem, that will mean pushing the current row array (row) onto our answer array (ans).

  We'll continue this process until the queue is empty, at which point we will have reached the end of the binary tree, and can return ans.

  Time Complexity: O(N) where N is the number of nodes in the binary tree
  Space Complexity: O(N) for our answer array

*/ 

var levelOrder = function(root) {
  let q = [root], ans = []
  while (q[0]) {
      let qlen = q.length, row = []
      for (let i = 0; i < qlen; i++) {
          let curr = q.shift()
          row.push(curr.val)
          if (curr.left) q.push(curr.left)
          if (curr.right) q.push(curr.right)
      }
      ans.push(row)            
  }
  return ans
};




/* v.2 */

var levelOrder = function(root) {
  if(!root) return [];
  var result = [];
  var queue = [root];
  while(queue.length) {
      var currentLevelLen = queue.length;
      var currentLevel = [];
      for (var i = 0; i < currentLevelLen; i++) {
          var node = queue.shift();
          currentLevel.push(node.val);
          if(node.left) queue.push(node.left);
          if(node.right) queue.push(node.right);
      }
      result.push(currentLevel);
  }
  return result;
};





/* v.3 */

var levelOrder = function(root) {
  if(root == null) return [];
  
  const res = []
  const queue = []
  queue.push(root)
  
  while(queue.length){
      const level = []
      let s = queue.length
      for(let i = 0; i < s; i++){
          const node = queue.shift()
          level.push(node.val)
          if(node.left) queue.push(node.left)
          if(node.right) queue.push(node.right)
      }
      res.push(level)
  }
  return res
};