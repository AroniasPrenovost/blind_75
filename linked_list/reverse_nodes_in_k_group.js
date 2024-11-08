// Runtime: 112 ms, faster than 12.97% of JavaScript online submissions for Reverse Nodes in k-Group.
// Memory Usage: 38.3 MB, less than 100.00% of JavaScript online submissions for Reverse Nodes in k-Group.

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
 var reverseKGroup = function(head, k) {
  const helper = function(pre) {
      let count = 0;
      let cur = pre.next;
      while(cur && count++<k) {
          cur = cur.next;
      }
      if(count<k) {
          return null;
      }
      let head = pre.next;
      let stub = pre.next;
      cur = stub.next;
      let i = 0;
      while(cur && ++i<k) {
          [head.next, stub, cur.next, cur] = [cur.next, cur, stub, cur.next];
      }
      pre.next = stub;
      
      return head;
  };

  const root = new ListNode();
  root.next = head;
  let pre = root;
  while(pre) {
      pre = helper(pre);
  }
  
  return root.next;
};



test("test1", ()=>{
  const list = makeLink([1,2,3,4,5]);
  expect(reverseKGroup(list, 3)).toEqual(makeLink([3,2,1,4,5]));
})

// test case:
test("test1", ()=>{
  const list = makeLink([]);
  expect(reverseKGroup(list, 1)).toEqual(makeLink([]));
})

test("test2", ()=>{
  const list = makeLink([1]);
  expect(reverseKGroup(list, 1)).toEqual(makeLink([1]));
})

test("test3", ()=>{
  const list = makeLink([1]);
  expect(reverseKGroup(list, 2)).toEqual(makeLink([1]));
})

test("test4", ()=>{
  const list = makeLink([1,2,3]);
  expect(reverseKGroup(list, 2)).toEqual(makeLink([2,1,3]));
})

test("test5", ()=>{
  const list = makeLink([1,2,3]);
  expect(reverseKGroup(list, 3)).toEqual(makeLink([3,2,1]));
})

test("test6", ()=>{
  const list = makeLink([1,2,3,4,5,6]);
  expect(reverseKGroup(list, 3)).toEqual(makeLink([3,2,1,6,5,4]));
})

test("test7", ()=>{
  const list = makeLink([1,2,3,4,5]);
  expect(reverseKGroup(list, 3)).toEqual(makeLink([3,2,1,4,5]));
})

/* approach #2 */ 

function reverse(s,e) {
  let prev = null;
  let current = s;
  while(prev != e) {
      let n = current.next;
      current.next = prev;
      prev = current;
      current = n;
  }
  return prev;
}

var reverseKGroup = function(head, k) {
  if(head == null || head.next == null || k == 1) return head;
  let s = head;
  let e = head;
  let count = k-1;
  while(count--) {
      e = e.next;
      if(e == null) return head;
  }
  let nextHead = reverseKGroup(e.next,k);
  reverse(s,e);
  s.next = nextHead;
  return e;
};

console.log(reverseKGroup([1,2,3,4,5], 3));

/* approach #3 */

 // Definition for singly-linked list.
 function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
/**
* @param {ListNode} head
* @param {number} k
* @return {ListNode}
*/
var reverseKGroup = function(head, k) {

let pointer = head;
let count = 0;
while (head) {
    head = head.next;
    count++;
}
// return if count is less than k units
if (count < k) return pointer;

// reverse k units
let i = 0;
let previous = null;
while (i < k) {
    let temp = pointer.next;
    pointer.next = previous;
    previous = pointer;
    pointer = temp;
    i++;
}

// move to last reversed to continue 
let result = previous;
while (previous.next) {
    previous = previous.next;
}
previous.next = reverseKGroup(pointer, k);
    
return result;
};


/* approach #4  (using a stack) */ 

var reverseKGroup = function(head, k) {
    let stack = [];
    let newNode = new ListNode(-1);
    let temp = newNode;
    
    while(head) {
        for(let i = 0; i < k && head; i++) {
            stack.push(head);
            head = head.next;
        }
        
        if(stack.length === k) {
            while(stack.length > 0) {
                temp.next = stack.pop();
                temp = temp.next;
            }
            temp.next = head;
        }
    }
    return newNode.next;
};

reverseKGroup([1,2,3,4,5], 2); // [2,1,4,3,5]

/* approach #5 (iteration and recursion) */ 

 /*
 * 25. Reverse Nodes in k-Group
 * https://leetcode.com/problems/reverse-nodes-in-k-group/
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const reverseKGroup = (head, k) => {
  if (head === null) return head
  // define startNode and endNode
  let start = head, end = head
  
  // return self if linked list's length is smaller than k
  for (let i = 0; i < k; i++) {
    if (end === null) return head
    end = end.next
  }
  // reverse from startNode to endNode
  let newHead = reverse(start, end)
  // recursive the rest nodes and concat the result
  start.next = reverseKGroup(end, k)
  return newHead
};

// reverse from startNode to endNode
const reverse = (start, end) => {
  let [prev, curr] = [null, start]
  while (curr != end) [curr.next, prev, curr] = [prev, curr, curr.next]
  return prev
}
