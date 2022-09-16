//////////////////////////
//
// Binary Tree Inorder Traversal
//
//////////////////////////



//////////////////////////
//
// Binary Tree preorder Traversal
//
//////////////////////////



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
