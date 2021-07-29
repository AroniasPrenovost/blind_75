/* 

  Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

  Example 1:

      Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
      Output: [3,9,20,null,null,15,7]


  Example 2:

      Input: preorder = [-1], inorder = [-1]
      Output: [-1]
  
  Constraints:

    1 <= preorder.length <= 3000
    inorder.length == preorder.length
    -3000 <= preorder[i], inorder[i] <= 3000
    preorder and inorder consist of unique values.
    Each value of inorder also appears in preorder.
    preorder is guaranteed to be the preorder traversal of the tree.
    inorder is guaranteed to be the inorder traversal of the tree.

*/ 

/* 


  approach #1 - recursion, divide & conquer


*/ 

var buildTree = function(preorder, inorder) {
  const divideAndConquer = (start, end) => {
      if (start > end) {
          return null;
      }
      const mid = inorder.indexOf(preorder.shift());
      const node = new TreeNode(inorder[mid]);
      node.left = divideAndConquer(start, mid - 1);
      node.right = divideAndConquer(mid + 1, end);
      return node;
  };
  return divideAndConquer(0, inorder.length - 1);
};



/* 


  approach #2 - recursion 

    hashmap 


*/ 

var buildTree = function(P, I) {
  let M = new Map()
  for (let i = 0; i < I.length; i++)
      M.set(I[i], i)
  return splitTree(P, M, 0, 0, I.length-1)
};

var splitTree = function(P, M, pix, ileft, iright) {
  let rval = P[pix],
      root = new TreeNode(rval),
      imid = M.get(rval)
  if (imid > ileft)
      root.left = splitTree(P, M, pix+1, ileft, imid-1)
  if (imid < iright)
      root.right = splitTree(P, M, pix+imid-ileft+1, imid+1, iright)
  return root
}




/* 


  approach #3 - recursion w/ queue

  The idea is to use a queue for getting the next node to build, which will always be the front of preorder. Using a queue means we don't have to keep track of an extra set of pointers to figure out where we are in preorder.

  From there, the recursion is:

    1. Peek the front of the queue
    2. Check where that value is in inorder
    3. If it is not between our left and right bounds, we return early
    4. Remove the head of the queue and create a new node
    5. Recursively build that nodes left tree *
    6. Recursively build the right tree *
    7. Continue until queue is empty
    
    Checking the left and right tree is similar to something like quicksort or quick select, whereever we were in inorder, the left tree is from start -> inorderPos -1 (1 to left of inorder position) and the right is from inorder + 1 -> end


*/ 

var buildTree = function(preorder, inorder) {
    const preQueue = new Queue([...preorder]);
    const inorderMap = new Map();
    for(let i = 0; i < inorder.length; i++) {
        inorderMap.set(inorder[i], i);
    }
    return dfs(preQueue, inorderMap, 0, inorder.length -1)
};

var dfs = function(preQueue, inorderMap, left, right) {
    //if queue is empty we have reached the end
    if (preQueue.isEmpty()) return null;
    
    // Peek at the next preorder value and check where it's inorder position
    const nextNodeVal = preQueue.front()
    const inorderPos = inorderMap.get(nextNodeVal)
    // If we are outside of our window, return early
    if (inorderPos < left || inorderPos > right) return null;
    
    // Now create our new root from front of queue
    const root = new TreeNode(preQueue.dequeue())
    // Divide remaining inorder array
    root.left = dfs(preQueue, inorderMap, left, inorderPos - 1)
    root.right = dfs(preQueue, inorderMap, inorderPos + 1, right)
    return root
} 