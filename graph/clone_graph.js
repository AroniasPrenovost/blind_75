/* 


  Given a reference of a node in a connected undirected graph.

  Return a deep copy (clone) of the graph.

  Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

  class Node {
      public int val;
      public List<Node> neighbors;
  }
  

  Test case format:

  For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.

  An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

  The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

  

  Example 1:

      Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
      Output: [[2,4],[1,3],[2,4],[1,3]]
      Explanation: There are 4 nodes in the graph.
      1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
      2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
      3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
      4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).


      
  Example 2:

      Input: adjList = [[]]
      Output: [[]]
      Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.




  Example 3:

      Input: adjList = []
      Output: []
      Explanation: This an empty graph, it does not have any nodes.



  Example 4:

      Input: adjList = [[2],[1]]
      Output: [[2],[1]]
      

  Constraints:

    The number of nodes in the graph is in the range [0, 100].
    1 <= Node.val <= 100
    Node.val is unique for each node.
    There are no repeated edges and no self-loops in the graph.
    The Graph is connected and all nodes can be visited starting from the given node.


*/ 




/* 


  approach #1 - depth first search 

    1. Use DFS to traverse all nodes and store them to an array.
    2. Iterate through the array and for each node record it to a hash table with a new instance of the node.
    3. Iterate through the array again and for each node iterate through all its neighbour nodes. 
    For each neighbour node, access the clone node in hash table and connect current clone node to these neighbour clones.

*/


var cloneGraph = function(node) {
  if (!node) {
      return null;
  }
  let arr = [];
  dfs(node, arr);
  let nodeMap = new Map();
  for (let i = 0; i < arr.length; i++) {
      nodeMap.set(arr[i], new Node(arr[i].val));
  }
  for (let i = 0; i < arr.length; i++) {
      for (let neighbor of arr[i].neighbors) {
          let copiedNode = nodeMap.get(neighbor);
          nodeMap.get(arr[i]).neighbors.push(copiedNode);
      }
  }
  return nodeMap.get(node);
  // T.C: O(V+E), we visit every vertex and every edge
  // S.C: O(V), visited map, nodeMap, dfs call stack all have a space complexity of O(V)
};

function dfs(node, arr, visited=new Map()) {
  if (visited.has(node)) {
      return;
  }
  visited.set(node, true);
  arr.push(node);
  for (let neighbor of node.neighbors) {
      dfs(neighbor, arr, visited);
  }
}




/*    

  simple DFS solution 

  Keep track of all visited nodes in an object
  Recursively clone each node and it's edge nodes starting from the root node

  - faster than 93% of submissions 

*/ 

var cloneGraph = function(node) {
    
    function dfsHelper(root) {
        if(root === null) {
            return null;
        }
        
        if(visited[root.val]) {
            return visited[root.val];
        }
        
        let cloned = new Node(root.val);
        visited[cloned.val] = cloned;
        
        for (let edge of root.neighbors) {
            cloned.neighbors.push(dfsHelper(edge));
        }
        return cloned;    
    }
    
    const visited = {}
    return dfsHelper(node);
};







/* 

  approach #2 - hashmap + depth first search 

 
  1.Consider every node as a graph.
  2. For every node given, check if its clone exists in given hash table.
  If so, return it from hash table.
  Else, create a clone of given node. Iterate through given node's neighbours and clone each neighbor
  and push it to cloned node's neighbors array.
  3. Return cloned node.



  Time: O(N)
  Space: O(N)

*/

 

var cloneGraph = function(graph) {
  if(!graph) return null;
  const map = new Map();
  
  function clone(node) {
    if(map.has(node)) return map.get(node);
    const newNode = new Node(node.val);
    map.set(node, newNode);
    
    for(let next of node.neighbors) {
        newNode.neighbors.push(clone(next));
    }

    return newNode;
  }

  return clone(graph);
};


/*    */ 


var cloneGraph = function (node, cloneMap = new Map()) {
  if (!node) {
    return null;
  }
  if (cloneMap.has(node)) {
    return cloneMap.get(node);
  }
  let cloneNode = new Node(node.val, []);
  cloneMap.set(node, cloneNode);
  for (let neighbor of node.neighbors) {
    cloneNode.neighbors.push(cloneGraph(neighbor, cloneMap));
  }
  return cloneNode;
  // T.C: O(V+E), we visit every vertex and every edge
  // S.C: O(V), cloneMap has a space complexity of O(V)
};

























/* 


  approach #3 - breadth first search 


*/ 



var cloneGraph = function(node) {
  // If start node is null than we can't do any cloning
  let start = node; 
  if (start === null) return null;
  // vertexMap is the original node reference to our node
  const vertexMap = new Map(); 
  
  
  // Add the start node to the queue. Give the start node a clone in the vertex map
  const queue = [start]
  vertexMap.set(start, new Node(start.val)); 
  
  /*
  * Breadth first search continues unitil we process all the vertices in the graph
  * In the original graph. We know this is done when queue is empty
  */
  
  while (queue.length > 0) {
      // We grab a node. We will express all of the edges coming off of this node.
      const currentVertex = queue.shift(); 
      // Iterate over all adjacents.
      for (const neighbor of currentVertex.neighbors) {
        // Has this neighbor been given a clone?
          if (!vertexMap.has(neighbor)) {
              /*
              * No? Give it a mapping and add the original neighbor to the search queue so we
              * can express ITS edges later
              */
              vertexMap.set(neighbor, new Node(neighbor.val))
              queue.push(neighbor); 
          }
          
          /*
          * Draw the edge from currVertex's clone to neighbor's clone. Do you see how our
          * hashtable makes this quick access possible?
          */
          vertexMap.get(currentVertex).neighbors.push(vertexMap.get(neighbor)); 
      }
  }
 return vertexMap.get(start); 
  
};









//  Depth First Search 

var cloneGraph = function(node, map = new Map()) {
  if(!node) return null
  if(map.has(node)) return map.get(node)
  const n = new Node(node.val)
  map.set(node, n)
  for(let k of node.neighbors){    
    n.neighbors.push(cloneGraph(k, map))
  }
  return n
};




//  Breadth First Search 

var cloneGraph = function(node, map = new Map()) {
  if(!node) return null
  map.set(node, new Node(node.val))
  const queue = [node]
  while(queue.length){
    const n = queue.shift()
    for(let k of n.neighbors){
      if(!map.has(k)){
        map.set(k, new Node(k.val))
        queue.push(k)        
      }      
      map.get(n).neighbors.push(map.get(k))
    }
  }
  return map.get(node)
};