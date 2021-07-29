/* 

  You are given the head of a singly linked-list. The list can be represented as:

  L0 → L1 → … → Ln - 1 → Ln
  Reorder the list to be on the following form:

  L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
  You may not modify the values in the list's nodes. Only nodes themselves may be changed.


  Example 1:

    Input: head = [1,2,3,4]
    Output: [1,4,2,3]
    


  Example 2:

    Input: head = [1,2,3,4,5]
    Output: [1,5,2,4,3]


  Constraints:

  The number of nodes in the list is in the range [1, 5 * 104].
  1 <= Node.val <= 1000



  This problem is a combination of these three easy problems:
    - Middle of the Linked List
    - Reverse Linked List
    - Merge Two Sorted Lists


*/ 










/* 

  approach #1 - recursive 

*/ 

let reorderList = (head) => {
  let start = head;
  let stop = false;
  let dfs = (end) => {
    if (end === null) return;
    dfs(end.next); // Recurse until end points to last node

    if (!stop) {
      if (start.next === end || start === end) { //We have reached the last node in the reordered list
        end.next = null; //Update last node's next pointer
        stop = true; //This will prevent any more modifications to the pointers as we recurse backwards
      } else {
        let next = start.next;
        start.next = end;
        end.next = next;
        start = next;
      }
    }
  };
  dfs(head);
  return head;
};



/* v.2 

  time:  O(n)
  space: O(n)

  faster than 100% of solutions! 

*/ 

var reorderList = function(head) {
  const nodes = [];
  
  // Store all nodes from LinkedList into array
  let node = head;
  while (node) {
      nodes.push(node);
      node = node.next;
  }
  
  // Connecting nodes 
  node = nodes[0];
  let counter = 0;
  let length = nodes.length;
  
  while (counter < length) {
      if (counter === length - 1) {
          node.next = null;
          break;
      }
      
      if (counter % 2 === 0) {
          node.next = nodes[length - Math.floor(counter / 2) - 1];
      } else {
          node.next = nodes[Math.floor(counter / 2) + 1];
      }
      
      node = node.next;
      counter++;
  }
};

/*   using a stack */

var reorderList = function (head) {
  let stack = [], node = head
  if (!node) return
  while (node) {
    stack.push(node)
    node = node.next
  }

  let len = stack.length
  node = head
  for (let i = 0; i < len; i++) {
    if (i % 2 === 0) {
      node.next = stack.shift()
    } else {
      node.next = stack.pop()
      node = node.next
    }
  }
  node.next = null
};







/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
 var reorderList = function(head) {
  /* Not too many limitations, we just need to leave the values alone.
  
  Naively we could: grab the beginning, grab the end, attach, repeat
  But then, to grab the end, you're looping over the list N times, a n^2 solution.
  
  A different way that came to me is: what can we do with more space? 
  We can put it all in a stack and alternately
  Shift and pop from the stack alternating, until the stack is empty.
  
  It doesn't mention anything about having to use constant space, so
  adding N space will ensure we can do it in N time.
  
 
  
  */
  
  // 0 Test for edge cases    
  if (!head) {
      return head;
  }
  
  // 1 put nodes in a stack
  var stack = [];
  var node = head.next; // don't put head in the stack, gets awkward if you do
  
  while (node) {
      stack.push(node);
      node = node.next;
  }
  
  // 2 string together
  var index = 0; // just to keep track of when we pop vs shift
  node = head;
      
  while (stack.length) {
      if (index % 2 === 0) {
          node.next = stack.pop(); // grab from the end
      } else {
          node.next = stack.shift(); // grab from the start
      }
      // set up next iteration:
      index++;
      node = node.next
  }
  
  // Easy to forget, without it we will get a looped list
  node.next = null;
  
  return head;
};




/* 

  recursive solution 

*/ 


var reorderList = function(head) {
  dfs(head)
};

function dfs(node) {
  if (!node || !node.next || !node.next.next) return
  var end = node
  var next = node.next
  var pre
  while (end.next) {
      prev = end
      end = end.next
  }
  node.next = end
  end.next = next
  prev.next = null
  dfs(next)
}


/* 

  recursive solution 

*/ 

var reorderList = function(head) {
    
  // 1. find the middle node
  function findMiddle(fast, slow) {
      if(!fast || !fast.next) return slow;
      return findMiddle(fast.next.next, slow.next);
  }
  
  // 2. reverse the second half
  function reverseList(node, prev) {
      if(!node) return prev;
      const temp = node.next;
      node.next = prev;
      return reverseList(temp, node);
  }
  
  // 3. merge first and second half
  function reorder(l1, l2) {
      if(!l1 || !l2 || !l2.next) return l1;
      const temp = l1.next;
      l1.next = l2;
      l2.next = reorder(temp, l2.next);
      return l1;
  }
  let mid = findMiddle(head, head);
  mid = reverseList(mid, null); 
  return reorder(head, mid);
};



/* 

  using a stack 

*/ 

var reorderList = function (head) {
  let stack = [], node = head
  if (!node) return
  while (node) {
    stack.push(node)
    node = node.next
  }

  let len = stack.length
  node = head
  for (let i = 0; i < len; i++) {
    if (i % 2 === 0) {
      node.next = stack.shift()
    } else {
      node.next = stack.pop()
      node = node.next
    }
  }
  node.next = null
};


/* 

  Split the linked list from the middle using 2 pointers into part1 & part2
    Reverse part2
    Merge part1 and part2

*/ 

var reorderList = function(head) {
    
    if (!head || !head.next) return; 
    
    // find the middle point
    let slow=head, fast=head;
    while(fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // split into two part head & part2
    let part2 = slow.next;
    slow.next = null;
    
    // reverse part 2
    let prev = null, cur = part2, next = cur.next;
    while(cur) {
        next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    
    part2 = prev;
    
    // merge head & part2
    while(head && part2) {
        let p1 = head.next;
        let p2 = part2.next
        head.next = part2;
        head.next.next = p1;
        part2 = p2;
        head = p1;
    }
    
    return head;
};



/* */

var reorderList = function(head) {
  if (!head) return null;
  
  // Point head to the rest of the list reversed
  head.next = reverseList(head.next);

  // Recurse on head.next
  reorderList(head.next);
};

var reverseList = function(head) {
  let prev = null;
  let curr = head; 
  let next = null;

  while (curr) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}


/* stack solution */ 

var reorderList = function(head) {
  const stack = [];
  let itr = head;
  while (itr){
      stack.push(itr)
      itr = itr.next
  }
  
  let leftIndex = 0;
  let rightIndex = stack.length - 1;
  while(leftIndex < rightIndex - 1){
      const leftNode = stack[leftIndex];
      const rightNode = stack[rightIndex];
      
      const prevRightNode = stack[rightIndex - 1];
      const nextLeftNode = stack[leftIndex + 1]
      
      leftNode.next = rightNode;
      rightNode.next = nextLeftNode;
      prevRightNode.next = null;
      
      leftIndex += 1;
      rightIndex -= 1;
  }
};