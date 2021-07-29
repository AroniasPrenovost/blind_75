/* 

  You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.

  Return true if the edges of the given graph make up a valid tree, and false otherwise.

  

  Example 1:

      Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
      Output: true
  
  
  Example 2:

      Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
      Output: false
  

  Constraints:

    1 <= 2000 <= n
    0 <= edges.length <= 5000
    edges[i].length == 2
    0 <= ai, bi < n
    ai != bi
    
    There are no self-loops or repeated edges.

*/ 




/* 


  approach #1 - Graph Theory + Iterative Depth-First Search



  Time: 79.39%
  Space: 42.86%
  visited - keep track of the status of each node (0 = unchecked, 1 = checking, 2= checked)
  nodeList - a key value pair to track each connecting node

  form a nodeList - to track what node to what node example: edge [0,1] --> {0: [1], 1:[0]}
  the starting traversal node will always be zero, so if zero node does not even exist in the nodeList just returns false;
  the last line: visited.includes(0) ? false : true; is to make sure that none of the nodes are isolated starting from node 0.

*/ 


var validTree = function(n, edges) {
  //graph to be valid tree, it has to be n-1 edges
  if (edges.length !== n-1) return false; 
  
  //build the graph
  //1. adj list
  const graph = new Map();
  for (let i = 0; i<n; i++) {
    graph.set(i, []);
  }

  //2. edges
  for (let [from, to] of edges) {
    graph.get(from).push(to);
    graph.get(to).push(from);
  }
  
  //iterative traversal
  const seen = new Set();
  const stack = [0];
  while (stack.length) {
    const node = stack.pop();
    seen.add(node);
    
    for (let nei of graph.get(node)) {
      if (!seen.has(nei)) {
          stack.push(nei);
      }
    }
  }
  
  return seen.size === n;
};




/* v.2 */ 



 
var validTree = function(n, edges) {
    if (n === 1 && !edges.length) {
        return true;
    }
    // 0 = unchecked 1 = checking 2 = checked
    const visited = new Array(n).fill(0);
    const nodeList = {};
    edges.forEach(function(edge, index) {
        if (nodeList[edge[0]] === undefined) {
            nodeList[edge[0]] = [];
        }
        if (nodeList[edge[1]] === undefined) {
            nodeList[edge[1]] = [];
        }
        nodeList[edge[0]].push(edge[1]);
        nodeList[edge[1]].push(edge[0]);
    });
    if (nodeList[0] === undefined) {
        return false;
    }
    if (!traverse(0,0)) {
        return false;
    }
    return visited.includes(0) ? false : true;
    function traverse(start, parent) {
        if (visited[start] === 1) {
            return false;
        }
        visited[start] = 1;
        
        for(let i = 0; i < nodeList[start].length; i++) {
            const node = nodeList[start][i];
            if (visited[node] === 2 || node === parent) continue;
            if (!traverse(node, start)) {
                return false;
            }
        }
        visited[start] = 2;
        return true;
    }
};








/* 


  approach #2 - Advanced Graph Theory + Iterative Depth-First Search


*/ 











/* 


  approach #3 - Advanced Graph Theory + Union Find 

  Comparing existing solutions, I didn't see a simple union find example for JS but it's pretty straightforward.
  Since we are just checking for a cyclic graph, any time we actually hit the if condition in union(m,n) we can return false.

  I think Union Find is a much cleaner approach here,  

*/ 


var validTree = function(n, edges) {

  //  UNION FIND
  // basecases
  if ((n - 1) !== edges.length) return false
  if (!edges.length) return true
  
  // build initial rep nodes (each node points to itself to start), effectively a pointer array to each node's rep or parent node 
  let rep = []
  for (let i = 0; i < n; ++i) {
    rep[i] = i
  }
  
  // recursively look for a nodes parent or rep node, and continues until it reaches the root
  function find(n) {
    while (rep[n] !== n) n = rep[n]
    return n
  }
  
  // join two nodes in rep array, if the nodes have roots, we'll re-assign one root to point to the other
  // in a more complex scenario, it'd be more performant to check for the smaller component and move that - we could add a count to find if we needed this.
  function union(m, n) {
    let rM = find(m)
    let rN = find(n)
    
	// checks for a cycle. any logic required for a cyclic pattern would apply here. 
	// since this problem only requires validating a tree, any cycles are the breaking condition. 
    if (rM === rN) return false
	
	// re-assigning one root to the other
    rep[rM] = rN
    return true
  }
  
  // iif we find a cycle through the edges, we want to stop execution there.
  for (const [i, j] of edges) if (!union(i,j)) return false
  return true
};



/* breadth-first search */ 

    
var validTree = function(n, edges) {

  // basecases
  if ((n - 1) !== edges.length) return false
  if (!edges.length) return true
  
  // build adjList
  let adjList = []
  
  for (let i = 0; i < n; ++i) {
    adjList[i] = new Set()
  }
  for (const [i, j] of edges)  {
    adjList[i].add(j)
    adjList[j].add(i)
  }
  
  // visited queue
  let visited = new Array(n).fill(false)
  let queue = []
  queue.push(edges[0])
  
  while(queue.length) {
    let [i, j] = queue.pop()
    // invalid tree check
    if (visited[i] && visited[j]) return false
    
    // visit j since i is visited
    if (!visited[j]) {
      visited[j] = true
      for (let adjNode of adjList[j]) {
        if (adjNode !== i) queue.push([adjNode, j])
      }
    }
    
    // visit i since j is visited
    if (!visited[i]) {
      visited[i] = true
      for (let adjNode of adjList[i]) {
        if (adjNode !== j) queue.push([adjNode, i])
      }
    }
  }
  
  return !visited.some(e => !e)
}






/* 

  approach #4 - breadth-first search 

*/ 


/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
 var validTree = function(n, edges) {
  // No cycle && only one resion => true
  let graph = buildGraph(n, edges);
  let regions = 0;
  let visited = {};
  let parent = {};
  
  for (let v = 0; v < n; v ++) {
      if(!visited[v]) {
          regions ++;
          if (regions > 1) return false;
          if (isCycle(v, graph, visited, parent)) return false;
      }
  }
  return true;
};

const buildGraph = (n, edges) => {
  let graph = Array.from({length:n}, () => [])
  for (let edge of edges) {
      let [src, dest] = edge;
      graph[src].push(dest)
      graph[dest].push(src);
  }
  return graph;
}

const isCycle = (node, graph, visited, parent) => {
  let queue = [node];
  while (queue.length) {
      let currentNode = queue.shift();
      visited[currentNode] = true;
      for (let neighbor of graph[currentNode]) {
          if(!visited[neighbor]) {
              visited[neighbor] = true;
              parent[neighbor] = currentNode;
              queue.push(neighbor);
          } else {
              if(neighbor !== parent[currentNode]) return true;
          }
      }
  }
  return false;
}