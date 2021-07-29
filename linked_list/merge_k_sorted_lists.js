/* 

  You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

  Merge all the linked-lists into one sorted linked-list and return it.

  Example 1:

      Input: lists = [[1,4,5],[1,3,4],[2,6]]
      Output: [1,1,2,3,4,4,5,6]
      Explanation: The linked-lists are:
      [
        1->4->5,
        1->3->4,
        2->6
      ]
      merging them into one sorted list:
      1->1->2->3->4->4->5->6



  Example 2:

      Input: lists = []
      Output: []



  Example 3:

        Input: lists = [[]]
        Output: []
  


  Constraints:

    k == lists.length
    0 <= k <= 10^4
    0 <= lists[i].length <= 500
    -10^4 <= lists[i][j] <= 10^4
    lists[i] is sorted in ascending order.
    The sum of lists[i].length won't exceed 10^4.

*/ 



/* 

  approach #1 - brute force 

  time:  O(n log n)
  space: O(n) 

*/ 



var mergeKLists = function (lists) {
  let numbers = []
  let dummy = new ListNode(0)
  let head = dummy

  for (let list of lists) {
      extractNumbers(list, numbers)
  }

  numbers.sort((a, b) => a - b)

  for (let number of numbers) {
      const newNode = new ListNode(number)
      dummy.next = newNode
      dummy = dummy.next
  }

  return head.next
};

const extractNumbers = (list, numbers) => {
  while (list) {
      numbers.push(list.val)
      list = list.next
  }
}





/* 

  approach #2 - compare one by one 

*/ 



var mergeKLists = function(lists) {
  let size = lists.length, result = new ListNode(), current = result, allDone = false;
  
  while (!allDone) {
    let min = new ListNode(Infinity), minIndex = -1, done = true;
    
    // find minimum value and index and keep track of done indicator
    for (let i = 0; i < size; i++) {
      if (lists[i] && lists[i].val < min.val) {
        min.val = lists[i].val;
        minIndex = i;
        if (lists[i] !== null) {
          done = false;
        }
      }
    }

    allDone = done;
    
    if (minIndex > -1) {
      current.next = new ListNode(lists[minIndex].val);
      current = current.next;
      lists[minIndex] = lists[minIndex].next;
    }
  }

  return result.next;
};






/* 

  approach #3 - optimize approach 2 by priority queue 

*/ 


/* 
  This uses MinPriorityQueue class from the datastructures-js library that is available in the LeetCode runtime. 
  I would argue that since these datastructures are available in other languages I would not expect to have to write 
  my own implementation in an interview and it should be sufficient to "stub" a class as long as I can explain the underlying data structure
*/ 

const mergeKLists = function(lists) {
  const queue = new MinPriorityQueue({ priority: x => x.val })

  for (const head of lists) {
    if (head) {
      queue.enqueue(head)
    }
  }

  let result = new ListNode()
  const head = result

  while (!queue.isEmpty()) {
    const { val, next } = queue.dequeue().element

    result.next = new ListNode(val)
    result = result.next

    if (next) {
      queue.enqueue(next)
    }
  }

  return head.next
}




/* 

  approach #4 - merge lists by one  [ merge sort ] 

*/ 

const mergeKLists = (lists) => {
  if (lists.length === 0) return null;
  
  const merge = (l1, l2) => {
      let temp = new ListNode(),
          curr = temp;
      while (l1 && l2) {
          if (l1.val < l2.val) {
              curr.next = l1;
              l1 = l1.next;
          } else {
              curr.next = l2;
              l2 = l2.next;
          }
          curr = curr.next;
      }
      curr.next = l1 || l2;
      return temp.next;
  }
  
  while(lists.length > 1) {
      let a = lists.shift();
      let b = lists.shift();
      const h = merge(a, b)
      lists.push(h)
  }
  return lists[0]
};









/* 

  approach #5 - merge with divide and conquer 
  
  change the scope to merge as two lists. forloop the lists, keep merging the lists(mergingResult, nextList)

  time: O(n log k)
  space: O(1) optimal 

*/ 

const mergeKLists = (lists) => {
    if (lists.length === 0) return null

    let interval = 1
    while(interval < lists.length) {
        for(let i = 0; i + interval < lists.length; i = i + interval * 2) {
            lists[i] = mergeTwoLists(lists[i], lists[i + interval])
        }
        interval *= 2
    }

    return lists[0]
};

var mergeTwoLists = (l1, l2) => {
    let dummy = new ListNode(0)
    let head = dummy

    while (l1 && l2) {
        if (l1.val < l2.val) {
            dummy.next = l1
            dummy = dummy.next
            l1 = l1.next
        } else {
            dummy.next = l2
            dummy = dummy.next
            l2 = l2.next
        }
    }

    if (l1 === null) {
        dummy.next =  l2
    }

    if (l2 === null) {
        dummy.next = l1
    }

    return head.next
};




/* v.2 */ 

function merge (left, right) {
  if (!left) {
      return right;
  } else if (!right) {
      return left;
  } else if (left.val < right.val){
      left.next = merge(left.next, right);
      return left;
  } else {
      right.next = merge(left, right.next);
      return right;
  }
}


function helper(lists, start, end) {
  if (start === end) {
      return lists[start];
  } else if (start < end) {
      const mid = parseInt((start + end) / 2);
      const left = helper(lists, start, mid);
      const right = helper(lists, mid + 1, end);
      return merge(left, right);
  } else {
      return null;
  }
  
}

var mergeKLists = function(lists) {
  return helper(lists, 0, lists.length - 1);
};