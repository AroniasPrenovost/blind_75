/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  if(!head) return head

  while(head && head.val == val) {
    head = head.next
  }

  let node = head
  let prv = null

  while(node){
    const next = node.next;

    if(node.val === val){
      prv.next = next;
    }else{
      prv = node;
    }    
    node = next
  }

  return head
};

// v2

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    while (head && head.val === val) {
        head = head.next;
    }
    let current = head;
    while (current && current.next) {
        if(current.next.val === val) {
            current.next = current.next.next;
        } else {
            current = current.next
        }
    }
    return head
};
