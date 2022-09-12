/* 

Given a linked list, swap every two adjacent nodes and return its head. 
You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

Example 1:

  Input: head = [1,2,3,4]
  Output: [2,1,4,3]
  Example 2:

  Input: head = []
  Output: []
  Example 3:

  Input: head = [1]
  Output: [1]


  Constraints:

  The number of nodes in the list is in the range [0, 100].
  0 <= Node.val <= 100

*/

/* 

  approach #1

*/

var swapPairs = function(head) {
    let dummy = new ListNode(-1);
    dummy.next = head;
    let p = dummy;
    while (head && head.next) {
        let node = head.next.next; 
        p.next = head.next;
        p.next.next = head;
        p = p.next.next;
        head = node;
        p.next = head;
    }
    return dummy.next;
};

swapPairs([1, 2, 3, 4]); // [2, 1, 4, 3]


/* 

  approach #2

*/


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    let cur = head;
    let newHead = head && head.next ? head.next : head;
        
    while (cur && cur.next) {
        let next = cur.next;
        let temp = next.next;
        
        next.next = cur;
        cur.next = temp && temp.next ? temp.next : temp;
        
        cur = temp;
    }

    
    return newHead;
};




/* 

  approach #3

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let swapPairs = function(head) {
    let dummy=new ListNode();
    dummy.next = head;
    let result = dummy;
    while(dummy.next && dummy.next.next){
        let p=dummy.next,q = dummy.next.next;
        dummy.next = q;
        p.next = q.next;
        q.next = p;
        dummy = p
    }
    return result.next
};

swapPairs([1, 2, 3, 4]); // [2, 1, 4, 3]



/* 

  approach #4

    recursive 

*/


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    let result = resolve(head);
    return result;
};

function resolve(head){
    if(!head || !head.next){
        return head;
    }  
    let temp = head.val;
    head.val = head.next.val;    
    head.next.val = temp;
    resolve(head.next.next);
    return head;
}

swapPairs([1, 2, 3, 4]); // [2, 1, 4, 3]
