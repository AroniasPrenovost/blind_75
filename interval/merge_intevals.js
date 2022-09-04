/* 

  Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

  Example 1:

    Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
    Output: [[1,6],[8,10],[15,18]]
    Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
  
  
  Example 2:

    Input: intervals = [[1,4],[4,5]]
    Output: [[1,5]]
    Explanation: Intervals [1,4] and [4,5] are considered overlapping.
  
  Constraints:

  1 <= intervals.length <= 104
  intervals[i].length == 2
  0 <= starti <= endi <= 104

*/ 



/* 

  approach #1 - connected components

    Intuition

      If we draw a graph (with intervals as nodes) that contains undirected edges between all pairs of intervals that overlap, 
      then all intervals in each connected component of the graph can be merged into a single interval.

*/ 



/* 

  approach #2 - sorting 

    Intuition

        If we sort the intervals by their start value, then each set of intervals that can be merged will appear as a contiguous "run" in the sorted list.
            *Note that modifying prev array also modifies the original res array due to JavaScript object copying properties.


*/ 


var merge = function(intervals) {
  intervals.sort((a, b) => a[0] - b[0]); 
  const res = [intervals[0]];
  
  for (let curr of intervals) {
    prev = res[res.length - 1]
    if (prev[1] >= curr[0]) {
      prev[1] = Math.max(curr[1], prev[1])
    } else {
      res.push(curr)
    }
  }

  return res;
};

console.log('output: ', merge([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]
console.log('output: ', merge([[1,4],[4,5]])); // [[1, 5]]



/* 


    a little easier to read? 
    

*/


function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let last = [null, -1];
  let result = [];
  
  for(const [start, end] of intervals) {
      if(start > last[1]) {
          last = [start, end];
          result.push(last);
      } else {
          last[1] = Math.max(last[1], end);
      }
  }
  
  return result;
};

console.log('output: ', merge([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]
console.log('output: ', merge([[1,4],[4,5]])); // [[1, 5]]

/* 

    Sort the intervals by the start index in ascending order. 
    We can tell if the current interval overlap with the previous one if the current start value > the previous end value. 
    Update the previous interval accordingly.

*/

var merge = function(intervals) {
  if(intervals.length < 2) return intervals; 
  intervals.sort((a,b) => a[0] - b[0]) //Arr have smaller element come first
  for (let i = 1; i < intervals.length; i += 1) {
      curr = intervals[i];
      prev = intervals[i-1];
      if(curr[0] <= prev[1]){
          intervals[i] = [Math.min(prev[0],curr[0]), Math.max(prev[1],curr[1])]
          intervals.splice(i-1,1);
          i -= 1;  // After merge, the arr become shorter
      }
  }
  return intervals
};

console.log('output: ', merge([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]
console.log('output: ', merge([[1,3],[2,6],[1,4],[4,5]])); // [[1, 5]]







/* */



const merge = (intervals) => {
  let res = [];
  for (let i of intervals.sort((a, b) => a[0] - b[0])) { // Sort the intervals
    if (i[0] <= res?.[res.length - 1]?.[1]) // We have an overlap (start of current is less than or equal to merged's end)
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], i[1]); // Update the end of our merged interval with current's end
    else res.push(i); // No overlap, push current interval
  }
  return res;
};

console.log('output: ', merge([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]
console.log('output: ', merge([[1,3],[2,6],[1,4],[4,5]])); // [[1, 5]]




var merge = function(intervals) {
  //sort based on start
  intervals = intervals.sort((a, b) => a[0]-b[0] );
  let mergedIntervals = [intervals[0]];
  let lastMergedInterval = intervals[0];
  for(let g=1; g<intervals.length; g++){
      if( lastMergedInterval[1] >= intervals[g][0] ){
          // yes we can merge here
          mergedIntervals.pop();
          let toBeMerged = [
              lastMergedInterval[0],
              Math.max(lastMergedInterval[1], intervals[g][1])
          ]
          mergedIntervals.push(toBeMerged);
          lastMergedInterval = toBeMerged;
      }
      else {
          mergedIntervals.push(intervals[g]);
          lastMergedInterval = intervals[g];
      }
  }
  return mergedIntervals
}

console.log('output: ', merge([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]
console.log('output: ', merge([[1,3],[2,6],[1,4],[4,5]])); // [[1, 5]]





var merge = function(intervals) {
    
  if(intervals.length === 1) return intervals;
  
  intervals = intervals.sort((a, b) => a[0] - b[0]);
  
  let nonOverlap = [intervals[0]];

// start at index [1] since we use the first interval as the first nonOverlap interval
  for(let i = 1; i < intervals.length; i++) {
      
  //if the current interval's 0 index value is less than the last valid nonOverlap interval
      if(intervals[i][0] <= nonOverlap[nonOverlap.length - 1][1]) {
          
    // if the last non overlap interval's [1] index value is less than the current overlap interval's  [1] index value, reassign to capture the upper bound overlap
          if(nonOverlap[nonOverlap.length - 1][1] < intervals[i][1]) {
              nonOverlap[nonOverlap.length - 1][1] = intervals[i][1];
          }
          
    //don't push to nonoverlap, just continue on to the next interval
          continue;
      }
              
      nonOverlap.push(intervals[i]);
  }
  
  return nonOverlap;
};








const merge = intervals => {
  intervals = intervals.sort((a, b) => a[0] - b[0])
  const values = []

  for (interval of intervals) {
    const last = values[values.length - 1]

    if (values.length === 0 || last[1] < interval[0]) {
      values.push(interval)
    } else {
      last[1] = Math.max(last[1], interval[1])
    }
  }

  return values
}






var merge = function(intervals) {
    
  let i = 0;
  intervals = intervals.sort((a,b)=> a[0] - b[0]);
  while(i < intervals.length-1) {
      const first = intervals[i];
      const second = intervals[i+1];
      if(second[0]<=first[1]) {
          first[1] = Math.max(first[1],second[1]);
          intervals.splice(i+1,1);
      } else i++;   
  }
  return intervals;
};


/* 
Sort the interval from small to large;
Compare one by one to see whether they are
no-overlapping
cover
partially overlapping
Replace with new interval and continue till the end;
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

var merge = function(intervals) {
    if (intervals.length < 2) return intervals;
    
    //Sort intervals first;
    intervals.sort((a, b) => a[0] === b [0] ? a[1] - b[1] : a[0] - b[0])

    for (var i = 1; i < intervals.length; i++) {      
        //no overlapping;          e.g.[1,3]，[4,5]
        if (intervals[i][0] > intervals[i - 1][1]) continue;
        
        //cover;                   e.g.[1,3]，[2,3]
        else if (intervals[i][1] <= intervals[i - 1][1]) intervals.splice(i--, 1);
        
        //partially overlapping;     e.g.[1,3]，[2,5]
        else {
            let replaceInterval = [intervals[i - 1][0], intervals[i][1]];
            intervals.splice(i-1, 2, replaceInterval);
            i--;
        }
    }
    return intervals;
};


/* 

  O(nlogn)

*/ 


var merge = function(intervals) {
    
  if (!intervals.length) {
      return [];
  }
  
  intervals.sort(function (a, b) {
     return a[0] - b[0] <= 0 ? -1 : 1;
  });
  
  var merge = [
      intervals[0]
  ];
  
  var index = 0;
  
  for (var i = 1; i < intervals.length; ++ i) {
      const previous = merge[index];
      const current = intervals[i];
      
      if (previous[1] >= current[0]) {
          merge[index][1] = Math.max(current[1], previous[1]);
      } else {
          merge.push(current);
          ++ index;
      }
  }
  
  return merge;
};




