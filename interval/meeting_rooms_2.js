/* 

  Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.

  Example 1:

    Input: intervals = [[0,30],[5,10],[15,20]]
    Output: 2
  
  
  
  Example 2:

    Input: intervals = [[7,10],[2,4]]
    Output: 1
  

  Constraints:

  1 <= intervals.length <= 104
  0 <= starti < endi <= 106

*/





/* 

  approach #1 - Priority Queue ( heap )
  
  https://osgoodgunawan.medium.com/meeting-room-ii-in-javascript-d478690dd432

  The most definitive answer should be the Priority Queue(heap) topic. 
  However, Javascript does not come with a built-in Priority Queue, not like Java, Python, or C++. 
  That’s ok because there are multiple ways of solving this problem.

    Time complexity should be O(N log N). We are sorting the two arrays (start and end) individually. Each of them contains N elements considering there are N intervals.
    Space complexity should be O(N) due to creating two individual arrays of size N, one for keeping track of start times and one for the end times.
    
  There you go, folks, that’s how you solve meeting room II without Priority Queue(heap) in javascript.

*/ 

var minMeetingRooms = function(intervals) {

  // sort the intervals by start time 
  let start = intervals.sort((a, b) => a[0] - b[0]);

  // create a copy array and sort the intervals by the end time 
  let end = [...intervals].sort((a, b) => a[1] - b[1]);
  
  // keep track of how many rooms are needed 
  let rooms = 0
  
  // two pointers incoming 
  let j = 0; 
  
  for (let i = 0; i < intervals.length; i++) {

      // whenever there is a start meeting, we need to add 1 room.
      // before we add the room, we check to see if any previous meeding has ended. 
      // this is why we check start the first end 
      if (start[i][0] < end[j][1]) {
          rooms++; 
      } else {
          // when the start > end, it means at this time one of the previous meetings has ended, and it can take and reuse that room. 
          // then, the next meeting needs to compare to the 2nd end because the 1st end's room is already taken 
          j++;
      }
  }
  
  return rooms; 
};





/* v.3 */ 





/* 

  approach #2 - chronological ordering ( sort intervals by start time )

  T.C: O(Nlog(N))
  S.C: O(N)  

*/ 


var minMeetingRooms = function(intervals) {
  let starts = intervals.map(interval => interval[0]);
  let ends = intervals.map(interval => interval[1]);
  starts.sort((a,b) => a-b);
  ends.sort((a,b) => a-b);

  let count = 0, j = 0;
  
  for (let i = 0; i < starts.length; i++) {
    count++;
    // a meeting ended and its room became available
    if (starts[i] >= ends[j]) {
      count--;
      j++
    }
  }

  return count;
  // T.C: O(Nlog(N))
  // S.C: O(N)
};



/* v.2 */ 

var minMeetingRooms = function (intervals) {
  // Sort intervals by start time
  intervals.sort((i1, i2) => i1[0] - i2[0]);

  let max = 0;
  let conferences = [];

  // loop through each interval and assign conference rooms similar to what you would do in real world situation
  intervals.forEach((interval) => {
    // Empty the conference rooms for which end time is already in past
    conferences = conferences.filter(
      (conference) => conference[1] > interval[0]
    );
    // Assign conference room for current meeting
    conferences.push(interval);

    // Maintain max conference rooms
    max = Math.max(max, conferences.length);
  });

  return max;
};



/* v.3 */ 

var minMeetingRooms = function(intervals) {
  const starts = intervals.map(x => x[0]);
  const ends = intervals.map(x => x[1]);
  
  starts.sort((a, b) => a - b);
  ends.sort((a, b) => a - b);
  
  let roomsNeeded = 0, e = 0;
  
  for(let s = 0; s < starts.length; s++) {
    if(starts[s] >= ends[e]) {
        roomsNeeded--;
        e++;
    }
    roomsNeeded++;
  }
  return roomsNeeded
};


/* 

  This solution is not optimal but passes all test cases, simple and easy to understand. Not a terrible idea if there is areal scenario with times in hours or even minutes.

  A hash called schedule is initialized to store the frequency of request on each possible time. I.e for a ranges [[7,10], [8,9]] values of schedule[7]=1, schedule[8]=2, schedule[9]=2, schedule[10]=1. Keep track of the max and return.

*/ 

function minMeetingRooms(intervals) {

    let schedule = {};
    let max = 0;

    for (let i = 0; i < intervals.length; i++) {
        let start = intervals[i][0];
        let end = intervals[i][1];

        for (let j = start; j < end; j++) {
            if (schedule[j] == undefined){
                schedule[j] = 1;
            }
            else{
                schedule[j]++;
            }

            max = Math.max(max, schedule[j]);
        }
    }

    return max;
    
}

/* v.4 */ 

var minMeetingRooms = function(intervals) {
    
  if (intervals.length === 0) {
      return 0;
  }
  
  intervals.sort((a,b) => {
      return a[0] - b[0];
  });
  
  var minEnd = []; minEnd.push(intervals[0][1]);
  var rooms = 1;
  
  for (let i=1; i<intervals.length; i++) {
      
      if (intervals[i][0] < Math.min(...minEnd)) {
          rooms++;    
          minEnd.push(intervals[i][1]);
      } else {
          let idx = minEnd.indexOf(Math.min(...minEnd));
          minEnd[idx] = (intervals[i][1]);
      }
      
  }
  
  return rooms;
  
};

/* v.5 */ 

 
var minMeetingRooms = function(intervals) {
  let ans = 0;
  const n = intervals.length;
  
  // queue of meetings in progress
  let m = [];
  
  // sort by start time
  intervals = intervals.sort(([a],[b]) => a - b);
  
  for(let i = 0; i < n; i++) {
      const next = intervals[i];
      // look for meetings which have ended and shift from queue
      while(m.length && m[0] <= next[0]) m.shift();
      m.push(next[1]);
      // sort queue by end time
      m = m.sort((a,b) => a - b);
      // if current meeting in progress is higher than max, update max
      ans = Math.max(ans, m.length);
  }
  
  return ans;
};
