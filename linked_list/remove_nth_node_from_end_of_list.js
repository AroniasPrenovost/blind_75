/* 

  Given the head of a linked list, remove the nth node from the end of the list and return its head.

  

  Example 1:

    Input: head = [1,2,3,4,5], n = 2
    Output: [1,2,3,5]
 
 
  Example 2:

      Input: head = [1], n = 1
      Output: []



  Example 3:

      Input: head = [1,2], n = 1
      Output: [1]
  

  Constraints:

    The number of nodes in the list is sz.
    1 <= sz <= 30
    0 <= Node.val <= 100
    1 <= n <= sz
  
  Follow up: Could you do this in one pass?

*/ 



/* 

  approach #1 - 2 pass algorithm 

  Time Complexity = O(N) (N - length of the list = total number of nodes)
  Space Complextiy = O(1)

*/ 


var removeNthFromEnd = function(head, n) {
    let fast = head,
        slow = head,
        temp;
    
	// move fast pointer to the right n times, so that slow and fast pointer are at n distance from one another
    while(n--) {
        fast = fast.next;
    }
    // in case, n equals length of list and first node is to be removed
    if(!fast) {
        temp = head.next;
        delete(temp);
        return temp;
    }
    
	// move slow and fast pointer until fast reaches the last node
	// then the slow pointer will be pointing to the node that is (n + 1)th from the end
    while(fast.next) {
        slow = slow.next;
        fast = fast.next;
    }
	
	// remove the nth node by updating the next pointer and deleting the removed node
    temp = slow.next;
    slow.next = temp.next;    
    delete(temp);
    return head;
};






/* 

  approach #2 - 1 pass algorithm 

*/ 


/*  fast & slow, 2 pointer approach  */ 
var removeNthFromEnd = function(head, n) {
  let temp = new ListNode(0);
  temp.next = head;
  let  slow = temp,
      fast = temp;
      
  while(fast.next !== null) {
      fast = fast.next
      if(n-- <= 0) {
          slow = slow.next;
      }
  }
  slow.next = slow.next.next;
  return temp.next;
};


/*  fast & slow, 2 pointer approach  */ 
const removeNthFromEnd = (head, n) => {
  const dummy = new ListNode(0, head);
  let left = dummy,
    right = dummy.next;
  while (n-- > 0) right = right.next; // Advance n times
  while (right !== null) { // Advance both until the right one reaches the tail
    left = left.next;
    right = right.next;
  }
  left.next = left.next.next; // Delete link
  return dummy.next;
};


/*  fast & slow, 2 pointer approach  */ 
var removeNthFromEnd = function(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let slow = dummy;
  let fast = dummy;
  
  for (let i = 1; i <= n + 1; i++) {
      fast = fast.next;
  }
  while (fast !== null) {
      fast = fast.next;
      slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
};


/*  fast & slow, 2 pointer approach  */ 
var removeNthFromEnd = function(head, n) {
  const dummyHead = new ListNode(0, head);
  let fast = dummyHead;
  
  for (let i = 0; i < n; i++) {
      fast = fast.next;
  }
  
  let slow = dummyHead;
  
  while (fast && fast.next != null)  {
      slow = slow.next;
      fast = fast.next;
  }
  
  slow.next = slow.next.next;
  
  return dummyHead.next;
};




/* 

  One pass recursive solution 

  Walk through the list to the end and remove the Nth node on the way back.

*/ 


const removeNthFromEnd = function(head, n) {
    
    const recursiveTraverse = (node) => {
        if (!node) {
            return 0;
        }
        
        const nextNodeNumberFromEnd = recursiveTraverse(node.next);
        
        if (nextNodeNumberFromEnd === n) {
            node.next = node.next.next;
        }
        
        return nextNodeNumberFromEnd + 1;
    }
    
    const dummyHead = new ListNode(0, head);
    
    recursiveTraverse(dummyHead);
    
    return dummyHead.next;
};




/* 

  With a singly linked list, the only way to find the end of the list, and thus the n'th node from the end, is to actually iterate all the way to the end. The challenge here is attemping to find the solution in only one pass. A naive approach here might be to store pointers to each node in an array, allowing us to calculate the n'th from the end once we reach the end, but that would take O(M) extra space, where M is the length of the linked list.

  A slightly less naive approach would be to only store only the last n+1 node pointers in the array. This could be achieved by overwriting the elements of the storage array in circlular fashion as we iterate through the list. This would lower the space complexity to O(N+1).

  In order to solve this problem in only one pass and O(1) extra space, however, we would need to find a way to both reach the end of the list with one pointer and also reach the n'th node from the end simultaneously with a second pointer.

  To do that, we can simply stagger our two pointers by n nodes by giving the first pointer (fast) a head start before starting the second pointer (slow). Doing this will cause slow to reach the n'th node from the end at the same time that fast reaches the end.

  Visual 1

  Since we will need access to the node before the target node in order to remove the target node, we can use fast.next == null as our exit condition, rather than fast == null, so that we stop one node earlier.

  This will unfortunately cause a problem when n is the same as the length of the list, which would make the first node the target node, and thus make it impossible to find the node before the target node. If that's the case, however, we can just return head.next without needing to stitch together the two sides of the target node.

  Otherwise, once we succesfully find the node before the target, we can then stitch it together with the node after the target, and then return head.

  Implementation:
  There are only minor differences between the code of all four languages.

  Javascript Code:
  The best result for the code below is 60ms / 40.6MB (beats 100% / 13%).

*/

var removeNthFromEnd = function(head, n) {
    let fast = head; 
    let slow = head; 

    for (let i = 0; i < n; i++) {
      fast = fast.next;
    }

    if (!fast) {
      return head.next;
    }

    while (fast.next) {
      fast = fast.next;
      slow = slow.next;
    }

    slow.next = slow.next.next
    return head
};




/*       */ 

// We'll use three pointers: prev, cur, ahead
// We'll advance ahead pointer by n first. Then, we will advance all three pointers until ahead reaches the end
// Then, cur will point to the n-th node from the end and prev will point to the previous node
// prev's next becomes cur's next and we just removed current node (which is n-th node from end of list)

var removeNthFromEnd = function(head, n) {
  let prev = null, cur = head, ahead = head;
  for (let i = 0; i < n; i++) {
      ahead = ahead.next;
  }
  while (ahead !== null) {
      prev = cur;
      cur = cur.next;
      ahead = ahead.next;
  }
  // Now, cur points to the n-th node from the end and prev points to the previous node
  if (!prev) return cur.next; // this is when head node is the node to be deleted
  prev.next = cur.next;
  return head; 
  // Time Complexity: O(N)
  // Space Complexity: O(1)
};







/*    1 pass Javascript solution with a map   */ 

var removeNthFromEnd = function(head, n) {
  //n is always valid so length has to be atleast 1
  var len = 1;
  var curr = head;
  // we will store all pointers for each node in a map
  var map = {};
  while(curr.next != null) {
      map[len] = curr; //store the pointer to current node in a map to be used later
      curr = curr.next;//move the current pointer forward
      len = len + 1;//increment list length by 1 for each iteration
  }
  //calculate at which index, we need to delete the element
  var idx = len-n;
  if(idx === 0 ){ 
      // this is the edge case where first element needs to be removed
      head = head.next;
  }else{
      //if it is not last element point current next pointer to next next pointer, otherwise point to null
      map[idx].next = map[idx+1] ? map[idx+1].next : null;
  }
  return head;
};



/* another 1-pass solution */ 

var removeNthFromEnd = function(head, n) {
  var left, before, right = head;
  left = before = {next: head}; 
  while (n--) right = right.next;
  while (right) {
    right = right.next;
    left = left.next;
  }
  left.next = left.next.next;
  return before.next;
};