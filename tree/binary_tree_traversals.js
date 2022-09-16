//////////////////////////
//
// Binary Tree Inorder Traversal
//
//////////////////////////


// v1 (slow)

var inorderTraversal = function(root) {
    let result = [];
    dfs(root);
    
    function dfs(root) {
        if(root != null) {
            dfs(root.left);
            result.push(root.val);
            dfs(root.right);
        }
    }
    return result;
};

inorderTraversal([]);           // []
inorderTraversal([1]);          // [1]
inorderTraversal([1,null,2,3]); // [1, 3, 2]



// v2

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    var stack = []
    function traver(root){
        if(!root) return 
        traver(root.left)
        stack.push(root.val)
        traver(root.right)
    }
    traver(root)
    return stack
};

inorderTraversal([]);           // []
inorderTraversal([1]);          // [1]
inorderTraversal([1,null,2,3]); // [1, 3, 2]

// v3

var inorderTraversal = function(root) {
    let result = [];

    const traverse = node => {
      if (!node) {
          return;
      }
      
      if (node.left) [
        traverse(node.left);
      }

      result.push(node.val)

      if (node.right) {
          traverse(node.right)
      }

    }

    traverse(root)
    return result
};





//////////////////////////
//
// Binary Tree preorder Traversal
//
//////////////////////////


// v1 

var preorderTraversal = function(root) {
    let result = [];
    dfs(root);
    
    function dfs(root) {
        if(root != null){
            result.push(root.val);
            dfs(root.left);
            dfs(root.right);
        }
    }
    return result;
};


console.log(preOrderTraversal([1,null,2,3])); // [1,2,3]
console.log(preOrderTraversal([]));
console.log(preOrderTraversal([1]));

// v2

var preorderTraversal = function(root) {
    var result = [];
    
    traversal(root);
    
    function traversal(root){
        if(root===null){
            return result;
        }         
        else{
            result.push(root.val);
            traversal(root.left);
            traversal(root.right);
        }   
    };
    return result;
};


console.log(preOrderTraversal([1,null,2,3])); // [1,2,3]
console.log(preOrderTraversal([]));
console.log(preOrderTraversal([1]));


// v3

var preorderTraversal = function(root) {
    let result = [];
    dfs(root);
    
    function dfs(root) {
        if(root != null){
            result.push(root.val);
            dfs(root.left);
            dfs(root.right);
        }
    }
    return result;
};



//////////////////////////
//
// Binary Tree postorder Traversal
//
//////////////////////////

// v1

const postorderTraversal = root => {
    const ans = [];
    const postOrderDFS = node => {
        if (!node) return;
        if (node.left) postOrderDFS(node.left);
        if (node.right) postOrderDFS(node.right);
        ans.push(node.val);
        return;
    }
    postOrderDFS(root);
    return ans;
};

postorderTraversal([]);           // []
postorderTraversal([1]);          // [1]
postorderTraversal([1,null,2,3]); // [3,2,1]



// v2


var postorderTraversal = function(root) {
    const arr =[]
    function X(r){
        if(!r)
            return;
        X(r.left)
        X(r.right)
        arr.push(r.val)
    }
    X(root)
    return arr
};

postorderTraversal([]);           // []
postorderTraversal([1]);          // [1]
postorderTraversal([1,null,2,3]); // [3,2,1]


// v3


var postorderTraversal = function(root) {
    let res = [];
    const dfs = (node) => {
      if(!node || node == null) return;
      dfs(node.left);
      dfs(node.right);
      res.push(node.val);
    }
    
    dfs(root);
    return res;
};

postorderTraversal([]);           // []
postorderTraversal([1]);          // [1]
postorderTraversal([1,null,2,3]); // [3,2,1]


// v4


var postorderTraversal = function(root) {
    if (!root) return [];
    
    var result = [], stack = [root];
    
    while (stack.length) {
        var node = stack.pop();
        // insert the node val to the front
        result.unshift(node.val);

        if (node.left) stack.push(node.left); // left first
        if (node.right) stack.push(node.right); // then right
    }
    
    return result;
};
