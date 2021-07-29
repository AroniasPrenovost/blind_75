/* 

  A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

  The path sum of a path is the sum of the node's values in the path.

  Given the root of a binary tree, return the maximum path sum of any path.


  Example 1:

      Input: root = [1,2,3]
      Output: 6
      Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
  

      
  Example 2:

    Input: root = [-10,9,20,null,null,15,7]
    Output: 42
    Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
  


  Constraints:

      The number of nodes in the tree is in the range [1, 3 * 104].
      -1000 <= Node.val <= 1000


*/ 




/* 


  approach #1 - recursion
 
  I think the question's defintion of a valid path is quite vague.
  To reduce confusion, think of a valid path as one that become a straight line if nodes are rearranged.

  Solution:
  On the assumption that every sum is positive,
  max path sum in a tree = 
  root's value 
  + max path sum in left subtree
  + max path sum in right subtree

  The reason I made such assumption is because we will turn any negative sum into zero 
  since we will always neglect negative path in order to maximise path sum. 

  We will traverse nodes in post-order so that we can find path sum of every subtree and get the 
  max path sum. One important thing to note is that we have to choose either the left sum or the right sum
  in order for the current subtree to become part of a path with a new root. The whole subtree can't become
  part of a path with a new root because then it will be a invalid path.

*/

// DFS, post-order 
var maxPathSum = function(root) {
  let max = -Infinity;
  dfs(root);
  return max;
  // T.C: O(N)
  // S.C: O(H)
  function dfs(root) {
      if (!root) {
          return 0;
      }
      let leftMaxSum = Math.max(0, dfs(root.left));
      let rightMaxSum = Math.max(0, dfs(root.right));
      max = Math.max(max, root.val + leftMaxSum + rightMaxSum);
      // we choose one path sum between left subtree's sum and right subtree's sum
      // because the whole subtree can't become part of a path because then it won't be possible
      // for the path to become a straight line when nodes are rearranged
      return root.val + Math.max(leftMaxSum, rightMaxSum);
  }
};



/* v.2 DFS, post-order recursion */ 

var maxPathSum = function(root) {
  let max = -Infinity;
  const pathSum = (root) => {
      if(!root) return 0;
      let left = Math.max(0, pathSum(root.left));
      let right = Math.max(0, pathSum(root.right));
      max = Math.max(left + right + root.val, max);
      return Math.max(left, right) + root.val
  }
  pathSum(root);
  return max;
};

/* 

  v.3 DFS, post-order recursion 
  
  
    It's important to point out that we are looking for the maximum path. In the most simple case, a single node can be the max path, or even the entire tree could be the max path. To keep the max variable up to date, I create a global variable that will be updated over the run of the functions.

    We are doing a DFS recursive function here.

    We need a base case, and that base case is if we hit a null, we return 0. We are going going to finish the left subtree before going to the right subtree, which is denoted by findSums(node.left) then after is findSums(node.right). After the left and right subtree are done (for an example, look at a single node), we have three different sums. All three nodes (left, right and node.val), left side (node.val and left), right side (node.val and right) or just the single node. We use these values (with the current max) to find the max.

    The most important part is what do we return for this recursive function? The answer is we are returning

    The Max Path from this node
    That can be node.val, leftNodeSum, or rightNodeSum. We cannot return allSum since that would not be a path. Very, very important to point that out.
      
*/ 


const maxPathSum = (root) => {
	let max = -Infinity;

	const findSums = (node) => {
		// Base case / hit a null
		if (!node) return 0;

		let left = findSums(node.left),
			right = findSums(node.right),
			allSum = left + right + node.val,
			leftNodeSum = left + node.val,
			rightNodeSum = right + node.val;

		// Max is all possible combinations
		max = Math.max(max, node.val, allSum, leftNodeSum, rightNodeSum);
		
		// Return the MAX path, which can be node.val, left + node.val, or right + node.val
		return Math.max(leftNodeSum, rightNodeSum, node.val);
	};

	findSums(root);

	return max;
};

/* v.4 shortest version */ 


// v.2 
var maxPathSum = function(root) {
  let max = Number.NEGATIVE_INFINITY;
  
  function dfs(node) {
    if (!node) {
      return 0;
    }
    
    let left = Math.max(dfs(node.left), 0);
    let right = Math.max(dfs(node.right), 0);
    
    max = Math.max(node.val + left + right, max);
    
    return node.val + Math.max(left, right);
  }
  
  dfs(root);

  return max;
};