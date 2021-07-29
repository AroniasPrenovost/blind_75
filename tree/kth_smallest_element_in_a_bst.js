/* 

  Given the root of a binary search tree, and an integer k, return the kth (1-indexed) smallest element in the tree.


  Example 1:

      Input: root = [3,1,4,null,2], k = 1
      Output: 1


  Example 2:

      Input: root = [5,3,6,2,4,null,null,1], k = 3
      Output: 3


  Constraints:

    The number of nodes in the tree is n.
    1 <= k <= n <= 104
    0 <= Node.val <= 104

  Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?

*/ 



/* 

  approach #1 - recursive inorder traversal 

  O(n)

*/ 

const kthSmallest = (root, k) => {
  let n = 0;
  let res;
  const inorder = (root) => {
    if (!root) return;
    inorder(root.left);
    if (n++ < k) res = root.val;
    inorder(root.right);
  };
  inorder(root);
  return res;
};




/* v.2 */ 
/**
 * A BST is defined by having:
 * 1. the left children smaller/equal to the parent
 * 2. the right children bigger than the parent
 * This means the smallest value of the tree will always be in the leftmost bottom node.
 * This function drills down to the left side of the tree, then goes to the parent node, 
 * and then drills down the right node (inorder traversal).
 * Each node that is processed contains an increasingly bigger number, 
 * and a counter is used to see how many of them have been already processed.
 * Once the counter reaches the number of k then that's when the requested node has been found.
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
 var kthSmallest = function (root, k) {
  let result;
  // this will be used to see which smallest element is processed at the moment
  let counter = 0;

  let findSmallest = function findSmallest(head) {
      // if the current processed node is null then the recursion will go back
      if (head) {
          // first drill down to the left child node (if it doesn't exist the recursion will continue to the next line)
          findSmallest(head.left);

          // if the current smallest number still hasn't reached k
          if (counter < k) {
              // save the value of the current node and increase counter
              result = head.val;
              counter++;

              // continue drilling down using the right child node
              findSmallest(head.right);            
          }
      }
  };

  findSmallest(root);

  return result;
};





/* v.3 */ 
var kthSmallest = function(root, k) {
    
  function callDFS(node) {
      if(!node) return false;
      
      let leftVal = callDFS(node.left)
      if(leftVal) return leftVal;
      k--;
      if(!k) return node.val;
      return callDFS(node.right);
  }
  return callDFS(root);
};









/* 


  approach #2 - iterative inorder traversal


*/ 



var kthSmallest = function (root, k) {
  const stack = [];
  let count = 1;
  let node = root;

  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    
    node = stack.pop();
    if (count === k) {
      return node.val;
    } else {
      count++;
    }

    node = node.right;
  }
};




/* v.2 inorder traversal DFS */ 


var kthSmallest = function(root, k) {
  let result = [];
  function inorder(node){
      if(!node) return null;
      if(node.left) inorder(node.left);
      result.push(node.val);
      if(node.right) inorder(node.right);
  }
  inorder(root)
  return result[k-1];
};


