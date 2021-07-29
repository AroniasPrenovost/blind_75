/* 

 You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

  Return the number of connected components in the graph.

  

  Example 1:

      Input: n = 5, edges = [[0,1],[1,2],[3,4]]
      Output: 2

  Example 2:

      Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
      Output: 1
  

  Constraints:

    1 <= n <= 2000
    1 <= edges.length <= 5000
    edges[i].length == 2
    0 <= ai <= bi < n
    ai != bi
    There are no repeated edges.



*/ 




/* 


  approach #1 - Depth-First Search (DFS)


*/ 



/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
 var countComponents = function(n, edges) {
  if(!edges || edges.length === 0) return n;
  
  let vertices = flat(edges),
      adjacencyList = buildGraph(edges),
      visited = { }, count = n - vertices.length;
  
  const dfs = start => {
      if(!adjacencyList[start]) return [];

      let stack = [start], vertex

      while(stack.length > 0){
          vertex = stack.pop();
          
          if(!visited[vertex]){
              visited[vertex] = true
              let neighbors = adjacencyList[vertex
                                           ];
              for(let i = neighbors.length - 1; i >= 0; i--){
                  stack.push(neighbors[i])
              }
          }
      }

      return Object.keys(visited);
  };
  
  for(let v of vertices){
      if(!visited[v]){
          count++;
          dfs(v);
      }
  }
  
  return count
  
};

const buildGraph = edges => {
  let adjList = { };
  
  for(let edge of edges){
      let vertexOne = edge[0], vertexTwo = edge[1];
      if(!adjList[vertexOne]) adjList[vertexOne] = [];
      if(!adjList[vertexTwo]) adjList[vertexTwo] = [];
      
      adjList[vertexOne].push(vertexTwo);
      adjList[vertexTwo].push(vertexOne);
  }
  
  return adjList;
}

const flat = arr => {
  let temp = []
  arr.forEach(a => temp.push(...a))
  return [...new Set(temp)]
}







/* 


  approach #2 - Disjoint Set Union (DSU)


  There are several ways to approach this problem. I chose to use Union-Find. We can take advantage of dictionaries in js. We start by initiating each node to -1. This indicates that each node is part of their own set and is the root. When an edge joins two nodes, we update one node to point to the other. In this solution I arbitrarily chose the right node to point to the left node. The two for loops follow the chain up until they reach a root node. If left and right point to two different roots then this edge joins two sets together and we update that information.

  It's possible remove the second for loop that counts the number of roots. I leave it as an exercise to the reader.

*/ 




var countComponents = function(n, edges) {
var sets = {};
for(var i = 0; i < n; i++){
    sets[i] = -1;
}
var left;
var right;
edges.forEach( function(edge){
    for(left = edge[0]; sets[left] != -1; left = sets[left]);
    for(right = edge[1]; sets[right] != -1; right = sets[right]);
    if(left != right){
        sets[right] = left;
    }
});
var count = 0;
for(var key in sets){
    if(sets[key] === -1){
        count++;
    }
}
return count;
};





/* v.2 */ 


var countComponents = function(n, edges) {
  const arr = [];
  for (let i = 0; i < n; i += 1) {
    arr[i] = i;
  }

  const find = x => {
    if (x != arr[x]) {
      arr[x] = find(arr[x]);
    }
    return arr[x];
  };

  edges.forEach(e => {
    const u = find(e[0]), v = find(e[1]);
    if (u != v) arr[u] = v;
  });

  let ans = 0;
  arr.forEach((a, i) => (ans += a == i ? 1 : 0));

  return ans;
};



/* v.3 */ 

var countComponents = function(n, edges) {
  var count = 0;
  var isVisited = [];
  var graph = [];
  for(var j = 0; j < n; ++j) {
      isVisited.push(false);
      graph.push([]);
  }

  for(j = 0; j < edges.length; ++j) {
      var one = edges[j][0];
      var two = edges[j][1];
      graph[one].push(two);
      graph[two].push(one);
  }

  for(var i = 0; i < n; ++i) {
      if(isVisited[i]) continue;
      dfs(i, isVisited, graph);
      count++;
  }

  return count;
};
  
function dfs(node, isVisited, graph) {
  isVisited[node] = true;
  var nodes = graph[node];
  for(var i = 0; i < nodes.length; ++i) {
      if(isVisited[nodes[i]]) continue;
      dfs(nodes[i], isVisited, graph);
  }
}



/*

  approach #3 - using Set 
  
*/ 

var countComponents = function(n, edges) {
  let graph = [];
  
  for(let edge of edges){
      if(!graph[edge[0]]) graph[edge[0]] = [];
      if(!graph[edge[1]]) graph[edge[1]] = [];
      
      graph[edge[0]].push(edge[1]);
      graph[edge[1]].push(edge[0]);
  }
  
  let visited = new Set(),
      cnt = 0,
      i=0,
      queue = [],
      visitedSize = 0;
  
  while(i<n){
      queue.push(i);        
      
      while(queue.length != 0){        
          const curr = queue.shift();
          if(!visited.has(curr)){
              visited.add(curr);
              if(graph[curr])
                  queue.push(...graph[curr])
          }
      }
      if(visited.size != visitedSize){
          cnt++;
          visitedSize=visited.size;
      }
      i++;
  }
  return cnt;
};