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


/* naive approach - works well to start */ 

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 const mergeKLists = (lists) => {
  //put all nodes in an array
  let nodes = [];
  lists.forEach((list) => {
      while (list) {
          nodes.push(list);
          list = list.next;
      }
  })
  
  //if array is empty, return null
  if (nodes.length === 0) return null;
  
  //sort the array
  nodes.sort((a, b) => a.val - b.val);
  
  //tell the nodes their new order
  for (let i = 0; i < nodes.length; i++) {
      const curNode = nodes[i];
      const nextNode = i < nodes.length - 1 ? nodes[i + 1] : null;
      curNode.next = nextNode;
  }
  
  //return the first one
  return nodes[0];
}







/* 

  another brute force / naive 
  
    time: O(n log n) 
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

  approach #1 - Simple Heap solution (with heap implementation)

  Here's the logic for the algorithm without the heap

*/ 

var mergeKLists = function(lists) {
    if (!lists.length) return null;
    let minHeap = new MinHeap();
    for (let node of lists) {
        if (node) {
            minHeap.add(node);
        }
    }
    let head = null;
    let cur;
    while (minHeap.size) {
        let node = minHeap.pop();
        if (head) {
            cur.next = new ListNode(node.val);
            cur = cur.next;
        } else {
            head = new ListNode(node.val);
            cur = head;
        }
        if (node.next) {
            minHeap.add(node.next);
        }
    }
    return head;
};

// Here's the heap (note uses, nodes and values to sort). Pardon the imperative style here, for brevity.

class MinHeap {
    constructor(){
        this.heap = [null];
        this.size = 0;
    }
    
    add(node) {
        this.heap.push(node);
        this.size++;
        this.siftUp();
    }
    
    pop(){
        if(this.size === 0) return null;
        this.size--;
        this.swap(1, this.heap.length -1);
        let res =  this.heap.pop();
        this.siftDown();
        return res;
    }
    
    swap(i,j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    
    siftUp() {
        let cI = this.heap.length - 1;
        let pI = Math.floor(cI/2);
        while (pI !== 0 && this.heap[pI].val > this.heap[cI].val) {
            this.swap(pI, cI);
            let temp = pI;
            pI = Math.floor(pI/2);
            cI = temp;
        }
    }
    
    siftDown() {
        let pI = 1;
        let c1I = 2*pI;
        let c2I = c1I + 1;
        while (c1I < this.heap.length) {
            let swapI;
            if (c2I >= this.heap.length) { swapI = c1I;}
            else {
                swapI = this.heap[c1I].val > this.heap[c2I].val ? c2I : c1I;
            }
            if (this.heap[pI].val < this.heap[swapI].val) {
                return;
            } else {
                this.swap(swapI, pI);
                pI = swapI;
                c1I = 2* pI;
                c2I = c1I + 1;  
            }
        }
    }    
}







/* 

  apprach #2 



  O(n log k) time and O(k) space using min-heap


  This is O(n log k) time where n is the total number of nodes and k is the number of lists or the maximum size of the heap.

  *JavaScript doesn't have built-in priority queuing, so we use a heap from scratch here. .


*/ 

class Heap {
    constructor(comparator) {
        this.data = [];
        this.comparator = comparator || ((parent, child) => parent - child);
    }

    get size() {
        return this.data.length;
    }

    bubbleUp(c) {
        if (c === 0) return;
        const p = Math.floor((c + 1) / 2) - 1;
        if (this.comparator(this.data[p], this.data[c]) > 0) {
            [this.data[p], this.data[c]] = [this.data[c], this.data[p]];
        }
        this.bubbleUp(p);
    }

    bubbleDown(p) {
        const c = 2 * (p + 1) - 1;
        if (c >= this.data.length) return;

        const leftDelta = this.comparator(this.data[p], this.data[c]);
        const rightDelta = c + 1 >= this.data.length ? 0 : this.comparator(this.data[p], this.data[c + 1]);
        if (leftDelta <= 0 && rightDelta <= 0) return;

        const swapChildIndex = c + (leftDelta <= rightDelta);
        [this.data[p], this.data[swapChildIndex]] = [this.data[swapChildIndex], this.data[p]];
        this.bubbleDown(swapChildIndex);
    }

    add(val) {
        this.data.push(val);
        this.bubbleUp(this.data.length - 1);
    }

    poll() {
        if (this.size < 2) return this.data.pop();
        [this.data[0], this.data[this.size - 1]] = [this.data[this.size - 1], this.data[0]];
        const val = this.data.pop();
        this.bubbleDown(0);
        return val;
    }
}

var mergeKLists = function(lists) {
    if (!lists.length) return null;
    
    const minHeap = new Heap((parent, child) => parent.val - child.val);
    for (let node of lists) {
        if (node) minHeap.add(node);
    }
    
    const dummy = new ListNode();
    let tail = dummy;
    while (minHeap.size) {
        tail.next = minHeap.poll();
        tail = tail.next;
        if (tail.next) minHeap.add(tail.next);
    }
    
    return dummy.next;
};







/* 

  approach #3 - 

  To achive this, just try first to implement mergeSort at your own, then you'll see is very easy to achive it iterative.

*/ 



var mergeKLists = function(lists) {
    
    const mergeSort = (arr) => {
        if(arr.length === 0) return null;
        if(arr.length === 1) return arr[0];
        const left = arr.splice(0, arr.length / 2);
        return merge(mergeSort(left), mergeSort(arr));
    }
    
    const merge = (a,b) => {
        const root = new ListNode();
        let aux = root;
        while(a && b) {
            if(a.val < b.val) {
                aux.next = a;
                a = a.next;
            } else {
                aux.next = b;
                b = b.next;
            }
            aux = aux.next;
        }
        aux.next =  a || b;
        return root.next;
    }
    
    return mergeSort(lists);
};


// This was my first though to be honest.

var mergeKListsMinHeap = function(lists) {
    let root = new ListNode();
    let aux = root;
    const heap = new MinHeap();
    
    for(const h of lists) {
        if(h) {
            heap.push(h);
        }
    }

    while(!heap.isEmpty()) {
        const node = heap.pop();
        aux.next = node;
        aux = aux.next;
        if(node.next)
            heap.push(node.next);
    }
    
    return root.next;
};

class MinHeap {
    constructor() {
        this.heap = new Array(500);
        this.idx = 0;
    }
    
    size = () => this.idx;
    isEmpty = () => this.idx === 0;
    parent = (i) => (i-1) / 2 | 0;
    left = (i) => (i * 2) + 1;
    right = (i) => (i * 2) + 2;

    isMin = (i, j) => this.heap[i].val < this.heap[j].val;
    swap = (a,b) => {
        const tmp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = tmp;
    }

    push = (node) => {
        let i = this.idx;
        this.heap[this.idx++] = node;
        let p = this.parent(i);
        while(i > 0 && this.isMin(i, p)) {
            this.swap(i, p);
            p = this.parent(i = p);
        }
    }
    
    min = (i) => {
        let l = this.left(i);
        let r = this.right(i);
        let best = i;
        if(l < this.size() && this.isMin(l, best)) best = l;
        if(r < this.size() && this.isMin(r, best)) best = r;
        
        return this.isMin(i, best) ? i : best;
    }
    
    heapify = (i = 0) => {
        let best = this.min(i);
        while(best !== i) {
            this.swap(i, best);
            best = this.min(i = best);
        }
    }
    
    pop = () => {
        if(this.isEmpty()) return null;
        const n = this.heap[0];
        this.swap(0, --this.idx);
        this.heapify();
        return n;
    }
}

  




/* 

  Divide & Conquer Method (D&C)

  Code is taken from a Java solution. Good for going over and studying

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
}
;
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

function mergeTwoLists(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;

  const curr = new ListNode(0);
  let t = curr;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      t.next = l1;
      l1 = l1.next;
    } else {
      t.next = l2;
      l2 = l2.next;
    }

    t = t.next;
  }

  t.next = l1 || l2;

  return curr.next;
}

var mergeKLists = function(lists) {
    if (!lists || !lists.length) return null;
    return dNC(lists, 0, lists.length - 1);

    function dNC(lists, s, e) {
        if (s === e) return lists[s];

        const mid = Math.floor((s + e) / 2);
        const left = dNC(lists, s, mid);
        const right = dNC(lists, mid + 1, e);

        return mergeTwoLists(left, right);
    }
};