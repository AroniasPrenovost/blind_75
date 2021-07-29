/* 

  Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

  Machine 1 (sender) has the function:

  string encode(vector<string> strs) {
    // ... your code
    return encoded_string;
  }
  Machine 2 (receiver) has the function:
  vector<string> decode(string s) {
    //... your code
    return strs;
  }
  So Machine 1 does:

  string encoded_string = encode(strs);
  and Machine 2 does:

  vector<string> strs2 = decode(encoded_string);
  strs2 in Machine 2 should be the same as strs in Machine 1.

  Implement the encode and decode methods.

  You are not allowed to solve the problem using any serialize methods (such as eval).

  

  Example 1:

  Input: dummy_input = ["Hello","World"]
  Output: ["Hello","World"]
  Explanation:
  Machine 1:
  Codec encoder = new Codec();
  String msg = encoder.encode(strs);
  Machine 1 ---msg---> Machine 2

  Machine 2:
  Codec decoder = new Codec();
  String[] strs = decoder.decode(msg);
  Example 2:

  Input: dummy_input = [""]
  Output: [""]
  

  Constraints:

  1 <= strs.length <= 200
  0 <= strs[i].length <= 200
  strs[i] contains any possible characters out of 256 valid ASCII characters.
  

  Follow up: Could you write a generalized algorithm to work on any possible set of characters?

*/ 


/* 

  Approach #1: Non-ASCII Delimiter

  Naive solution here is to join strings using delimiters.

  Runtime: 104 ms, faster than 52.38% of JavaScript online submissions for Encode and Decode Strings.
  Memory Usage: 45 MB, less than 55.95% of JavaScript online submissions for Encode and Decode Strings.

*/ 


/* Encodes a list of strings to a single strings. */
var encode = function(strs) {
  let sb = [];
  for (let str of strs) {
   sb.push(str.length);
   sb.push('/');
   sb.push(str);
 }
 return sb.join('');
};

/* Decodes a single string to a list of strings. */
var decode = function(s) {
   let res = [];
   let i = 0;
  while (i < s.length) {
       let slash = s.indexOf('/', i);
       let len = parseInt(s.substring(i, slash));
       let str = s.substring(slash + 1, slash + 1 + len);
       res.push(str);
       i = slash + 1 + len;
   }
   return res;
};


/* 

  Approach #2: Chunked Transfer Encoding 

  Transfer-Encoding
  The Transfer-Encoding header specifies the form of encoding used to safely transfer the payload body to the user.

  Note
  HTTP/2 doesn't support HTTP 1.1's chunked transfer encoding mechanism, as it provides its own, more efficient, mechanisms for data streaming.

  Transfer-Encoding is a hop-by-hop header, that is applied to a message between two nodes, not to a resource itself. Each segment of a multi-node connection can use different Transfer-Encoding values. If you want to compress data over the whole connection, use the end-to-end Content-Encoding header instead.

  When present on a response to a HEAD request that has no body, it indicates the value that would have applied to the corresponding GET message.

  Transfer-Encoding: chunked
  Transfer-Encoding: compress
  Transfer-Encoding: deflate
  Transfer-Encoding: gzip
  Transfer-Encoding: identity

*/


/* Encodes a list of strings to a single strings. */
var encode = function(strs) {

};

/* Decodes a single string to a list of strings. */
var decode = function(s) {

};
