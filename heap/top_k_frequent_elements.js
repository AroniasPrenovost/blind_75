/* 

Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

 

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]
 

Constraints:

1 <= nums.length <= 105
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.
 

Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

*/ 




/* 

sort 

*/ 

var topKFrequent = function(nums, k) {
  const m = nums.reduce((m, n)=>{
      m[n] = (m[n] || 0) + 1
      return m
  }, {})
  let list = []
  for(let n in m){
      list.push([n, m[n]])
  }
  list.sort((a,b)=>b[1]-a[1])
  return list.filter((a, i)=>i<k).map(a=>a[0])
};


/* 

  Heap

*/ 

 

var topKFrequent = function(nums, k) {
    const m = nums.reduce((m, n)=>{
        m[n] = (m[n] || 0) + 1
        return m
    }, {})
    
    let q = queue((a, b)=>m[b]<m[a])
    
    for(let n in m) q.insert(n)
    
    let list = []
    for(; k>0; k--) list.push(q.extract())
    
    return list
};

function queue(fn){
    let size = 0
    let heap = []
    
    const left = n => 2*n+1
    const right = n => 2*n+2
    const parent = n => Math.floor((n-1)/2)
    const swap = (a, b) => [heap[a], heap[b]] = [heap[b], heap[a]]
    const peek= () => heap[0]
    
    const insert = n =>{
        heap.push(n)
        let ix = heap.length-1
        while(ix!==0 && fn(heap[ix], heap[parent(ix)])){
            swap(ix, parent(ix))
            ix = parent(ix)
        }
    }
    
    const extract = () =>{
        swap(0, heap.length-1)
        const res = heap.pop()
        heapify(0)
        return res
    }
    
    const heapify = idx => {
        const l = left(idx)
        const r = right(idx)
        let small = idx
        const size = heap.length
        if(l<size && fn(heap[l],heap[small])) small = l
        if(r<size && fn(heap[r],heap[small])) small = r
        
        if(small!==idx){
            swap(small, idx)
            heapify(small)
        }
        
    }
    
    return {insert, extract, peek}
}


/* 
  
  Using Heaps in javascript

  Time complexity: O(N log k)

*/ 

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

let heapList = [];

var topKFrequent = function(nums, k) {
    let map = {};
    let output = [];
    heapList = [];
    
    if(nums.length === k) return nums;
    
    for(let num of nums){
        map[num] = map[num] || 0;
        map[num]++;
    }

    createHeap(map, k);  
    
    while(k > 0){
        output.push(poll()[0]);
        k--;
    }
    return output;
    
};


const poll = () => {
    if(heapList.length === 0) return null;
    if(heapList.length === 0) return heapList.pop();
    
    let top = heapList[0];
    heapList[0] = heapList.pop();
    maxHeapifyDown(0);
    return top;
}

const createHeap = (map, limit) => {
    let counter = 0;
    // create heap upto full right node
    for(let key in map){
        heapList.push([key, map[key]]);
        maxHeapifyUp();
        if(counter >= limit){
            heapList.pop();
       }
    }
}

const hasParent = (index) => {
    return Math.floor((index-1)/2) >= 0;
}

const getParent = (index) => {
    return heapList[Math.floor((index-1)/2)][1];
}

const maxHeapifyUp = (index = heapList.length - 1) => {
    if(hasParent(index) && getParent(index) <= heapList[index][1]){
        // swap
        let tmp = heapList[index];
        heapList[index] = heapList[Math.floor((index-1)/2)]
        heapList[Math.floor((index-1)/2)] = tmp;
        maxHeapifyUp(Math.floor((index-1)/2));
    }
};

const hasLeftChild = (index) => {
    return 2*index + 1 < heapList.length;
}

const hasRightChild = (index) => {
    return 2*index + 2 < heapList.length;
}

const getLeftChild = (index) => {
    return heapList[2*index + 1];
}

const getLeftChildIndex = (index) => {
    return 2*index + 1;
}

const getRightChildIndex = (index) => {
    return 2*index + 2;
}

const getRightChild = (index) => {
    return heapList[2*index + 2];
}

const maxHeapifyDown = (index) => {
    let currIndex = null;
    if(hasLeftChild(index)){
        if(getLeftChild(index)[1] > heapList[index][1]){
            currIndex = getLeftChildIndex(index);
            if(hasRightChild(index) &&  getRightChild(index)[1] > getLeftChild(index)[1]){
                currIndex = getRightChildIndex(index);
            }
        } else if(hasRightChild(index) && getRightChild(index)[1] > heapList[index][1]){
            currIndex = getRightChildIndex(index);
        } else {
            return;
        }
        // swap
        let tmp = heapList[index];
        heapList[index] = heapList[currIndex];
        heapList[currIndex] = tmp;
        maxHeapifyDown(currIndex);
    }
}

/* 

  Using QuickSelect - 'Hoare's selection algorithm' **note, different from quicksort. 

  Time Complexity: Average: O(n), Worst: O(n* n)

*/ 

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var topKFrequent = function(nums, k) {
    let map = {};
    let output = [];
    
    if(nums.length === k) return nums;
    
    for(let num of nums){
        map[num] = (map[num] || 0) + 1;
    }
    
    const keys = Object.keys(map);
    
    if(keys.length === k) return keys;

    const partition = (nums, start, end, k) => {
        const pivot = nums[end];
        let i = start  - 1, j = start;
        while(j < end){
            if(map[nums[j]] < map[pivot]){
                i++;
                [nums[j], nums[i]] = [nums[i], nums[j]];
            }
            j++;
        }
        [nums[end], nums[i+1]] = [nums[i+1], nums[end]];
        return i + 1;
    }
    
    let start = 0, end = keys.length - 1, pivot = start;
    while(start <= end){
        pivot = partition(keys, start, end, k);
        if(pivot === keys.length - k){
            break;
        } else if(pivot < keys.length - k){
            start = pivot + 1;
        } else {
            end = pivot - 1;
        }
    }
    
    return keys.slice(pivot);
};