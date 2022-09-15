/* 
  
   approach #1
   
*/

var firstUniqChar = function(s) {
  for(let i = 0; i < s.length; i++) {
		 // Here we check to see if the index of the character can be found anywhere else
		 // If it is indeed unique, it would only be found at the same index i
     if(s.lastIndexOf(s[i]) === i && s.indexOf(s[i]) === i) {
        return i;
     }
   } 
   return -1;
};

/* 
  
   approach #2
   
*/

var firstUniqChar = function(s) {
  if (!s) return -1;
	if (s.length === 1) return 0;
    for (var i = 0; i < s.length; i++) {
        if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
            return i;
        }
    }
    return -1;
};
