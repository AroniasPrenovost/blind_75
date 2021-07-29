/* 

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

 

Example 1:

Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
Example 3:

Input: coins = [1], amount = 0
Output: 0
Example 4:

Input: coins = [1], amount = 1
Output: 1
Example 5:

Input: coins = [1], amount = 2
Output: 2
 

Constraints:

1 <= coins.length <= 12
1 <= coins[i] <= 231 - 1
0 <= amount <= 104

*/ 


/* 

  approach #1 - Brute Force

  ** time exceeded 

*/



var coinChange = function (coins, amount) {
  if (amount == null || amount == 0) return 0;
  if (coins == null || coins.length == 0) return -1;

  function traverse(currSum) {
      if (currSum == 0) return [];
      if (currSum < 0) return false;

      let shortestWay = null;//cannot initialize with [] , it will always be shortest

      for (let i = 0; i < coins.length; i++) {
          let remainderResult = traverse(currSum - coins[i]);
          if (remainderResult) {
              let combination = [...remainderResult, coins[i]];

              if (shortestWay == null || shortestWay.length > combination.length) {
                  shortestWay = combination;
              }
          }
      }
      return shortestWay;
  }
  let bestWay = traverse(amount);
  console.log(bestWay)

  return bestWay?.length ? bestWay.length : -1;
};


/* 

  approach #2 - (Dynamic programming - Top down) memoization

  Runtime: 236 ms, faster than 21.04% of JavaScript online submissions for Coin Change.
  Memory Usage: 44.6 MB, less than 39.64% of JavaScript online submissions for Coin Change.

*/

var coinChange = function(coins, amount, dp={}) {
  let min = Infinity;
  let count;
  if (amount in dp) return dp[amount];
  if (amount < 0) return -1;
  if (amount==0) return 0;
  for (let coin of coins) {
    count = coinChange(coins, amount-coin, dp);
    if (count != -1) min = Math.min(min, 1 + count);
  }
  return (min === Infinity) ? dp[amount]=-1 : dp[amount]=min; 
};


/* 

  approach #3 - (Dynamic programming - Bottom up) 

  Runtime: 108 ms, faster than 95.53% of JavaScript online submissions for Coin Change.
  Memory Usage: 44.2 MB, less than 56.00% of JavaScript online submissions for Coin Change.

*/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
 var coinChange = function(coins, amount) {
  //SORT SO THAT WE CAN SKIP NEGATIVE AMOUNT VALUES IN FUTURE
  coins.sort((a,b)=>a-b);
  
  let dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for(let i = 1; i <= amount;i++){

      for(let j = 0;j<coins.length;j++){
  
          if(i - coins[j] >=0){
              dp[i] = Math.min(dp[i], 1 + dp[i - coins[j]]);
          }else{
              break;
          }
      }
      
  }
  return dp[amount] !== Infinity ? dp[amount] : -1;
};