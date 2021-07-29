/* 

  Given head, the head of a linked list, determine if the linked list has a cycle in it.

  There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

  Return true if there is a cycle in the linked list. Otherwise, return false.

  

  Example 1:


  Input: head = [3,2,0,-4], pos = 1
  Output: true
  Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
  Example 2:


  Input: head = [1,2], pos = 0
  Output: true
  Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
  Example 3:


  Input: head = [1], pos = -1
  Output: false
  Explanation: There is no cycle in the linked list.
  

  Constraints:

  The number of the nodes in the list is in the range [0, 104].
  -105 <= Node.val <= 105
  pos is -1 or a valid index in the linked-list.
  

  Follow up: Can you solve it using O(1) (i.e. constant) memory?

*/ 

/* 

  approach #1 - hash table 

  Traverse through the linkedlist
  If node exist in the set it means that its in a loop
  if not insert the node into the set ! :>
  
  time: O(n)
  space: O(n)

*/ 

var hasCycle = function(head) {
  var s = new Set();
  while(head) {
      if (s.has(head)) return true;
      s.add(head);
      head = head.next;
  }
  return false;
};

/* v.2 */ 

var hasCycle = function(head) {
  let newSet = new Set();
  while(head) {  
      if(newSet.has(head)) return true;
      newSet.add(head);
      head = head.next;
  }
  return false;
};


/* v.3 */ 

var hasCycle = function(head) {
  const seen = new Set();
  
  function traverse(node) {
    if(seen.has(node)) return true;
    if(!node) return false;
    seen.add(node);
    return traverse(node.next);
  }

  return traverse(head);
};

/* v.4 */ 

var hasCycle = function(head) {
  let hash = {}
  
  let curr = head
  
  while(curr){
      if(hash[curr.val] !== undefined && curr === hash[curr.val]) return true
      else hash[curr.val] = curr
      
      curr = curr.next
  }
  return false
};




/* 

  approach #2 - Floyd's Circle Finding Algorithm  [ 2 pointers ]

  'tortoise & hare' 

  time: O(n)
  space: O(1)

*/ 

var hasCycle = function(head) {
  let fast = head;
  let slow = head
  
  while(fast && slow) {
    if (!fast || !fast.next) return false

    if (fast.next == slow) return true

    fast = fast.next.next
    slow = slow.next
  }

  return false
};


var hasCycle = function(head) {
  let slow = fast = head;
  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if(slow === fast) return true;
  }
  return false;
};

/* v3 */ 


var hasCycle = function(head) {
  let slow = head;
  let fast = head;
  
  while(fast != null && fast.next != null){
      fast = fast.next.next;
      slow = slow.next;
      
      if(fast == slow){
          return true
      }
  }
  
  return false;
};



/* v.4 */ 


var hasCycle = function(head) {
  let currA = head
  let currB = head
  
  while(currB){
    currA = currA.next
    if(currB.next == null || currB.next.next == null) return false
    currB = currB.next.next
    if(currA == currB) return true
  }
  
  return false
};


/* v.5 */ 


var hasCycle = function(head) {

  if(head == null || head.next == null) return false

  let ptr1 = head
  let ptr2 = head.next
 
  while(ptr1 !== ptr2){
      if(ptr2 == null || ptr2.next == null) return false
     
      ptr1 = ptr1.next
      ptr2 = ptr2.next.next
  }
  return true
};
