/* 

  Reverse bits of a given 32 bits unsigned integer.

  Note:

  Note that in some languages such as Java, there is no unsigned integer type. In this case, both input and output will be given as a signed integer type. They should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
  In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 2 above, the input represents the signed integer -3 and the output represents the signed integer -1073741825.
  Follow up:

  If this function is called many times, how would you optimize it?

  

  Example 1:

  Input: n = 00000010100101000001111010011100
  Output:    964176192 (00111001011110000010100101000000)
  Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.
  Example 2:

  Input: n = 11111111111111111111111111111101
  Output:   3221225471 (10111111111111111111111111111111)
  Explanation: The input binary string 11111111111111111111111111111101 represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is 10111111111111111111111111111111.
  

  Constraints:

  The input must be a binary string of length 32

*/ 


/* 

  approach #1 - bit by bit 

  Runtime: 80 ms, faster than 98.77% of JavaScript online submissions for Reverse Bits.
  Memory Usage: 40.2 MB, less than 78.19% of JavaScript online submissions for Reverse Bits.



*/ 

var reverseBits = function(n) {
  
  let res = 0;
  let pow = 31;
  
  while (n > 0) {
      let rightMost = n & 1;
      res = res + (rightMost << pow);
      pow--;
      n = n >>> 1;
  }

  // take negative into positive
  return res >>> 0;
  
};

// bit by bit #2 ( slower ) 

var reverseBits = function(n) {
  const bits = new Array(32).fill(0);
  let idx = 1;
  while (n) {
      bits[32 - idx++] = n % 2;
      n = Math.floor(n / 2);
  }
  return parseInt(bits.reverse().join(''), 2);
};


// bit by bit #3

var reverseBits = function(n) {
  let binary = n.toString(2);
 const appendingZeros = 32 - binary.length;
 for (let index = 0; index < appendingZeros; index++) {
   binary = "0" + binary;
 }
 return parseInt(binary.split("").reverse("").join(""), 2);
};


/* 

  bit by bit #4

  Runtime: 96 ms, faster than 57.20% of JavaScript online submissions for Reverse Bits.
  Memory Usage: 40.3 MB, less than 58.64% of JavaScript online submissions for Reverse Bits.

*/


var reverseBits = function(n) {
   var sum = 0; 
    for(var i = 0;i < 32; i ++){
      /*like 'pick up digit' at Decimal arithmetic */
      var d = n % 2;
      sum = sum * 2 + d;
      n = (n-d) / 2;
    }

    return sum;
};


/*

 approach #2 - Byte by Byte with Memoization

*/





 
/* 

 approach #3 - Mask & Shift 



*/ 

 