/* 

 There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

  For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
  Return true if you can finish all courses. Otherwise, return false.


  Example 1:

      Input: numCourses = 2, prerequisites = [[1,0]]
      Output: true
      Explanation: There are a total of 2 courses to take. 
      To take course 1 you should have finished course 0. So it is possible.


  Example 2:

      Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
      Output: false
      Explanation: There are a total of 2 courses to take. 
      To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
  

  Constraints:

    1 <= numCourses <= 105
    0 <= prerequisites.length <= 5000
    prerequisites[i].length == 2
    0 <= ai, bi < numCourses
    All the pairs prerequisites[i] are unique.


*/ 




/* 


  approach #1 - backtracking 


*/ 











/* 


  approach #2 - postorder DFS (Depth-First Search)


*/ 

//There are 2 states for a node:
//1: visited
//2: visiting
var canFinish = function(numCourses, prerequisites) {
  var courseMap = {};
  for(var require of prerequisites) {
      if(!courseMap[require[1]]) courseMap[require[1]] = [];
      courseMap[require[1]].push(require[0]);
  }
  var visited = Array(numCourses); //visited[i] -> the status of node i, either be 1, 2, or undefined(not visited yet)
  for(var i = 0; i < numCourses; i++) {
      if(!visited[i] && !dfs(i, courseMap, visited)) return false
  }
  return true;
};

var dfs = (course, map, visited) => {
  if(visited[course] === 1) return true; //OK
  if(visited[course] === 2) return false //CYCLE
  visited[course] = 2;
  if(map[course]) {
      for(var nextCourse of map[course]) {
          if(!dfs(nextCourse, map, visited)) return false //CYCLE
      }
  }
  visited[course] = 1;
  return true; //no cycle
}

// define CourseNode class
class CourseNode {
  constructor(courseNum) {
    this.courseNum = courseNum;
    this.preReqs = []; // array of courseNodes
    this.visited = false;
    this.isVisiting = false;
  }
}

// populate eachCourse with Nodevalues
const createGraph = (numCourses, prerequisites) => {
  // define the graph
  const graph = [];

  for (let i = 0; i < numCourses; i++) {
    // create a new courseNode at i
    const courseNode = new CourseNode(i);

    // add each course to corresponding node position on graph
    graph[i] = courseNode;
  }

  for (const [course, preReq] of prerequisites) {
    // to get the CourseNode to add in preReq, it will be in its position on the graph
    const preReqCourse = graph[preReq];

    // pushing our preReq node do array of prereqs
    graph[course].preReqs.push(preReqCourse);
  }

  // return the graph
  return graph;
};

var canFinish = function (numCourses, prerequisites) {
  // create a graph of courses
  const courses = createGraph(numCourses, prerequisites);

  // loop through courses
  for (let course of courses) {
    // presense of cycle means courses can not be completed
    if (hasCycle(course)) {
      // we can not complete our courses
      return false;
    }
  }

  // if no cycle, return false
  return true;
};

// dfs
const hasCycle = (course) => {
  // updated course visited and visiting properties
  course.visited = true;
  course.isVisiting = true;

  // loop thorugh preReqs array of each course
  for (const preReq of course.preReqs) {
    // if preReq has been visited
    if (!preReq.visited) {
      // check to see if prereq has cycle
      if (hasCycle(preReq)) {
        return true;
      }

      // if preReq is being visited, there is a cycle
    } else if (preReq.isVisiting) {
      return true;
    }
  }

  // at done, reset visiting
  course.isVisiting = false;

  // return false for no cycle
  return false;
};



/* 

  Depth-first search 

  

*/ 



/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
 var canFinish = function(nc, preqs) {
  let graph = buildGraph(nc,preqs);
  let visited = [];
  
  for (let i = 0; i < nc; i ++) {
      visited.push(0);
  }
  
  for (let i = 0; i < nc; i ++) {
      if(!dfs(graph, i, visited)) return false;
  }
  return true;
};

const buildGraph = (n, edges) => {
  let graph = Array.from({length: n}, () => []);
  
  for (let edge of edges) {
      let [src, dest] = edge;
      graph[dest].push(src);
  }
  
  return graph;
}

const dfs = (graph, node, visited) => {
  // 0 unvisited
  // -1 visiting
  // 1 visited
  
  if (visited[node] === -1) return false;
  if (visited[node] === 1) return true;
  visited[node] = -1;
  let nodes = graph[node];
  for (let i = 0; i < nodes.length; i ++) {
      if(!dfs(graph, nodes[i], visited)) return false;
  }
  visited[node] = 1;
  return true;
}



/* another dfs */ 


// define CourseNode class
class CourseNode {
  constructor(courseNum) {
    this.courseNum = courseNum;
    this.preReqs = []; // array of courseNodes
    this.visited = false;
    this.isVisiting = false;
  }
}

// populate eachCourse with Nodevalues
const createGraph = (numCourses, prerequisites) => {
  // define the graph
  const graph = [];

  for (let i = 0; i < numCourses; i++) {
    // create a new courseNode at i
    const courseNode = new CourseNode(i);

    // add each course to corresponding node position on graph
    graph[i] = courseNode;
  }

  for (const [course, preReq] of prerequisites) {
    // to get the CourseNode to add in preReq, it will be in its position on the graph
    const preReqCourse = graph[preReq];

    // pushing our preReq node do array of prereqs
    graph[course].preReqs.push(preReqCourse);
  }

  // return the graph
  return graph;
};

var canFinish = function (numCourses, prerequisites) {
  // create a graph of courses
  const courses = createGraph(numCourses, prerequisites);

  // loop through courses
  for (let course of courses) {
    // presense of cycle means courses can not be completed
    if (hasCycle(course)) {
      // we can not complete our courses
      return false;
    }
  }

  // if no cycle, return false
  return true;
};

// dfs
const hasCycle = (course) => {
  // updated course visited and visiting properties
  course.visited = true;
  course.isVisiting = true;

  // loop thorugh preReqs array of each course
  for (const preReq of course.preReqs) {
    // if preReq has been visited
    if (!preReq.visited) {
      // check to see if prereq has cycle
      if (hasCycle(preReq)) {
        return true;
      }

      // if preReq is being visited, there is a cycle
    } else if (preReq.isVisiting) {
      return true;
    }
  }

  // at done, reset visiting
  course.isVisiting = false;

  // return false for no cycle
  return false;
};







/* 

  another DFS 

*/ 

var canFinish = function (numCourses, prerequisites) {
  //Build up graph
  const g = Array(numCourses).fill().map(() => []);
  for (let [a, b] of prerequisites) g[b].push(a); // Build DAG (b -> a) using adjacency list.

  //DFS
  const perm = {}; // Done checking.
  const temp = {}; // Checking their children.
  const visit = (n) => {
    if (perm[n]) return true;  // We already checked this node and its children.
    if (temp[n]) return false; // This node's children has redirected us back to the node (Cyclic).
    temp[n] = true; // We mark this as currently being looked at.
    for (let child of g[n]) {
      if (!visit(child)) return false;
    }
    delete temp[n]; // Done checking children.
    perm[n] = true; // Done checking.
    return true;
  };

  for (let node of Object.keys(g)) {
    if (!visit(node)) return false;
  }

  return true;
};

















/* 


  approach #3 - Topological sorting (Kahn's Algorithm)


 
  Runtime: O(e + n) <-- Verify
  Space Complexity: O(e + n) <-- Verify

*/




var canFinish = function(nc, preqs) {
  let inDegree = new Array(nc).fill(0);
  let queue = [];
  for (let [course] of preqs) {
      inDegree[course] ++;
  };
  
  for (let i = 0; i < inDegree.length; i ++) {
      if(inDegree[i] === 0) queue.push(i)
  };
  
  while (queue.length) {
      let currentCourse = queue.pop();
      nc --;
      for (let [course, preq] of preqs) {
          if (preq === currentCourse) {
              inDegree[course] --;
              if (inDegree[course] === 0) {
                  queue.push(course);
              }
          }
      }
  }
  return nc === 0 
}


/* v.2 */ 





/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
 const canFinish = function(numCourses, prerequisites) {
  const graph = new Array(numCourses).fill(0).map(() => []);
  const indegree = new Array(numCourses).fill(0);
  
  // Create adjacency list and indegree array
  for (const prereq of prerequisites) {
    graph[prereq[1]].push(prereq[0]);
    indegree[prereq[0]]++;
  }
  
  // Topological sort
  for (let _ = 0; _ < numCourses; _++) {  
    const takenCourse = indegree.indexOf(0);
    if (takenCourse === -1) return false;
    indegree[takenCourse] = null;
    for (const adjCourse of graph[takenCourse]) indegree[adjCourse]--;
  }
  
  return true;
}




/* v.3 */ 







var canFinish = function(numCourses, prereqs) {
  if (numCourses === 0) return [];

  const n = prereqs.length;
  
  // Instantiate a new adjacency list. The index i in the list
  // contains an array of indices that course i is a prerequisite for 
  let adjList = new Array(numCourses);
  for(let i=0; i<numCourses; i++)  adjList[i] = [];
  
  // Create the adjacency list
  for(let i=0; i<n; i++) {
      const [ newClassId, newPrereqId ] = prereqs[i];
      adjList[newPrereqId].push(newClassId);
  }
  
  // Count the indegress of the adjacency list
  let indegs = indegrees(adjList);
  
  // Get all the zero indegrees
  let zeroIndegree = indegs.reduce((acc, element, index) => {
      if (element === 0) acc.push(index);
      
      return acc;
  }, []);
  
  // Instantiate an array for topological sorting
  let sorted = [];
  
  // Topological sort via indegrees
  while(zeroIndegree.length > 0) {
      let nodeIndex = zeroIndegree.pop();
      sorted.push(nodeIndex);
      
      // Remove this node from the list and update all the nodes
      // it pointed to. Meaning that they have one less prerequisite
      // and then if they now have 0 prereqs, add it to the queue
      for(let i=0; i<adjList[nodeIndex].length; i++) {
          const neighbourId = adjList[nodeIndex][i];
          
          indegs[neighbourId]--;
          
          if (indegs[neighbourId] === 0) {
              zeroIndegree.push(neighbourId);
          }
      }
  }
  
  // Only return the topological sort if the number of nodes 
  // in the sorted array is equal to the number of courses
  // otherwise that means there was some amount of nodes
  // without an indegree of 0 by the end of it (cyclic graph)
  
  // This commented line below solves Course Schedule II
  // return (sorted.length === numCourses) ? sorted : [];
  
  return sorted.length === numCourses;
};

// Returns an array whos ith index contains the indegree
// for the ith class
function indegrees(adj) {
  let indegs = new Array(adj.length).fill(0);
  
  for(let i=0; i<adj.length; i++) {
      const curList = adj[i];
      
      for(let j=0; j<curList.length; j++) {
          indegs[curList[j]]++;
      }
  }
  
  return indegs;
}









/* v.4 */ 

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

 const canFinish = (numCourses, prerequisites) => {
  const graph = Array(numCourses).fill(null);
  const inDegrees = Array(numCourses).fill(0);

  for(const [outEdge, inEdge] of prerequisites) {
      if(!graph[outEdge]) {
          const arr = [];
          arr.push(inEdge);
          graph[outEdge] = arr;
      }else {
          graph[outEdge].push(inEdge);
      }    
      inDegrees[inEdge]++;
  }
  
  const queue = [];
  const order = [];
  for(let i = 0; i< numCourses; i++) {
      if(inDegrees[i] === 0) {
          queue.push(i);   // enqueue these node without any dependencies, inDegrees are zero
      }
  }
      
  while(queue.length > 0) {
      const node = queue.shift();        
      const children = graph[node];
      if(children) {
          for(const child of children) {
              inDegrees[child]--;
              if(inDegrees[child] === 0) {
                  queue.push(child);
              }
          }
      }
      order.push(node);
  }
 
  // if there is cycles in the graph the oder number will not be the original numCourses
  // the length of order will be less than numCourses because inDegrees of the nodes in the cycles will not be zero
  return order.length === numCourses;
  
  // Time complexity O(V*(V+E)) V is numCourses, E is number of prerequisites
  // Space comlexity if O(V + E)
};




/*
Topological Sorting (Kahn's Algorithm)

1. Fill an array inDegree[], where inDegree[i] is the number of incoming edges to node i;
i represents a course and incoming edges represent the pre-requisites.
2. Fill an adjacency list.
3. Use queue to traverse nodes in topological order.
    - start with nodes that have 0 in-degree as it means they have no dependency
    - when visiting a node, delete outgoing edges from the node; if this causes other nodes
    to have 0 in-degree, push those nodes into queue
    - repeat this until queue is empty
4. if the total number of visited nodes in topological order is equal to n, return true;
otherwise, return false. This is because, if there is no cycle in the graph, we should be able to
traverse all nodes in topological order.
*/
var canFinish = function(numCourses, prerequisites) {
  // Fill an adjacency list and inDegree array
  let adjList = new Array(numCourses).fill(0).map(() => []);
  let inDegree = new Array(numCourses).fill(0);
  for (let [course, preCourse] of prerequisites) {
      inDegree[course]++;
      adjList[preCourse].push(course);
  }
  // find nodes with 0 in-degree and push them to queue
  let queue = [];
  for (let i = 0; i < inDegree.length; i++) {
      if (inDegree[i] === 0) {
          queue.push(i);
      }
  }
  // traverse nodes in topological order until queue is empty
  // and count the number of nodes traversed
  let count = 0;
  while (queue.length > 0) {
      let node = queue.shift();
      count++;
      for (let v of adjList[node]) {
          inDegree[v] -= 1;
          if (inDegree[v] === 0) {
              queue.push(v);
          }
      }
  }
  return count == numCourses;
  // T.C: O(V+E), we visit every node and every neighbour of the node
  // S.C: O(V+E), for adjacency list
};