/* 

  Given a string s, return the number of palindromic substrings in it.

  A string is a palindrome when it reads the same backward as forward.

  A substring is a contiguous sequence of characters within the string.

  

  Example 1:

  Input: s = "abc"
  Output: 3
  Explanation: Three palindromic strings: "a", "b", "c".
  Example 2:

  Input: s = "aaa"
  Output: 6
  Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
  

  Constraints:

  1 <= s.length <= 1000
  s consists of lowercase English letters.

*/ 


/* 

  approach #1 - check all substrings 


  time:  O(n^3)
    for input string of length NN. Since we just need to traverse every substring once, the total time taken is sum of the length of all substrings.

  space: O(1)
    no need to allocate extra space since we;re repeatedly iterating on the input string itself 

*/ 










/* 

  approach #2 - dynamic programming 

  time:  O(n^2)
    for input string of length NN. The number of dynamic programming states that need to calculated is the same as the number of substrings i.e. {N \choose 2} = N(N-1)/2(2N)=N(N−1)/2. Each state can be calculated in con

  space: O(n^2)
    for an input string of length NN. We need to allocate extra space to hold all N \choose 2(2N) dynamic programming states.

*/ 

var countSubstrings = function(s) {
  
  //dp[i][j] -> is s[i:j] a palindromic string (including s[i] and s[j])

  var dp = [];
  for(var i = 0; i < s.length; i++) {
      dp[i] = Array(s.length).fill(false);
  }

  var result = 0;
  //Note that dp[i][j] came from dp[i + 1][j - 1]
  //so the loop for i is from s.length - 1 to 0
  //the loop for j is i to s.length - 1
  for(var i = s.length - 1; i >= 0; i--) {
      for(var j = i; j < s.length; j++) {
          //when s[i] === s[j], there are 3 cases
          //case1: j == i,  i.e. 'a', dp[i][j] = true
          //case2: j - 1 == 1, i.e. 'aa', dp[i][j] = true
          //case2: 'a***a' dp[i][j] = dp[i + 1][j - 1]
          if(s[i] === s[j] && (j - i <= 1 || dp[i + 1][j - 1])) {
              dp[i][j] = true;
              result++
          }
      }
  }

  return result;
};

/* v.2 */ 

var countSubstrings = function(s) {
  // count of palindromic substrings
  let count = 0;
  // dp array (size of string) (filled with 0s initially)
  const dp = [...Array(s.length)].map((e) => Array(s.length).fill(0));
  // outer loop is to go through all substring lengths
  for (let l = 0; l < s.length; l++) {
      // inner loop is to get all substrings of those lengths
      for (let i = 0; i + l < s.length; i++) {
          // get j, which is left pointer plus length
          const j = i + l;
          if (l === 0) {
              // this means we're on the diagonal, everything is palindrome
              dp[i][j] = 1;
              count++;
          }
          else if (l === 1) {
              // only check if characters at end are same
              if (s.charAt(i) === s.charAt(j)) {
                  dp[i][j] = 1;
                  count++;
              }
          }
          else {
              // check if characters at ends are equal
              // AND check if substring in between them is palindrome
              if (s.charAt(i) === s.charAt(j) &&
                  dp[i + 1][j - 1] === 1) {
                  dp[i][j] = 1;
                  count++;
              }
          }
      }
  }
  return count;
};



/* 

  approach #3 - expand around possible centers 

  time:  O(n^2)
  space: O(n^2)

  Runtime: 64 ms, faster than 100.00% of JavaScript online submissions for Palindromic Substrings.
  Memory Usage: 40.3 MB, less than 47.02% of JavaScript online submissions for Palindromic Substrings.

*/ 


var countSubstrings = function(s) {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    total += expand(s, i, i);
    total += expand(s, i, i + 1);
  }
  return total;
};

function expand(s, l, r) {
  let count = 0;
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
    count++;
  }
  return count;
};



/* v.2 of ^ */


function countSubstrings(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    expand(i, i) // odd length
    expand(i, i + 1) // even length
  }
  return count

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++
      l--
      r++
    }
  }
}


/* v.3 another example of the 'fan-out' method 

  - A palindrome can start from a single letter
  - A single letter by itself is a palindrome
  - A palinfrome can start from two letters
  - So for this code, we are going from i to s.length - 1. Each time we are fanning out from the single letter, then from the double letter. Each time we find a new palindrome (it's the same forward and backwords), we add to our count.

  - For the last iterations where i === s.length - 1, it's important to point out that the double letter fan-out case will not happen since the while loop in fanOut will never execute.

*/


const countSubstrings = (s) => {
	let total = 0;

	for (var i = 0; i <= s.length - 1; i++) {
		// Single letter to fan out from
		total += fanOut(i, i, s);
		// Double letter to fan out from
		total += fanOut(i, i + 1, s);
	}

	return total;
};

const fanOut = (left, right, s) => {
	let count = 0;

	// Fanning out
	while (left >= 0 && right <= s.length - 1 && s[left] === s[right]) {
		count++;
		left--;
		right++;
	}

	return count;
};


/* 

Further Thoughts
Better approaches do exist to solve this problem in sub-quadratic time, however those are significantly complex and impractical to implement in most interviews.

Some known approaches are:

Binary Search with a fast rolling hash algorithm (like Rabin-Karp). This approach tries to optimize Approach #3 by speeding up the time to figure out the largest palindrome for each of the 2N-12N−1 centers in logarithmic time. This approach counts all palindromic substrings in O(N \log{N})O(NlogN) time. Here's a Quora answer by T.V. Raziman which explains this approach well.

Palindromic trees (also known as EERTREE). It is a data structure invented by Mikhail Rubinchik which links progressively larger palindromic substrings within a string. The tree construction takes linear time, and the number of palindromic substrings can be counted while constructing the tree in O(N)O(N) time. Additionally, the tree can be used to compute how many distinct palindromic substrings are in a string (it's just the number of nodes in the tree) and how frequently each such palindrome occurs. This blog post does a good job of explaining the construction of a palindromic tree.

Suffix Arrays with quick Lowest common Ancestor (LCA) lookups. This approach utilizes Ukonnen's algorithm to build suffix trees for the input string and its reverse in linear time. Subsequently, quick LCA lookups can be used to find maximum palindromes, which are themselves composed of smaller palindromes. This approach can produce a count of all palindromic substrings in O(N)O(N) time. The original paper describes the algorithm, and this Quora answer demonstrates an example.

Manacher's algorithm. It's basically Approach #3, on steroids.TM The algorithm reuses computations done for previous palindromic centers to process new centers in sub-linear time (which reduces progressively for each new center). This algorithm counts all palindromic substrings in O(N)O(N) time. This e-maxx post provides a fairly simple implementation of this algorithm.

*/ 