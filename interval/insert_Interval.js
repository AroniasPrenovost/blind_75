/* 

  Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

  You may assume that the intervals were initially sorted according to their start times.

  

  Example 1:

  Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
  Output: [[1,5],[6,9]]
  Example 2:

  Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
  Output: [[1,2],[3,10],[12,16]]
  Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
  Example 3:

  Input: intervals = [], newInterval = [5,7]
  Output: [[5,7]]
  Example 4:

  Input: intervals = [[1,5]], newInterval = [2,3]
  Output: [[1,5]]
  Example 5:

  Input: intervals = [[1,5]], newInterval = [2,7]
  Output: [[1,7]]
  

  Constraints:

  0 <= intervals.length <= 104
  intervals[i].length == 2
  0 <= intervals[i][0] <= intervals[i][1] <= 105
  intervals is sorted by intervals[i][0] in ascending order.
  newInterval.length == 2
  0 <= newInterval[0] <= newInterval[1] <= 105

*/ 

/* 

  approach #1 - using a stack 

  O(n)
  
  Runtime: 96 ms, faster than 54.78% of JavaScript online submissions for Insert Interval.
  Memory Usage: 41.4 MB, less than 30.46% of JavaScript online submissions for Insert Interval.

*/ 

var insert = function(intervals, newInterval) {
  const result = [];

  // iterate over existing intervals 
  for (let i = 0; i < intervals.length; i++) {
    let interval = intervals[i];
    
    // If overlaps
    if (Math.max(interval[0], newInterval[0]) <= Math.min(interval[1], newInterval[1])) {
        newInterval = [Math.min(interval[0], newInterval[0]), Math.max(interval[1], newInterval[1])];
        continue;
    }
    
    // If lower
    if (interval[0] > newInterval[1]) {
        result.push(newInterval, ...intervals.slice(i));
        return result;
    }
    
    result.push(interval);
  }

  result.push(newInterval);
  return result;
};

/* 

  approach #2 - same as above

  Time & Space complexity: O(n)
 

*/ 


var insert = function(intervals, newInterval) {
  var len = intervals.length;
  var i = 0;
  var res = [];
  while (i < len && intervals[i].end < newInterval.start) {
    res.push(intervals[i]);
    i++;
  }
  while (i < len && intervals[i].start <= newInterval.end) {
    newInterval.start = Math.min(newInterval.start, intervals[i].start);
    newInterval.end = Math.max(newInterval.end, intervals[i].end);
    i++;
  }
  res.push(newInterval);
  while (i < len) {
    res.push(intervals[i]);
    i++;
  }
  return res;
};



/* v3 O(n) */ 

var insert = function(intervals, newInterval) {
  let results = [];

  let i = 0;
  while(i < intervals.length && intervals[i][1] < newInterval[0]) {
    results.push(intervals[i]);
    i++;
  }

  newInterval = [Math.min(newInterval[0], i < intervals.length ? intervals[i][0] : Infinity), newInterval[1]];    
                                      
  while(i < intervals.length && newInterval[1] >= intervals[i][0]) {
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }       
  
  results.push(newInterval);

  return results.concat(intervals.slice(i, intervals.length));
};



/* v.5 */

var insert = function(intervals, n) {
  let i, l;
  
  /** 
   * 
   * The other solutions all looked a little different and most didn't have comments, so here's mine.
     It has a touch of recursion in that after merging, it will revisit the insert function to eventually get to one of the non-merging returns.
     The whole thing will still run in O(n)
   * 
   * 
   * 
   * General idea is to first find where we fit in, merge the new interval with that interval and repeat
   *  There are 6 positions: 
   *  to left, to right, 
   *  to left with overlap, to right with overlap
   *  completely contained, completely containing
   *
   *  Each position needs a slightly different treatment, except the 2 overlap ones turn out to be the same logic
   *  The if statements to capture all 6 just need to carefully written down, considering what is an overlap and what isn't
   **/
  
 
  // Shortcut
  if (intervals.length === 0) {
      return [n];
  }
  
  // Find the first interval we interact with
  for (i = 0, l = intervals.length; i < l; i++) {
      let o = intervals[i];
           
      // all 6 posibilities:
      if (n[0] >= o[0] && o[1] >= n[1]) {
          
          // #1 new is inside, do nothing and done: it's already contained
          return intervals;
          
      } else if (n[0] > o[1]) {
          
          // #2 new is to right completely
          if (i === intervals.length - 1) {
              // insert at end if last one and done
              intervals.push(n);
              return intervals;
          } else {
              // else continue the loop, we can't assume it will fit here
              continue;
          }
          
      } else if (n[1] < o[0]) {
          
          // #3 new is to left completely, insert here and done
          intervals.splice(i, 0, n);
          return intervals;
          
      } else if (n[0] >= o[0] && n[1] >= o[1]) {
          
          // #4 new is to right but with an overlap: a merge needs to happen
          
          // remove old
          old = intervals.splice(i, 1)[0];
          
          // repeat with old and new merged, as the new interval could have further overlaps
          let merged = merge(old, n);

          return insert(intervals, merged);
          
      } else if (n[1] >= o[0] && n[1] <= o[1]) {

          // #5 new is to left but with an overlap: a merge needs to happen
                      
          // remove old
          old = intervals.splice(i, 1)[0];
          
          // repeat with old and new merged, as the new interval could have further overlaps
          let merged = merge(old, n);
        
          return insert(intervals, merged);
          
      } else if (n[0] < o[0] && n[1] > o[1]) {
          // #6 new envelopes this old interval
              
          // old needs to be removed
          old = intervals.splice(i, 1);
          
          // repeat with new    
          return insert(intervals, n);
                 
      } else {
          console.log('your code is broke');
      }  
      
  }

};

var merge = function(i1,i2) {
  // simple function to make a new range out of two
  let start = Math.min(i1[0], i2[0]);
  let end = Math.max(i1[1], i2[1]);
  
  return [start, end];
}