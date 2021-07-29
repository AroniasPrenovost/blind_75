/* 

  Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

  Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

  Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.


  Example 1:

      Input: root = [1,2,3,null,null,4,5]
      Output: [1,2,3,null,null,4,5]


  Example 2:

      Input: root = []
      Output: []


  Example 3:

      Input: root = [1]
      Output: [1]


  Example 4:

      Input: root = [1,2]
      Output: [1,2]
  
  Constraints:

      The number of nodes in the tree is in the range [0, 104].
      -1000 <= Node.val <= 1000

*/ 




/* 


  approach #1 - Depth-First Search (DFS)

  Serialize
    init a queue and add root
    while there's stuff in queue:
      pop
      if left node, add value to out, and enqueue
      else just add null to out
  Deserialize
    map out input into an array
    init a queue and add new node as root with value of 1st arr element
    while there's stuff in the queue:
      pop parent
      append children:
        advance index
        if within bounds and not null, append L and R

*/ 


const serialize = (root) => {
    if(!root) return '';
    
    const queue = new Array();
    
    let out = `${root.val}`;
    
    queue.unshift(root);
    
    while(queue.length) {
        const curr = queue.pop();
        
        if(curr.left) {
            out = `${out},${curr.left.val}`;
            queue.unshift(curr.left);
        } else out = `${out},null`;
        
        if(curr.right) {
            out = `${out},${curr.right.val}`;
            queue.unshift(curr.right);
        } else out = `${out},null`;
    }

    return out;
};

const deserialize = (data) => {
    if(!data || data === '') return null;
    
    const   queue = new Array(),
            dataArr = data.split(',').map(r => r === 'null' ? null : parseInt(r)),
            root = new TreeNode(dataArr[0]),
            idx = {i: 0}
          
    queue.unshift(root);
    
    while(queue.length) {
        const parent = queue.pop();
        
        appendChild(dataArr, idx, parent, true, queue);
        appendChild(dataArr, idx, parent, false, queue);
    }
    
    return root;
};

const appendChild = (dataArr, idx, parent, left, queue) => {
    idx.i += 1;
    if(idx.i < dataArr.length) {
        const candidate = dataArr[idx.i];
        if(candidate !== null) {
            const cand = new TreeNode(candidate);
            if(left) parent.left = cand;
            else parent.right = cand;
            queue.unshift(cand);
        }
    }    
} 




/* 

  v.2    
  
  approach #5 - level order traversal (BFS)

*/ 

var serialize = function(root) {
  const res = [];
  const queue = root ? [root] : [];
  while (queue.length) {
      let node = queue.shift();
      if (node) {
          res.push(node.val);
          queue.push(node.left || null);
          queue.push(node.right || null);
      } else {
          res.push(null);
      }
  }
  while (res[res.length - 1] === null) res.pop();
  return JSON.stringify(res);
};

var deserialize = function(data) {
  const arr = JSON.parse(data);
  if (!arr.length) return null;
  const root = new TreeNode(arr.shift());
  const queue = [root];
  while (queue.length) {
      let node = queue.shift(), val;
      node.left = (val = arr.shift()) || val === 0 ? new TreeNode(val) : null;
      node.right = (val = arr.shift()) || val === 0 ? new TreeNode(val) : null;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
  }
  return root;
};




/* 

  approach #2 - iterative 


*/ 



/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
 var serialize = function(root) {
  if (!root) return root;
  const res = [];
  let head = root;
  let queue = [root];
  
  while(queue.length) {
      for (let i = 0; i < queue.length; i++) {
          let node = queue.shift();
          const val = node === null ? null : node.val;
          res.push(val);
          if (node) {
              queue.push(node.left);
              queue.push(node.right);
          }
      }
  }
  
  return JSON.stringify(res);
};

/**
* Decodes your encoded data to tree.
*
* @param {string} data
* @return {TreeNode}
*/
var deserialize = function(data) {
  data = JSON.parse(data);
  if (!data) return data;
  let root = new TreeNode(data.shift())
  let temp = root;
  let queue = [temp];
  let left = true
  while(data.length) {
      const parent = queue.shift();
      const val1 = data.shift();
      const val2 = data.shift();
      const node1 = val1 === null ? null : new TreeNode(val1);
      const node2 = val2 === null ? null : new TreeNode(val2);
      append(left, parent, node1, queue);
      append(!left, parent, node2, queue);
  }
  
  return root;
};

function append(left, parent, node, queue) {
  if (left) {
      parent.left = node;
      if (node) queue.push(node);
  } else {
      parent.right = node;
      if (node) queue.push(node);
  }
}

/**
* Your functions will be called as such:
* deserialize(serialize(root));
*/










 


/* 

  approach #3 - eazy peazy

*/ 

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
 var serialize = function(root) {
  return JSON.stringify(root);
};

/**
* Decodes your encoded data to tree.
*
* @param {string} data
* @return {TreeNode}
*/
var deserialize = function(data) {
  return JSON.parse(data);
};

/**
* Your functions will be called as such:
* deserialize(serialize(root));
*/






/* 

  approach #4 - recursive

  kind of slow

*/ 

class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
  }
}

let serialize = (root, result = []) => {
  if (root) {
    result.push(root.val);
    result.push(...serialize(root.left));
    result.push(...serialize(root.right));
  } else {
    result.push(null);
  }
  return result;
};

let deserialize = (data = []) => {
  let val = data.shift();
  if (val == null) return null;
  let node = new TreeNode(val);
  node.left = deserialize(data);
  node.right = deserialize(data);
  return node;
};





