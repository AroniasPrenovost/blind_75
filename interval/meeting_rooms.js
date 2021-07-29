/* 

  Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.

  Example 1:

    Input: intervals = [[0,30],[5,10],[15,20]]
    Output: false


  Example 2:

    Input: intervals = [[7,10],[2,4]]
    Output: true
  
  Constraints:

  0 <= intervals.length <= 104
  intervals[i].length == 2
  0 <= starti < endi <= 106

*/ 

/* 
  
  approach #1 - brute force 

  The straight-forward solution is to compare every two meetings in the array, and see if they conflict with each other (i.e. if they overlap). 
  Two meetings overlap if one of them starts while the other is still taking place.

*/





/* 

  approach #2 - sorting 
  
  The idea here is to sort the meetings by starting time. 
  Then, go through the meetings one by one and make sure that each meeting ends before the next one starts.

*/ 

var canAttendMeetings = function(intervals) {
  
  intervals.sort(function(a,b) { 
    return a[0] - b[0]
  });

  for(let i = 1; i < intervals.length; i++){
    if(intervals[i][0] < intervals[i-1][1]){
      return false;
    }
  }
     
  return true;
};






/* v.2 */ 

var canAttendMeetings = function(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  
  for(let i = 1; i < intervals.length; i++){
    if(intervals[i][0] < intervals[i-1][1]){
      return false
    }
  }
  return true
};






/* v.3 */ 

var canAttendMeetings = function(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  
  for(let i = 0; i < intervals.length-1; i++) {
      const [s1, e1] = intervals[i];
      const [s2, e2] = intervals[i+1];
      if(s2 < e1) return false;
  }
  return true;
};