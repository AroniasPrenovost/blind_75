/* 

  Given the head of a singly linked list, reverse the list, and return the reversed list.
 

  Example 1:

    Input: head = [1,2,3,4,5]
    Output: [5,4,3,2,1]
  
  
  
  Example 2:

    Input: head = [1,2]
    Output: [2,1]
  



  Example 3:

    Input: head = []
    Output: []
  

  Constraints:

  The number of nodes in the list is the range [0, 5000].
  -5000 <= Node.val <= 5000
  
  Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?

*/ 




/* 

  approach #1 - iterative 

*/ 

var reverseList = function(head) {
  let cur = head;
  let prev = null;

  while(cur){
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return prev;
};

/* v.2 */

var reverseList = function(head) {
  let prev = null;
  let next = null;

  while(head) {
    next = head.next;
    head.next = prev;
   
    prev = head;
    head = next;
  }

  return prev;
};

/* v.3 */ 

var reverseList = function(head) {
  if (head === null) return null;
  let previous = null
  let next = null;
  
  while (head) {
    next = head.next
    head.next = previous;
    previous = head;
    head = next;
  }

  return previous;   
};


/* 

  approach #2 - recursive 

*/ 


var reverseList = function(head, prev = null) {
  if(!head) return prev;
  let next = head.next;
  head.next = prev;
  return reverseList(next, head);
};

/* v.2 */ 

var reverseList = function(head, previous = null) {
  if (head === null) return previous;
  let next = head.next;
  head.next = previous;
  return reverseList(next, head);
};