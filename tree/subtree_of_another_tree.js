/* 

  Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

  A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

  Example 1:

      Input: root = [3,4,5,1,2], subRoot = [4,1,2]
      Output: true


  Example 2:

      Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
      Output: false

  Constraints:

    The number of nodes in the root tree is in the range [1, 2000].
    The number of nodes in the subRoot tree is in the range [1, 1000].
    -104 <= root.val <= 104
    -104 <= subRoot.val <= 104

*/ 




/* 


  approach #1 - recursive 


*/ 


var isSubtree = function(s, t) {
  // helper fn to check if both tree are same
 const isSameTree = (t1, t2) => {
     if(!t1 && !t2) return true;
     if(!t1 || !t2) return false;
     if(t1.val !== t2.val) return false;
     
     return isSameTree(t1.left, t2.left) && isSameTree(t1.right, t2.right);
 }
 // main helper recursion fn
 const helper = (t1, t2) => {
     // check t1 for null because if it is null then t2 does not exist as we are incrementing t1 for every mismatch
     if(!t1) return false;
     // check for same tree, return true if found
     if(isSameTree(t1, t2)) return true;
     // otherwise check match t2 with t1.left and t2.right
     return helper(t1.left, t2) || helper(t1.right, t2);
 }
 
 return helper(s, t)
};





/* v.2 */ 


var isSubtree = function(s, t) {
    
  if(!s) {
    return false
  } else if( issametree(s, t)){
    return true 
  } else {
    return isSubtree(s.left, t) || isSubtree(s.right, t)
  }

  function issametree(s,t){
      if(!s || !t){
          return s==null && t== null
      }else if (s.val ==t.val){
          return issametree(s.left, t.left) && issametree(s.right, t.right)
      } else {
          return false
      }
  }
};




/* 

  v.3 

  This solution is an iterative DFS on the larger tree, 
  with a call to a recursive function to check if the subtrees are equal. 
  Note that most of the time, the recursive function will return immediately without recursion 
    because root1.val !== root2.val 

*/

var isSubtree = function(s, t) {
    let stack = [s];    
    while (stack.length > 0) {
        let node = stack.pop();
        if (isSubtreeEqual(node, t)) {
            return true;
        }
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }
    
    return false;
};

function isSubtreeEqual(root1, root2) {
    if (root1 === null && root2 === null) {
        return true;
    } else if (root1 === null || root2 === null) {
        return false;
    } else {
        return root1.val === root2.val 
        && isSubtreeEqual(root1.left, root2.left) 
        && isSubtreeEqual(root1.right, root2.right);
    }
}



/* 

  v.4 


  concise, recursive DFS 
  
*/

var isSubtree = function(s, t) {
  if (!s) return !t;
  return isEqual(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
};

function isEqual(root1, root2) {
  if (!root1 || !root2) return !root1 && !root2;
  if (root1.val !== root2.val) return false;
  return isEqual(root1.left, root2.left) && isEqual(root1.right, root2.right);
}









/* v.5 recursive */ 

var isSubtree = function (s, t) {
  if(s == null) return false;
  return isSameTree(s, t) || isSubtree(s.right, t) || isSubtree(s.left, t);
};

var isSameTree = function (s, t) {
  if (s == null && t == null) {
      return true;
  }
  if (s == null || t == null || s.val !== t.val) {
      return false;
  }
  return isSameTree(s.right, t.right) && isSameTree(s.left, t.left);
}









/* 


  approach #2 - Breadth-First Search (BFS)


*/ 

var isSubtree = function(root, subRoot) {
	// Checks if sub tree is a part of the main tree 
    const isSub = (n) => {
        const mainQueue = [n]
        const subQueue = [subRoot]
        
        while(mainQueue.length || subQueue.length) {
            const mainNode = mainQueue.shift()
            const subNode = subQueue.shift()
            
            if(!subNode && !mainNode) continue
            else if(!subNode || !mainNode) return false
            
            if(mainNode.val !== subNode.val) return false
            
            mainQueue.push(mainNode.left, mainNode.right)
            subQueue.push(subNode.left, subNode.right)
        }
        return true
    }
    
    const queue = [root]
    while(queue.length) {
        const currNode = queue.shift()
        if(currNode.val === subRoot.val) if(isSub(currNode)) return true
        if(currNode.left) queue.push(currNode.left)
        if(currNode.right) queue.push(currNode.right)
    }
    
    return false
};




/* 

  approach #3 - no recursion, no traverse

*/ 

var isSubtree = function(s, t) {
  return JSON.stringify(s).indexOf(JSON.stringify(t)) !== -1
};