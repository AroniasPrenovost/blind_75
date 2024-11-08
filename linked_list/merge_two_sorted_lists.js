/* 
  Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.


  Example 1:

    Input: l1 = [1,2,4], l2 = [1,3,4]
    Output: [1,1,2,3,4,4]
 

  Example 2:

    Input: l1 = [], l2 = []
    Output: []
  
  
  Example 3:

    Input: l1 = [], l2 = [0]
    Output: [0]
  

  Constraints:

  The number of nodes in both lists is in the range [0, 50].
  -100 <= Node.val <= 100
  Both l1 and l2 are sorted in non-decreasing order.

*/ 

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */



/* 


  approach #1 - recursion 

    Although recursive approach will be very inneficient is powerful for k lists and short len.

*/ 

/*     O(m + n)    */ 
var mergeTwoLists = function(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  if (l1.val < l2.val) {
      l1.next = mergeTwoLists(l1.next, l2);
      return l1;
  }
  l2.next = mergeTwoLists(l1, l2.next);
  return l2;
};


var mergeTwoLists = function(l1, l2) {
  const merge = (l1, l2) => {
    if(l1 && l2) {
        if(l1.val < l2.val) {
            l1.next = merge(l1.next, l2);
            return l1;
        } else {
            l1.next = merge(l1, l2.next);
            return l2;
        }
    }
    return l1 || l2;
  }
  
  return merge(l1, l2);
};

mergeTwoLists([1,2,4], [1,3,4]); // [1,1,2,3,4,4]


/* v.2 */ 

var mergeTwoLists = function(l1, l2) {
  if (l1 == null) return l2;
  if (l2 == null) return l1;
  
  if (l1.val <= l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  }
  else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};

mergeTwoLists([1,2,4], [1,3,4]); // [1,1,2,3,4,4]



/* v.3 (recursive) */ 

var mergeTwoLists = function(l1, l2) {
  if (!l1 || !l2) return l1 || l2;
  if (l1.val > l2.val){
    [l1, l2] = [l2, l1]; // swap will be heavy if more nodes
  }
  l1.next = mergeTwoLists(l1.next, l2)
  return l1
};


mergeTwoLists([1,2,4], [1,3,4]); // [1,1,2,3,4,4]

 

/* 

  approach #2 - iteration 


*/ 

var mergeTwoLists = function(l1, l2) {
  let root = new ListNode();
  let aux = root;
  
  const next = (node) => {
    aux.next = node;
    aux = aux.next;
    return node.next;
  }
  
  while(l1 && l2) {
    if(l1.val < l2.val) l1 = next(l1);
    else l2 = next(l2);
  }
  
  aux.next = l1 || l2;
  
  return root.next;
};



/* v.2 */ 

var mergeTwoLists = function(l1, l2) {
  let dummyHead = new ListNode();
  
  let prev = dummyHead;
  
  while (l1 != null && l2 != null) {
      if (l1.val <= l2.val) {
          prev.next = l1;
          l1 = l1.next;
      }
      else if (l2.val < l1.val) {
          prev.next = l2;
          l2 = l2.next;
      }
      
      prev = prev.next;
  }
 
  if (l1 != null) prev.next = l1;
  else prev.next = l2;
  
  return dummyHead.next;
};
mergeTwoLists([1,2,4], [1,3,4]); // [1,1,2,3,4,4]

/* v.3 */ 

var mergeTwoLists = function(l1, l2) {
  let l3 = new ListNode();
  let curr = l3;
  
  while(l1 != null && l2 != null) {
    if(l1.val < l2.val) {
      curr.next = l1
      l1 = l1.next;
    } else {
      curr.next = l2
      l2 = l2.next;
    }
    curr = curr.next;
  }

  curr.next = l1 || l2;
  return l3.next
};
mergeTwoLists([1,2,4], [1,3,4]); // [1,1,2,3,4,4]


/* v.4 */ 

var mergeTwoLists = function (l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;

  let tempHead = new ListNode(0);

  let l3 = tempHead;
  while (l1 && l2) {
      if (l1.val <= l2.val) {
          l3.next = l1;
          l1 = l1.next;
      } else {
          l3.next = l2;
          l2 = l2.next;
      }
      l3 = l3.next;
  }

  l3.next = l1 || l2;

  return tempHead.next;
};

mergeTwoLists([1,2,4], [1,3,4]); // [1,1,2,3,4,4]
