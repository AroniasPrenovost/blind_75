/* 

  Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

  Example 1:

    Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
    Output: 1
    Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
  
  Example 2:

    Input: intervals = [[1,2],[1,2],[1,2]]
    Output: 2
    Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
  
  Example 3:

    Input: intervals = [[1,2],[2,3]]
    Output: 0
    Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
  

  Constraints:

  1 <= intervals.length <= 2 * 104
  intervals[i].length == 2
  -2 * 104 <= starti < endi <= 2 * 104

*/ 




/* 

  approach #1 - 2 pointer / sliding window 


    The idea is to sort the intervals by their start times and then traverse the array from behind. 
    If the end time at interval[i-1] is greater than the start time at interval[i] we have found overlap. 
    So we move to check interval[i] with interval[i-2] endtime and so on till we get to an interval j where the there is no overlap. 
    Then we let i = j.

    Reasoning
      We traverse from the right of the list becuase whenever we meet an interval at j which doesn't overlap with our current interval i, 
      there can be no more overlaping intervals beyond j and the overlaps between i and j is minimum.

*/

var eraseOverlapIntervals = function(intervals) {
  intervals.sort((a,b) => a[0]-b[0])
  let n = intervals.length
  let res = 0
  let i = n-1
  while(i>0){
      let j = i-1
      while(j>=0 && intervals[j][1] > intervals[i][0]){
          res++
          j--
      }
      i = j
  }
  return res
}












/* 

  approach #2 - Using DP based on starting point  


*/ 











/* 

  approach #3 - Using DP based on ending point  


*/ 











/* 

  approach #4 - greedy approach based on starting point 

    if two intervals are overlapping, we want to remove the interval that has the longer end point -- 
    the longer interval will always overlap with more or the same number of future intervals compared to the shorter one

    Total time complexity = O(NlogN)
    Total space complexity = O(N)

*/ 



var eraseOverlapIntervals = function(intervals) {

	// Sort jobs according to finish time
    intervals.sort((a,b)=>a[1]-b[1]);
    let i=0;
	
	 // The first activity always gets selected
    let OverlappingArr= [intervals[0]];
    for(let j=1; j<intervals.length; j++){
		    // If this activity has start time greater than or equal to the finish time of previously selected activity, then select it 
        if(intervals[j][0]>=intervals[i][1]){
            OverlappingArr.push(intervals[j]);
            i=j;
        }
    }

	// Return the difference between the original length and overlappingArray length
    return intervals.length-OverlappingArr.length;
};


/* v.2 

  Time Complexity: O(N LogN);
  Space Complexity: O(1);

*/ 


var eraseOverlapIntervals = function(intervals) {
	// sort by earliest finish time
    intervals.sort((a, b) => a[1] - b[1]);
    let prev = intervals[0], remove = 0;
    
    for(let i = 1; i < intervals.length; i++) {
        if(intervals[i][0] < prev[1]) remove++;
        else prev = intervals[i];
    }
    return remove;
};





var eraseOverlapIntervals = function(intervals) {
    
   if (!Array.isArray(intervals) || intervals.length < 2) return 0;
   intervals.sort((n1, n2) => {
       return n1[1] - n2[1];
   });
   
   let count = 0, prev = 0;
   
   for (let i = 1; i < intervals.length; i++) {
       if (intervals[i][0] < intervals[prev][1]) {
           ++count;
       } else {
           prev = i;
       }
   }

   return count;
}