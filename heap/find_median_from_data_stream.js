/* 

  The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values.

      For example, for arr = [2,3,4], the median is 3.
      For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
  
  
  
  
  Implement the MedianFinder class:

    MedianFinder() initializes the MedianFinder object.
    void addNum(int num) adds the integer num from the data stream to the data structure.
    double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.
  

  Example 1:

      Input
      ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
      [[], [1], [2], [], [3], []]
      Output
      [null, null, null, 1.5, null, 2.0]

      Explanation
      MedianFinder medianFinder = new MedianFinder();
      medianFinder.addNum(1);    // arr = [1]
      medianFinder.addNum(2);    // arr = [1, 2]
      medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
      medianFinder.addNum(3);    // arr[1, 2, 3]
      medianFinder.findMedian(); // return 2.0
  

  Constraints:

  -105 <= num <= 105
  There will be at least one element in the data structure before calling findMedian.
  At most 5 * 104 calls will be made to addNum and findMedian.
  

  Follow up:

  If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
  If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?


*/ 


/* brute force */ 

class MedianFinder {
  constructor() {
      this.a = [];
  }

  addNum(num) {
      this.a.push(num);
  }

  findMedian() {
      this.a.sort((x, y) => x - y);
      let n = this.a.length;
      let m = n >> 1;
      return n & 1 ? this.a[m] : (this.a[m - 1] + this.a[m]) / 2;
  }
}







/* 

  approach #1 - simple sort 

*/ 



var MedianFinder = function() {
  this.a = [];
};

/** 
* @param {number} num
* @return {void}
*/
MedianFinder.prototype.addNum = function(num) {
this.a.push(num);
};

/**
* @return {number}
*/
MedianFinder.prototype.findMedian = function() {
  this.a.sort((x, y) => x - y);
let n = this.a.length;
let m = n >> 1;
return n & 1 ? this.a[m] : (this.a[m - 1] + this.a[m]) / 2;
};

/** 







/* 

  approach #2 - insertion sort

   using binary search 
   
   O(n) + O(logn) ~ O(n)

*/ 



/**
 * initialize your data structure here.
 */
 var MedianFinder = function() {
  this.nums = [];
};

/** 
* @param {number} num
* @return {void}
*/
MedianFinder.prototype.size = function(num) {
  return this.nums.length;
}

/** 
* @param {number} num
* @return {void}
*/
MedianFinder.prototype.addNum = function(num) {
  if (this.size() === 0) {
      this.nums.push(num);
  } else {
      let idx = search(this.nums, num);
      this.nums.splice(idx, 0, num)
  }
};

/**
* @return {number}
*/
MedianFinder.prototype.findMedian = function() {
  if (this.size() === 0) return 0;
  let isSizeEven = this.size() % 2 === 0;
  let mid = isSizeEven ? (this.size() / 2) : ((this.size() - 1) / 2);
  return isSizeEven ? (this.nums[mid] + this.nums[mid - 1]) / 2 : this.nums[mid];
};

/** 
* Your MedianFinder object will be instantiated and called as such:
* var obj = new MedianFinder()
* obj.addNum(num)
* var param_2 = obj.findMedian()
*/

function search(arr, num) {
  let start = 0;
  let end = arr.length - 1;
  
  if (num < arr[0]) return 0;
  
  if (num > arr[end]) return end + 1;

  let ans = -1; 
  
  while (start <= end) {
      const mid = start + ((end - start) >> 1);
      if (arr[mid] <= num) {
          start = mid + 1;
          ans = mid;
      } else {
          end = mid - 1;
      }
  }
  
  return ans + 1;
}



/* 

  v.2 

  Approach
  As this list grows, it may become expensive to step through it and find the location of insertion. So, given that we'll be maintaining an ordered list, we can take advantage of bisection search to achieve faster search speed

  addNum is our workhorse:
    Create a recursive function searchForInsertionIndex()
    First account for special cases like empty or small lists
    Find the middle index of the current list (list.length / 2, rounded down)
    Check to see if num is equal to the middle or fits on either side (main base cases)
    If not, recurse on the correct half of the list and move our storageIndex pointer +/- slice length / 2 (with appropriate rounding)
    After each number is added, we calculate the median value depending on whether the list is even/odd length
    Median is then stored on the object
  findMedian() is just a getter for this.median

*/

var MedianFinder = function() {
  this.storage = [];
  this.median;
};

MedianFinder.prototype.addNum = function(num) {
  const searchForInsertionIndex = (orderedList, storageIndex=-1) => {
    const middleIndex = Math.floor(orderedList.length / 2);
    if (storageIndex < 0) {
      storageIndex = middleIndex;
    }
    const [leftNum, middleNum, rightNum] = [orderedList[middleIndex - 1], orderedList[middleIndex], orderedList[middleIndex + 1]];

    if (orderedList.length === 0 || middleNum === num) {
      return storageIndex;
    }
    if (orderedList.length === 1) {
      return num > middleNum ? storageIndex + 1 : storageIndex;
    }
    if (orderedList.length === 2) {
      if (num > middleNum) {
        return storageIndex + 1;
      }
      if (num > leftNum) {
        return storageIndex;
      }
      return storageIndex - 1;
    }
    if (rightNum >= num && middleNum < num) {
      return storageIndex + 1;
    }
    if (middleNum > num && leftNum <= num) {
      return storageIndex;
    }
    if (num > rightNum) {
      const rightList = orderedList.slice(middleIndex + 1);
      return searchForInsertionIndex(rightList, storageIndex + Math.floor(rightList.length / 2) + 1);
    }
    const leftList = orderedList.slice(0, middleIndex);
    return searchForInsertionIndex(leftList, storageIndex - Math.ceil(leftList.length / 2));
  };
  const insertionIndex = searchForInsertionIndex(this.storage);
  this.storage.splice(insertionIndex, 0, num);

  const middleIndex = Math.floor(this.storage.length / 2);
  this.median = this.storage.length % 2 === 0
    ? (this.storage[middleIndex] + this.storage[middleIndex - 1]) / 2
    : Math.floor(this.storage[middleIndex]);
};

MedianFinder.prototype.findMedian = function() {
  return this.median;
};



/* 

  approach #3 - two heaps 

*/ 



/* 

  Min Heap + Max Heap O(logN) Time

  Time: addNum => O(logN) | findMedian => O(1)
  Space: O(N)

*/ 

class MedianFinder {
  constructor() {
      this.minHeap = new MinPriorityQueue({ priority: x => x });
      this.maxHeap = new MaxPriorityQueue({ priority: x => x });
  }
  
  addNum(num) {
      this.minHeap.enqueue(num);

      if(this.minHeap.size() > this.maxHeap.size()) {
          const val = this.minHeap.dequeue().element;
          this.maxHeap.enqueue(val);
      }

      if(this.maxHeap.size() > this.minHeap.size()) {
          const val = this.maxHeap.dequeue().element;
          this.minHeap.enqueue(val);
      }
  }

  findMedian() {
      if(this.minHeap.size() === this.maxHeap.size()) {
          const num1 = this.minHeap.front().element;
          const num2 = this.maxHeap.front().element;
          return (num1 + num2) / 2;
      }

      if(this.minHeap.size() > this.maxHeap.size()) {
          return this.minHeap.front().element;
      }
      return this.maxHeap.front().element;
  }
}









/*       */ 





/**
 * initialize your data structure here.
 */
 var MedianFinder = function() {
  this.rHeap = new Heap((a, b) => a > b); //minHeap for right
  this.lHeap = new Heap((a, b) => b > a); //maxHeap for left
};

/** 
* @param {number} num
* @return {void}
*/
MedianFinder.prototype.addNum = function(num) {
  if(this.lHeap.isEmpty() || num <= this.lHeap.peek()) {
      this.lHeap.add(num);
  } else {
      this.rHeap.add(num);
  }
  //balance the two heaps
  if(this.lHeap.getSize() < this.rHeap.getSize()) {
      this.lHeap.add(this.rHeap.pop());
  } else if(this.lHeap.getSize() - this.rHeap.getSize() === 2) {
      this.rHeap.add(this.lHeap.pop());
  }
};

/**
* @return {number}
*/
MedianFinder.prototype.findMedian = function() {
  if(this.lHeap.getSize() > this.rHeap.getSize()) {
      return this.lHeap.peek();
  } else {
      return (this.lHeap.peek() + this.rHeap.peek()) / 2;
  }
};

/** 
* Your MedianFinder object will be instantiated and called as such:
* var obj = new MedianFinder()
* obj.addNum(num)
* var param_2 = obj.findMedian()
*/

var Heap = function(func) {
  this.heap = [];
  this.compareFunc = func;
}

Heap.prototype.swap = function(index1, index2) {
  var temp = this.heap[index1];
  this.heap[index1] = this.heap[index2];
  this.heap[index2] = temp;
}
  
Heap.prototype.isEmpty = function() {
  return this.heap.length === 0;
}

Heap.prototype.getSize = function() {
  return this.heap.length;
}

//Add value to the heap
Heap.prototype.add = function(v) {
  this.heap.push(v);
  this.heapifyUp();
}
  
Heap.prototype.peek = function() {
  return this.heap[0];
}

Heap.prototype.pop = function() {
  if(this.heap.length === 1) return this.heap.pop();
  var top = this.heap[0];
  this.heap[0] = this.heap.pop();
  this.heapifyDown();
  return top;
}

Heap.prototype.heapifyUp = function() {
  var index = this.heap.length - 1;
  var parent = this.getParentIndex(index);
  while(parent !== null && this.compareFunc(this.heap[parent], this.heap[index])) {
      this.swap(parent, index);
      index = parent;
      parent = this.getParentIndex(index);
  }
}

Heap.prototype.heapifyDown = function() {
  var index = 0;
  while(this.getLeftChildIndex(index)) {     
      var targetChildIndex = this.getLeftChildIndex(index);
      var rightChildIndex = this.getRightChildIndex(index);
      if (rightChildIndex && this.compareFunc(this.heap[targetChildIndex], this.heap[rightChildIndex])) {
          targetChildIndex = rightChildIndex;
      }
      if (this.compareFunc(this.heap[targetChildIndex], this.heap[index])) {
          break;
      } else {
          this.swap(index, targetChildIndex);
          index = targetChildIndex;
      }
  }
}

Heap.prototype.getParentIndex = function(index) {
  var parentIndex = Math.floor((index - 1)/2);
  return parentIndex >= 0 ? parentIndex : null;
}

Heap.prototype.getLeftChildIndex = function(index) {
  var leftChildIndex = index * 2 + 1;
  return leftChildIndex <= this.heap.length - 1 ? leftChildIndex : null;
}

Heap.prototype.getRightChildIndex = function(index) {
  var rightChildIndex = index * 2 + 2;
  return rightChildIndex <= this.heap.length - 1 ? rightChildIndex : null;
}






/* v.2 */ 


/*

MAIN FUNCTION & LOGIC

*/
class MedianOfAStream {
  constructor(){
      this.minHeap = new MinHeap();
      this.maxHeap =  new MaxHeap();
  }
  insert_num(num) {
      
      let minVal = this.minHeap.values;
      let maxVal = this.maxHeap.values;

      // start off with maxHeap. 
      if(minVal.length === 0 && maxVal.length === 0 ) {
          this.maxHeap.insert(num);
          return
      }

      // if number is smaller than maxHeap, add to minHeap. & Vice Vera
      if(num < maxVal[0]) {
          this.maxHeap.insert(num);
      } else {
          this.minHeap.insert(num)
      }

      // maxHeap will have 1 more element than minHeap if data set length is odd
      // if maxHeap or minHeap gets too big, even out heaps by removing an element and inserting it into the other heap
      if (maxVal.length > minVal.length + 1) {
          this.minHeap.insert(this.maxHeap.remove());
      } 
      if (minVal.length > maxVal.length){
          this.maxHeap.insert(this.minHeap.remove());
      }
  }

  find_median() {
      
      let minVal = this.minHeap.values;
      let maxVal = this.maxHeap.values;
      // median value is the avg the two roots. 
      // if data set length is odd, median value is the root of the maxHeap
      if(minVal.length === maxVal.length){
          return (minVal[0] + maxVal[0]) / 2
      } else {
          return maxVal[0];
      }
  }
};

/*

BELOW ARE OUR MIN & MAX HEAP CLASSES

*/

class MaxHeap {
  constructor(){
      this.values = [];
  } 

  insert(element){
      this.values.push(element);
      this.bubbleUp();
  }

  bubbleUp(){

      let index = this.values.length - 1;
      const element = this.values[index];

      while (index > 0){

          let parentIndex = Math.floor((index - 1 ) / 2);
          let parent = this.values[parentIndex];

          if(parent >= element) break;

          this.values[index] = parent;
          this.values[parentIndex] = element;

          index = parentIndex;
      }
  }

  remove(){
      let max = this.values[0];
      let end = this.values.pop();

      if (this.values.length > 0){
          this.values[0] = end;
          this.bubbleDown();
      }
      return max;
  }

  bubbleDown(){
      
      let index = 0;
      const element = this.values[0];
      let length = this.values.length;

      while(true){

          let leftChildIndex = (2 * index) + 1;
          let rightChildIndex = (2 * index) + 2;
          let swap = null;
          let leftChild, rightChild;

          if (leftChildIndex < length){
              leftChild = this.values[leftChildIndex];

              if(leftChild > element){
                  swap = leftChildIndex;
              }
          } 

          if (rightChildIndex < length){
              rightChild = this.values[rightChildIndex];

              if(!swap && rightChild > element || swap && rightChild > leftChild){
                  swap = rightChildIndex;
              }
          }

          if (!swap) break;

          this.values[index] = this.values[swap];
          this.values[swap] = element;

          index = swap;
      }
  }
}

class MinHeap {
  constructor(){
      this.values = [];
  } 

  insert(element){
      this.values.push(element);
      this.bubbleUp();
  }

  bubbleUp(){

      let index = this.values.length - 1;
      const element = this.values[index];


      while( index > 0 ) {
          let parentIndex = Math.floor( (index - 1) / 2);
          let parent = this.values[parentIndex];

          if (parent <= element) break;

          this.values[parentIndex] = element;
          this.values[index] = parent;

          index = parentIndex;
      }
  }

  remove(){
      let min = this.values[0];
      let end = this.values.pop();

      if (this.values.length > 0){
          this.values[0] = end;
          this.bubbleDown();
      }
      return min;
  }

  bubbleDown(){
      
      let index = 0;
      const element = this.values[0];
      let length = this.values.length;

      while(true){

          let leftChildIndex = (2 * index) + 1;
          let rightChildIndex = (2 * index) + 2;
          let swap = null;
          let leftChild, rightChild;

          if (leftChildIndex < length){
              leftChild = this.values[leftChildIndex];

              if(leftChild < element){
                  swap = leftChildIndex;
              }
          } 

          if (rightChildIndex < length){
              rightChild = this.values[rightChildIndex];

              if(!swap && rightChild < element || swap && rightChild < leftChild){
                  swap = rightChildIndex;
              }
          }

          if (!swap) break;

          this.values[index] = this.values[swap];
          this.values[swap] = element;

          index = swap;
      }
  }
}


































/* 

  approach #4 - multiset and 2 pointers

  binary search 

  o(n) addNum
  o(1) findMedian 

*/ 

 
class MedianFinder {
    constructor() {
        // set up array
        this.arr = [];
    }
	
    /**
     * @param {number} num
     * @return {void}
     */
    addNum(num) {
        // check if array is size 0, just push
        if (this.arr.length === 0) {
            this.arr.push(num);
            return;
        }
		
        // left and right pointers for binary search
        let l = 0;
        let r = this.arr.length;
		
        // keep going until pointers meet
        while (l < r) {
            // get mid point
            const mid = Math.floor((l + r) / 2);
            // check if we can insert at mid
            if (num > this.arr[mid]) {
                // search right half of array
                l = mid + 1;
            } else {
                // search left half of array
                r = mid;
            }
        }
		
        // we can insert at left pointer
        this.arr.splice(l, 0, num);
    }
	
    /**
     * @return {number}
     */
    findMedian() {
        // if odd, return middle, if even, return avg of two middle
        const mid = Math.floor(this.arr.length / 2);
        return (this.arr.length & 1) === 1
            ? this.arr[mid]
            : (this.arr[mid] + this.arr[mid - 1]) / 2;
    }
}







/* 

  O(log n) + O(1) binarySearch minHeap

*/


/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
    this.arr = [];
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    const bs = n => {
        let start = 0;
        let end = this.arr.length;
        while (start < end){
            let mid = Math.floor((start+end)/2);
            if (n > this.arr[mid]) start = mid+1;
            else end = mid;
        }
        this.arr.splice(start,0,n);
    }
    if (this.arr.length === 0) this.arr.push(num);
    else bs(num);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    const mid = Math.floor(this.arr.length/2);
    return (this.arr.length%2===0) ? (this.arr[mid-1]+this.arr[mid])/2 : this.arr[mid];
};

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */