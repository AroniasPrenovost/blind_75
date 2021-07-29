/* 

  Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

  explanation #2: Given two numbers ‘a’ and b’. Write a program to count number of bits needed to be flipped to convert ‘a’ to ‘b’. 
  
  *Note that in some languages, such as Java, there is no unsigned integer type. In this case, the input will be given as a signed integer type. It should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
  In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 3, the input represents the signed integer. -3.


  Example 1:

    Input: n = 00000000000000000000000000001011
    Output: 3
    Explanation: The input binary string 00000000000000000000000000001011 has a total of three '1' bits.
    Example 2:

    Input: n = 00000000000000000000000010000000
    Output: 1
    Explanation: The input binary string 00000000000000000000000010000000 has a total of one '1' bit.
    Example 3:

    Input: n = 11111111111111111111111111111101
    Output: 31
    Explanation: The input binary string 11111111111111111111111111111101 has a total of thirty one '1' bits.
 

Constraints:

The input must be a binary string of length 32.
 

  Follow up: If this function is called many times, how would you optimize it?


*/



/* 



   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators


*/ 


/* 

  The Hamming weight of a string is the number of symbols that are different from the zero-symbol of the alphabet used. It is thus equivalent to the Hamming distance from the all-zero string of the same length. For the most typical case, a string of bits, this is the number of 1's in the string, or the digit sum of the binary representation of a given number and the ℓ₁ norm of a bit vector. In this binary case, it is also called the population count,[1] popcount, sideways sum,[2] or bit summation.[3]

*/


/* 

  approach #1 
  
  Runtime: 100 ms, faster than 28.81% of JavaScript online submissions for Number of 1 Bits.
  Memory Usage: 39.9 MB, less than 59.32% of JavaScript online submissions for Number of 1 Bits.

*/

// from a collection of bit twiddling hacks: https://graphics.stanford.edu/~seander/bithacks.html
// only works for 32-bit integers (a limitation of bitwise operators in JavaScript).
var bitCount = function(n) {
  n = n - ((n >> 1) & 0x55555555); 
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333); 
  return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24; 
};


/* 

  approach #2
  
  // returns correct values in tests, but exceeds leetcode time limit 

*/


var bitCount = function(n) {
  var count = 0;
  while (n) {                  // until all bits are zero
    count += n & 1;            // & counts common bits
    n >>= 1;                   // right shift assignment, removing lower bit 
  }
  return count;
};

/* 

  approach #3 - regular expression ( best approach )

  Runtime: 88 ms, faster than 81.67% of JavaScript online submissions for Number of 1 Bits.
  Memory Usage: 40.3 MB, less than 25.00% of JavaScript online submissions for Number of 1 Bits.

  * An optional argument that specifies the radix, or base, between 2 and 36, in which the number should be represented. If omitted, base 10 is used. Note, however, that the ECMAScript specification allows an implementation to return any value if this argument is specified as any value other than 10.

*/ 

var bitCount = function(n) {
  // use toString()' optional *radix argument 
  let v = n.toString(2).match(/1/g);
  if (v && v.length) {
    return v.length; 
  } else {
    return 0
  }
}

console.log(bitCount(0xFF)) //=> 8
console.log(bitCount(255)) //=> 8
console.log(bitCount(9)) //=> 2
