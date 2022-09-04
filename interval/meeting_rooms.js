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

    two for loops and check if there any overlap;

    definition of overlap
    if end of one element is greater than the start of other element,
    provided, start time of the first element was before start time of the other element.

    O(n2) Time
    O(1) Space

*/


function meeting_rooms_brute_force(intervals) {
  function overlap(ele1, ele2) {
    return (
      (ele1[0] >= ele2[0] && ele1[0] < ele2[1]) ||
      (ele2[0] >= ele1[0] && ele2[0] < ele1[1])
    );
  }

  let len = intervals.length;

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (overlap(intervals[i], intervals[j])) {
        return false;
      }
    }
  }
  return true;
}

console.log(canAttendMeetings([[0,30],[5,10],[15,20]])); // false
console.log(canAttendMeetings([[7, 10],[2, 4]])); // true

/* 

  approach #2 - sorting 
  
  The idea here is to sort the meetings by starting time. 
  Then, go through the meetings one by one and make sure that each meeting ends before the next one starts.

  sorting metting will take overall time complexity of o(nlogn)
  - but, then you can iterate in o(n)

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

console.log(canAttendMeetings([[0,30],[5,10],[15,20]])); // false
console.log(canAttendMeetings([[7, 10],[2, 4]])); // true



/* v.3 */ 


var canAttendMeetings = function(intervals) {
  intervals.sort(function(a,b){ return a[0] - b[0]});
  
  for(let i = 1; i < intervals.length; i++){
      
      if(intervals[i][0] < intervals[i-1][1]){
          return false;
      }
  }
      
  return true;
};

console.log(canAttendMeetings([[0,30],[5,10],[15,20]])); // false
console.log(canAttendMeetings([[7, 10],[2, 4]])); // true









/* v.3 */ 

var canAttendMeetings = function(intervals) {
  if (intervals.length <= 1) return true;

  intervals.sort((a, b) => a[0] - b[0])
  for (let i = 0; i < intervals.length - 1; i ++) {
      if (intervals[i][1] > intervals[i + 1][0]) {
          return false;
      }
  }
  return true;
};

console.log(canAttendMeetings([[0,30],[5,10],[15,20]])); // false
console.log(canAttendMeetings([[7, 10],[2, 4]])); // true


