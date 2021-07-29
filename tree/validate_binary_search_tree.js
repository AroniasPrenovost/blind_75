/* 

  Given the root of a binary tree, determine if it is a valid binary search tree (BST).

  A valid BST is defined as follows:

  The left subtree of a node contains only nodes with keys less than the node's key.
  The right subtree of a node contains only nodes with keys greater than the node's key.
  Both the left and right subtrees must also be binary search trees.
  

  Example 1:

      Input: root = [2,1,3]
      Output: true


  Example 2:

      Input: root = [5,1,4,null,null,3,6]
      Output: false
      Explanation: The root node's value is 5 but its right child's value is 4.
  
  Constraints:

    The number of nodes in the tree is in the range [1, 104].
    -231 <= Node.val <= 231 - 1


*/ 


// cleab, recursive solution
function isValidBST(root, min, max) {
  if (!root) { 
    return true;
  }

  if (min !== undefined && root.val <= min) {
    return false;
  }

  if (max !== undefined && root.val >= max) { 
    return false;
  }
 
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max); 
}



/* 


  approach #1 - recursive traversal with valid range


*/ 

// Check the boundaries recursively:
const isValidBST = (root, lo = -Infinity, hi = Infinity) => {
  if (!root) return true;
  if (root.val <= lo || root.val >= hi) return false;
  return isValidBST(root.left, lo, root.val) && isValidBST(root.right, root.val, hi);
};

// Recursively check if inorder traversal is sorted with no duplicates:
const isValidBST = (root) => {
  let prev = -Infinity;
  const inorder = (root) => {
    if (!root) return true;
    if (!inorder(root.left) || root.val <= prev) return false;
    prev = root.val;
    return inorder(root.right);
  };
  return inorder(root);
};


/* 


  approach #2 - iterative traversal with valid range 


*/ 





/* 


  approach #2 - recursive inorder traversal 

  O(n) time
  O(n) space

*/ 

var isValidBST = function(node, min = null, max = null) {
  if (!node) return true;
  if (min && node.val <= min.val) return false;
  if (max && node.val >= max.val) return false;
  return isValidBST(node.left, min, node) && isValidBST(node.right, node, max);
};


/* v.2 */ 

// inorder recursion
const isValidBST = (root) => {
    let prev = null
    let valid = true
	// inorder
    const traverse = (node) => {
	    // early exit
        if (!node || !valid) return
		// go left
        traverse(node.left)
		// validate
        if (prev !== null && node.val <= prev) {
            valid = false
        }
        prev = node.val
		// go right
        traverse(node.right)
    }
    traverse(root)
    return valid
};


/* 
  
  v.3 

  Using an inorder traversal, the nodes on a BST visited should be lowest to highest. Inorder traversal is accomplished by recursively calling the function on the node.left, then checking the node, then recursively calling the funciton on the node.right.
  If the current node is ever <= the previously visited node (prvNd), set the BST.status to false. In the end (base case: once BST.status changes to false or every node is hit), return the BST.status .

*/

function isValidBST(root, prvNd = { val: -Infinity }, BST = { status: true }) {
    if (!root || BST.status === false) return;
	
    isValidBST(root.left, prvNd, BST);
    
	if (root.val <= prvNd.val) BST.status = false;
    else prvNd.val = root.val;
    
	isValidBST(root.right, prvNd, BST);
    
	return BST.status;
};















/* 


  approach #4 - iterative order traversal 

  O(n) time
  O(n) space

*/ 


var isValidBST = function(root) {
  const stack = [root];
  
  let prev = Number.NEGATIVE_INFINITY;
  
  while(root && stack.length) {
      let node = stack.pop();
      while(node) {
          stack.push(node);
          node = node.left;
      }
      const tmp = stack.pop();
      if(tmp) {
          if(tmp.val <= prev) return false;
          prev = tmp.val;
          stack.push(tmp.right);
      }
  }
  
  return true;
};



/* v.2 */ 
// inorder iterative 
const isValidBST = (root) => {
  let stack = []
  let curr = root
  let valid = true
  let prev = null
// in order
  while ((curr || stack.length) && valid) {
    // go left
      while (curr) {
          stack.push(curr)
          curr = curr.left
      }
  // read last value
      curr = stack.pop()
  // validate
      if (prev !== null && prev >= curr.val) {
          valid = false
      }
      prev = curr.val
  // go right
      curr = curr.right
  } 
  return valid
};