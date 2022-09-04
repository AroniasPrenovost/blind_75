/* 

 Given the root of a binary tree, return its maximum depth.
    - find number of nodes in longest path

  A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

  Example 1:

      Input: root = [3,9,20,null,null,15,7]
      Output: 3
 
 
  Example 2:

      Input: root = [1,null,2]
      Output: 2


  Example 3:

      Input: root = []
      Output: 0


  Example 4:

      Input: root = [0]
      Output: 1
  
  Constraints:

  The number of nodes in the tree is in the range [0, 104].
  -100 <= Node.val <= 100

*/ 


/* 

    Tree traversals: 

        1. Recursive DFS 
        2. Iterative DFS (no recursion)
        3. Breadth first search


*/ 




/* 


  approach #1 - recursion 

  O(n)

*/ 


var maxDepth = function(root) {
  if(!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

console.log('maxDepth: ', maxDepth([3,9,20,null,null,15,7])); // 3




/* v.2 */ 

var maxDepth = function(root) {
  if (!root) return 0;

  const leftHeight = maxDepth(root.left);
  const rightHeight = maxDepth(root.right);
  
  return Math.max(leftHeight, rightHeight) + 1;
};




/* 


  approach #2 - tail recursion + BFS 

  time O(n) 
  space O(1)

*/ 



var maxDepth = function(root) {
  let maxDepth = 0;
  function dfs(root, depth) {
      if (!root) {
          maxDepth = Math.max(depth, maxDepth);
          return;
      }
      dfs(root.left, depth+1);
      dfs(root.right, depth+1);
  }
  dfs(root, 0);
  return maxDepth;
// Time Complexity: O(n)
  // Space Complexity: O(n), in the worst case; in case of a skewed tree
};


/* v.2 */ 


// using a queue
var maxDepth = function(root) {
  if(!root) return 0
  
  let maxDepth = 1
  
  function traverse(node, depth = 1) {
      if(!node) {
          return
      }
      
      maxDepth = Math.max(maxDepth, depth)
      
      traverse(node.left, depth + 1)
      traverse(node.right, depth + 1)
  }
  
  traverse(root)
  
  return maxDepth
};





/* 


  approach #3 - iterative BFS 


*/ 

 
var maxDepth = function(root) {
  if (!root) return 0;
  let maxDepth = 0, queue = [{node: root, level:1}];
  while(queue.length) {
      let {node, level} = queue.shift();
      maxDepth = Math.max(maxDepth, level);
      if (node.left) queue.push({node: node.left, level: level+1});
      if (node.right) queue.push({node: node.right, level: level+1});
  }
  return maxDepth;
  // Time Complexity: O(n)
  // Space Complexity: O(n)
};


/* v.2 */ 


var maxDepth = function(root) {
  if (!root) return 0;
  
  let nodeStack = [root];
  let depthStack = [1];
  let maxDepth = 0;
  
  while (nodeStack.length) {
      let currentNode = nodeStack.pop();
      let currentDepth = depthStack.pop();
      maxDepth = Math.max(maxDepth, currentDepth);
      
      if (currentNode.left) {
          nodeStack.push(currentNode.left);
          depthStack.push(currentDepth + 1)
      }
      
      if (currentNode.right) {
          nodeStack.push(currentNode.right);
          depthStack.push(currentDepth + 1)
      }
  }
  
  return maxDepth;
};
