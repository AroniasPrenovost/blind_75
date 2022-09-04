/* 

  Given the root of a binary tree, invert the tree, and return its root.


  Example 1:

      Input: root = [4,2,7,1,3,6,9]
      Output: [4,7,2,9,6,3,1]


  Example 2:

      Input: root = [2,1,3]
      Output: [2,3,1]


  Example 3:

      Input: root = []
      Output: []

  Constraints:

    The number of nodes in the tree is in the range [0, 100].
    -100 <= Node.val <= 100


*/ 




/* 


  approach #1 - recursive - DFS

    we're going to visit every node in the tree, 
    and every time we look at that node. we look at child positions and swap them 
    
      recursively run invertTree() on left + right subtrees as you move down 

*/ 

var invertTree = function(root) {
  if(!root) return root;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
};






/* 

  approach #2 - Iterative Breadth-First Traversal (BFS)
  
  O(n)

*/ 


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
 var invertTree = function(root) {
  let head = root;
  
  let queue = new Array;
  queue.push(root);
  
  while(queue.length > 0){
      let node = queue.shift();
      
      if(node){
          queue.push(node.left);
          queue.push(node.right);
          let temp = node.left;
          node.left = node.right;
          node.right = temp;
      }
  }
  return head;
};



/* v.2 */ 

var invertTree = function(root) {
  let queue = [root];
  while(queue.length) {
      let currentNode = queue.shift();
      if(currentNode) {
          [currentNode.left, currentNode.right] = [currentNode.right, currentNode.left];
          queue.push(currentNode.left, currentNode.right);
      }
  }
  return root;
};



/* 


  approach #3 - iterative (DFS)

  O(n) time
  O(log n) space

*/ 


function invertTree(root) {
    const stack = root ? [root] : [];
    while (stack.length) {
        const top = stack.pop();
        [top.left, top.right] = [top.right, top.left];
        top.left && stack.push(top.left);
        top.right && stack.push(top.right);
    }
    return root;
}




/* v.2 DFS */

var invertTree = function(root) {
  function helper(node){
      if(!node) return null;
      if(node.left) helper(node.left);
      if(node.right) helper(node.right);
      let temp = node.left;
      node.left=node.right;
      node.right=temp;
  }
  helper(root);
  return root;
};






