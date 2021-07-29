/* 
  
  Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

  According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

  Example 1:

      Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
      Output: 6
      Explanation: The LCA of nodes 2 and 8 is 6.


  Example 2:

      Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
      Output: 2
      Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.


  Example 3:

      Input: root = [2,1], p = 2, q = 1
      Output: 2
  

  Constraints:

    The number of nodes in the tree is in the range [2, 105].
    -109 <= Node.val <= 109
    All Node.val are unique.
    p != q
    p and q will exist in the BST.

*/ 



/* 


  approach #1 - recursive


*/ 

var lowestCommonAncestor = function(root, p, q) {
  if(p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q)
  } else if (p.val > åroot.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q)
  } else {
    return root;
  }
};




/* v.2 */ 

var lowestCommonAncestor = function(root, p, q) {
  if(p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right, p, q);
  
  if(p.val < root.val && q.val < root.val) return lowestCommonAncestor(root.left, p , q);
  
  return root;
};



/* v.3 recursive */ 


var lowestCommonAncestor = function(root, p, q) {
  if(root){
      if(root.val=== p.val || root.val=== q.val) return root
      let left = null;
      let right = null;
      
      // Only in BST condition, reducing the round of recursions
      if(p.val>root.val && q.val>root.val){
          right = lowestCommonAncestor(root.right, p, q);
      }
      else if(p.val<root.val && q.val<root.val){
          left = lowestCommonAncestor(root.left, p, q);
      }
      else{
          left = lowestCommonAncestor(root.left, p, q);
          right = lowestCommonAncestor(root.left, p, q);
      }
      
      if(left && right) return root;
      return left || right;
  }
  return null;
  
};








/* 

  approach #3 - iterative approach 

  iteration is faster than recursion due to recursive call stack frame

*/ 


var lowestCommonAncestor = function(root, p, q) {
  while(root) {
      if(root.val > p.val && root.val > q.val) root = root.left;
      else if(root.val < p.val && root.val < q.val) root = root.right;
      else return root;
  }
};



/* v.2 */ 

var lowestCommonAncestor = function(root, p, q) {
  while(true){
      if(p.val < root.val && q.val < root.val) root = root.left;

      else if(p.val > root.val && q.val > root.val) root = root.right;

      else return root;
  }
}


















/*

  approach #3 - Depth-First Search 

  Time Complexity = O(H) , where H is the height of the tree. In a balanced BST H = log N
  Space Complexity = O(H)

*/ 

var lowestCommonAncestor = function(root, p, q) {
    
    function run(node) {
        if(node === p || node === q) return node;

        if(p.val < node.val && q.val > node.val) return node;
        if(p.val > node.val && q.val < node.val) return node;
        
        if(p.val < node.val) return run(node.left)
        return run(node.right);
    }
    return run(root)
};