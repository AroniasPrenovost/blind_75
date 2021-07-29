// https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed

// sorting algorithms resource 
// https://itnext.io/sorting-algorithms-in-javascript-4c3b7b80e88d

/* 


  pattern #1 - Sliding Window

  The Sliding Window pattern is used to perform a required operation on a specific window size of a given array or linked list, 
  such as finding the longest subarray containing all 1s. Sliding Windows start from the 1st element and keep shifting right by 
  one element and adjust the length of the window according to the problem that you are solving. 
  In some cases, the window size remains constant and in other cases the sizes grows or shrinks.

  * useful in tracking a subset of data in an array or string and great at reducing time complexity.

  - Maximum sum subarray of size ‘K’ (easy)
  - Longest substring with ‘K’ distinct characters (medium)
  - String anagrams (hard)


*/ 


// returns the maximum sum of a subarray of size num
function maxSumArr(arr, num) {
  
  let maxSum = 0; // maximum sum compared to the temporary sum
  let tempSum = 0; // tracking sums of the consequent subset

  if (arr.length < num) {
    return null;
  }

  // looping through an array from index 0 to the size of num, and add every element to the tempSum
  for(let i = 0; i < num; i++) {
     tempSum += arr[i];
  }

  // Set the tempSum to the maxSum variable, and loop through the array again starting from the num to get a new tempSum.  
  tempSum = maxSum;
  
  for(let i = num; i < arr.length; i++) {

    // The new tempSum is achieved by sliding window of the array so we can subtract the previous element of the new subset and add the new element
    tempSum = tempSum - arr[i - num] + arr[i];

    // compare between maxSum and tempSum and set bigger sum as maxSum 
    maxSum = Math.max(tempSum, maxSum);
  }     

  return maxSum;
}

maxSumArr([2, 6, 9, 2, 1, 8, 5, 6, 3], 3); // 2








/* 


  pattern #2 - Two Pointers or Iterators


  Two pointers is an easy and effective technique typically used for searching pairs in a sorted array.
  
  Given a sorted array A (sorted in ascending order), having N integers, find if there exists any pair of elements (A[i], A[j]) such that their sum is equal to X.

  can be O(n) - we only perform one iteration at a time and sort the elements in place  

*/ 

 

// Two pointer technique based solution to find
// if there is a pair in A[0..N-1] with a given sum.
function isPairSum(A, N, X) {
 
    // represents first pointer
    var i = 0;
 
    // represents second pointer
    var j = N - 1;
 
    while (i < j) {
 
        // If we find a pair
        if (A[i] + A[j] == X)
            return true;
 
        // If sum of elements at current
        // pointers is less, we move towards
        // higher values by doing i++
        else if (A[i] + A[j] < X)
            i++;
 
        // If sum of elements at current
        // pointers is more, we move towards
        // lower values by doing j--
        else
            j--;
    }
    return false;
}
 
// Driver code
 
    // array declaration
    var arr = [ 3, 5, 9, 2, 8, 10, 11 ];
     
    // value to search
    var val = 17;
     
    // size of the array
    var arrSize = 7;
     
    // Function call
    document.write(isPairSum(arr, arrSize, val));
     
    // This Code is Contributed by Harshit Srivastava
 










/* 


  pattern #3 - Fast and Slow pointers - 'Floyd's Cycle Detection Algorithm' 

  The algorithm is to start two pointers, slow and fast from head of linked list. 
  We move slow one node at a time and fast two nodes at a time. 
  If there is a loop, then they will definitely meet. This approach works because of the following facts:

    1) When slow pointer enters the loop, the fast pointer must be inside the loop. Let fast pointer be distance k from slow.

    2) Now if consider movements of slow and fast pointers, we can notice that distance between them (from slow to fast) increase by one after every iteration. After one iteration (of slow = next of slow and fast = next of next of fast), distance between slow and fast becomes k+1, after two iterations, k+2, and so on. When distance becomes n, they meet because they are moving in a cycle of length n.


    
    1. Detect Loop using Floyd’s Cycle detection algorithm and get the pointer to a loop node.
    2. Count the number of nodes in loop. Let the count be k.
    3. Fix one pointer to the head and another to a kth node from the head.
    4. Move both pointers at the same pace, they will meet at loop starting node.
    5. Get a pointer to the last node of the loop and make next of it as NULL.


      https://codeburst.io/fast-and-slow-pointer-floyds-cycle-detection-algorithm-9c7a8693f491

      * Imagine two runners on a track. They run at different speeds but they start at the same location. 
      If the track is not cyclic in any way, then the slow runner will never meet the fast runner, as they 
      will always be ahead of them. However, if the track is cyclic, the fast runner will eventually “lap” 
      the slow runner, or catch up to him and pass him/her.



      * happy number, linked list cycle, middle of linked list, Find the Duplicate Number, Remove Nth Node From End of List, Linked List Cycle II  

*/ 


// 'Linked List Cycle' Leetcode question 
// We can use the fast and slow pointers as discussed above. 
// If there is a loop, they will, at some point, meet each other and we can return true. 
// However, if the fast pointer reaches an end before joining up with the slow pointer, 
// we know there was no cycle and we return false. 

// space: O(1) We only additionally store two nodes of the linked list to determine where the fast or slow pointer is.
// time: 

function hasCycle(head) {
  let fast = head
  let slow = head
  while (fast && fast.next) {
      fast = fast.next.next
      slow = slow.next
      if (fast == slow) return true
  }
  return false
}






// 'Middle of Linked List ' Leetcode question 
// Given a non-empty, singly linked list, return a middle node of the linked list. 
// If there are two middle nodes, return the second middle node.
// We can take advantage of two pointers moving at different rates here. 
// If we set the fast pointer to be twice as fast as the slow one, 
// then when the fast pointer reaches the end of the linked list, 
// the slow pointer will have only made it half the distance. 
// Which means it will be at the middle node! Take a look at the image below:

function middleNode(head) {
  let fast = head
  let slow = head
  while (fast && fast.next) {
      fast = fast.next.next
      slow = slow.next
  }
  return slow
}





/* more - (Optimized Method 2: Without Counting Nodes in Loop) */ 







// Javascript program to detect and
// remove loop in linked list
var head;
 
class Node
{
    constructor(val)
    {
        this.data = val;
        this.next = null;
    }
}
 
// Function that detects loop in the list
function detectAndRemoveLoop(node)
{
    var slow = node, fast = node;
    while (slow != null &&
           fast != null &&
           fast.next != null)
    {
        slow = slow.next;
        fast = fast.next.next;
 
        // If slow and fast meet at same
        // povar then loop is present
        if (slow == fast)
        {
            removeLoop(slow, node);
            return 1;
        }
    }
    return 0;
}
 
// Function to remove loop
function removeLoop(loop, head)
{
    var ptr1 = loop;
    var ptr2 = loop;
 
    // Count the number of nodes in loop
    var k = 1, i;
     
    while (ptr1.next != ptr2)
    {
        ptr1 = ptr1.next;
        k++;
    }
 
    // Fix one pointer to head
    ptr1 = head;
 
    // And the other pointer to
    // k nodes after head
    ptr2 = head;
    for(i = 0; i < k; i++)
    {
        ptr2 = ptr2.next;
    }
 
    /*  Move both pointers at the same pace,
     they will meet at loop starting node */
    while (ptr2 != ptr1)
    {
        ptr1 = ptr1.next;
        ptr2 = ptr2.next;
    }
 
    // Get pointer to the last node
    while (ptr2.next != ptr1)
    {
        ptr2 = ptr2.next;
    }
 
    /* Set the next node of the loop ending node
     to fix the loop */
    ptr2.next = null;
}
 
// Function to prvar the linked list
function printList(node)
{
    while (node != null)
    {
        document.write(node.data + " ");
        node = node.next;
    }
}
 
// Driver code
head = new Node(50);
head.next = new Node(20);
head.next.next = new Node(15);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(10);
 
// Creating a loop for testing
head.next.next.next.next.next = head.next.next;
detectAndRemoveLoop(head);

// linked list after removing loop 
printList(head);
 
// This code is contributed by todaysgaurav
 




























/* 


  pattern #4 - Merge Intervals

  sort the intervals in advance
  after that, we can go through the sorted array and try to merge somehow these intervals. 
  The key thing here is to come up with how we can merge the intervals.

  
  We need to check if the current interval begins after the previous interval ends. 
  we can check it because we’ve sorted the intervals.

  time complexity is O(nlogn) because of the sort
  space complexity is O(n) because we use result to store merged intervals.

*/ 


// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].


const merge = intervals => {
  if (intervals.length < 2) return intervals;
  
  intervals.sort((a, b) => a[0] - b[0]);
  
  const result = [];
  let previous = intervals[0];
  
  for (let i = 1; i < intervals.length; i += 1) {
    if (previous[1] >= intervals[i][0]) {
      previous = [previous[0], Math.max(previous[1], intervals[i][1])];
    } else {
      result.push(previous);
      previous = intervals[i];
    }
  }
  
  result.push(previous);
  
  return result;
};

console.log(merge([[1,3],[2,6],[8,10],[15,18]])); 





























/* 


  pattern #5 - Cyclic Sort / Cycle Sort 

  Cycle sort is an in-place sorting Algorithm, unstable sorting algorithm, a comparison sort that is theoretically optimal in terms of the total number of writes to the original array. 
 
  * in-place sorting algorithm means that no external data structure (such as a list or heap) is required to perform the cycle sort operation.

  * an 'unstable' sorting algorithm means that for any items that rank the same, the order of the tied members is not guaranteed to stay the same with successive sorts of that collection. 
    in a 'stable' sort, the tied entries will always end up in the same order when sorted

  It is optimal in terms of number of memory writes. It minimizes the number of memory writes to sort (Each value is either written zero times, if it’s already in its correct position, or written one time to its correct position.)
  It is based on the idea that array to be sorted can be divided into cycles. Cycles can be visualized as a graph. We have n nodes and an edge directed from node i to node j if the element at i-th index must be present at j-th index in the sorted array. 
  Cycle in arr[] = {2, 4, 5, 1, 3} 

*/  






function cycleSort(array) {
  
  // loop from the beginning of the array to the second to last item
  for (let currentIndex = 0; currentIndex < array.length - 1; currentIndex++) {
    
    // save the value of the item at the currentIndex
    let item = array[currentIndex]

    // make a copy of current index item 
    let currentIndexCopy = currentIndex

    // loop through all indexes that proceed the currentIndex
    for (let i = currentIndex + 1; i < array.length; i++){
      if (array[i] < item){
        currentIndexCopy++
      }
    }

    // if currentIndexCopy has not changed, the item at the currentIndex is already in the correct currentIndexCopy
    if (currentIndexCopy == currentIndex) {
      continue; 
    }

    // skip duplicates
    while (item == array[currentIndexCopy]) {
      currentIndexCopy++      
    }

    // swap
    let temp = array[currentIndexCopy]
    array[currentIndexCopy] = item
    item = temp

    // repeat above steps as long as we can find values to swap
    while (currentIndexCopy != currentIndex) {
      currentIndexCopy = currentIndex
      // loop through all indexes that proceed the currentIndex
      for (let i = currentIndex + 1; i < array.length; i++) {
        if (array[i] < item) {
          currentIndexCopy++
        }
      }

      // skip duplicates
      while (item == array[currentIndexCopy]) {
        currentIndexCopy++
      }

      // swap
      temp = array[currentIndexCopy]
      array[currentIndexCopy] = item
      item = temp
    }
  }
}

let array = [12, 11, 15, 10, 9, 1, 2, 3, 13, 14, 4, 5, 6, 7, 8]
cycleSort(array) // [1, 2, 3, 4, 5, 6, 7, etc...]



/* v.2 */ 

    // Function sort the array using Cycle sort
    function cycleSort(arr, n)
    {
     
        // count number of memory writes
        let writes = 0;
   
        // traverse array elements and put it to on
        // the right place
        for (let cycle_start = 0; cycle_start <= n - 2; cycle_start++)
        {
         
            // initialize item as starting point
            let item = arr[cycle_start];
   
            // Find position where we put the item. We basically
            // count all smaller elements on right side of item.
            let pos = cycle_start;
            for (let i = cycle_start + 1; i < n; i++)
                if (arr[i] < item)
                    pos++;
   
            // If item is already in correct position
            if (pos == cycle_start)
                continue;
   
            // ignore all duplicate elements
            while (item == arr[pos])
                pos += 1;
   
            // put the item to it's right position
            if (pos != cycle_start)
            {
                let temp = item;
                item = arr[pos];
                arr[pos] = temp;
                writes++;
            }
   
            // Rotate rest of the cycle
            while (pos != cycle_start)
            {
                pos = cycle_start;
   
                // Find position where we put the element
                for (let i = cycle_start + 1; i < n; i++)
                    if (arr[i] < item)
                        pos += 1;
   
                // ignore all duplicate elements
                while (item == arr[pos])
                    pos += 1;
   
                // put the item to it's right position
                if (item != arr[pos]) {
                    let temp = item;
                    item = arr[pos];
                    arr[pos] = temp;
                    writes++;
                }
            }
        }
    }
      
// Driver code   
 
    let arr = [ 1, 8, 3, 9, 10, 10, 2, 4 ];
       let n = arr.length;
       cycleSort(arr, n);
  
      document.write("After sort : " + "<br/>");
       for (let i = 0; i < n; i++)
           document.write(arr[i] + " ");

































/* 


  pattern #6 - In-place Reversal of linked List


*/ 

/* 


  pattern #7 - Queue BFS


*/ 

/* 


  pattern #8 - Tree BFS


*/ 

/* 


  pattern #9 - Two Heaps 


*/ 

/* 


  pattern #10 - Subsets


*/ 

/* 


  pattern #11 - Modified Binary Search 


*/ 

/* 


  pattern #12 - Top K Elements


*/ 

/* 


  pattern #13 - K-way Merge


*/ 

/* 


  pattern #14 - Topological Sort


*/  