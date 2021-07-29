/* 

  There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.

  You are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language.

  Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return "". If there are multiple solutions, return any of them.

  A string s is lexicographically smaller than a string t if at the first letter where they differ, the letter in s comes before the letter in t in the alien language. If the first min(s.length, t.length) letters are the same, then s is smaller if and only if s.length < t.length.


  Example 1:

      Input: words = ["wrt","wrf","er","ett","rftt"]
      Output: "wertf"



  Example 2:

      Input: words = ["z","x"]
      Output: "zx"
  
  
  Example 3:

      Input: words = ["z","x","z"]
      Output: ""
      Explanation: The order is invalid, so return "".
  

  Constraints:

    1 <= words.length <= 100
    1 <= words[i].length <= 100
    words[i] consists of only lowercase English letters.

*/ 




/* 

  approach #1 - Breadth-First Search (BFS)

  topological sort (note that topological sort can be either DFS or BFS)

*/ 

let alienOrder = (words) => {
  let graph = {},
    incoming = {};

  // initialize empty graph
  for (let word of words) {
    for (let char of word) {
      graph[char] = new Set();
      incoming[char] = 0;
    }
  }

  // build graph
  for (let i = 1, len = words.length; i < len; i++) {
    let first = words[i - 1];
    let second = words[i];
    let min = Math.min(first.length, second.length);
    let allSame = true;
    for (let j = 0; j < min; j++) {
      let x = first[j];
      let y = second[j];
      if (x !== y) {
        allSame = false;
        if (!graph[x].has(y)) {
          graph[x].add(y);
          incoming[y]++;
        }
        break;
      }
    }
    // fast path => first word smaller with all characters same
    if (allSame && first.length > second.length) return '';
  }

  // BFS with 0 incoming first
  let str = '',
    queue = [];
  for (let char in incoming) {
    if (incoming[char] === 0) queue.push(char);
  }

  while (queue.length) {
    const char = queue.shift();
    str += char;
    for (let next of graph[char]) {
      incoming[next]--;
      if (incoming[next] === 0) {
        queue.push(next);
      }
    }
  }

  return str.length === Object.keys(graph).length ? str : '';
};
/* 


  approach #2 - Depth-First Search (DFS)


*/ 


/* 

  approach #3 - kahn's algorithm 

    This solution uses Kahn's algorithm, 
    even though it's long, it's clear and the logic is separated across smaller functions, 
    you can aslo check the same problem on geeksforgeeks for more explanation.

*/
 
/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function(words) {
    const adjList = buildGraph(words);
    const indegrees = buildIndegrees(words, adjList);
    
    const queue = [];
    const ordering = []; // Final result of the topological ordering.
    
    // Pick all the vertices with in-degree as 0 and add them to the queue.
    for (const [v, degree] of indegrees) {
        if (degree === 0) queue.push(v);
    }
    
    while (queue.length) {
        const v = queue.shift();
        
        // Decrement the in-degree of all adjacents vertices of v,
        // and add them to the queue if their indegree is 0.
        if (adjList.has(v)) {
            for (const n of adjList.get(v)) {
                indegrees.set(n, indegrees.get(n) - 1);
                if (indegrees.get(n) === 0) queue.push(n);
            }    
        }
        
        ordering.push(v);
    }
    
    if (ordering.length !== indegrees.size) {
        // Graph contains a cylce, topological sort is not possible.
        return "";
    }
    
    return ordering.join("");
};

function buildIndegrees(words, adjList) {
    const indegrees = new Map();
    
    // Add all initial 0 in-degree of all letters in each word.
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words[i].length; j++) {
            indegrees.set(words[i][j], 0);
        }
    }
    
    // Increment the in-degree of the target vertices.
    for (const v of adjList.keys()) {
        for (const neighbor of adjList.get(v)) {
            indegrees.set(neighbor, indegrees.get(neighbor) + 1);
        }
    }
    return indegrees;
}


// Let the current pair of words be w1 and w2.
// 1. One by one compare characters of both words and find the first mismatching characters.
// 2. Create an edge in adjList from mismatching character of w1 to that of w2.
function buildGraph(words) {
    let adjList = new Map();
    for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i];
        const w2 = words[i + 1];
        
        let j = 0;
        while (j < Math.min(w1.length, w2.length)) {
            if (w1[j] !== w2[j]) {
                if (!adjList.has(w1[j])) adjList.set(w1[j], new Set());
                adjList.get(w1[j]).add(w2[j]);
                break;
            }
            j++;
       }
    }
    return adjList;
}