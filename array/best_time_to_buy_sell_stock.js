/* 

  You are given an array prices where prices[i] is the price of a given stock on the ith day.

  You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

  Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

  

  Example 1:

  Input: prices = [7,1,5,3,6,4]
  Output: 5
  Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
  Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
  Example 2:

  Input: prices = [7,6,4,3,1]
  Output: 0
  Explanation: In this case, no transactions are done and the max profit = 0.
  

  Constraints:

  1 <= prices.length <= 105
  0 <= prices[i] <= 104

*/ 


/* 


  approach #1 - brute force 

  -- time limit exceeded 

    time: o(1)
    space: o(1)


*/ 


const maxProfit = (prices) => {
 
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      let profit = prices[j] - prices[i];
      if (profit > maxProfit) {
        maxProfit = profit;
      }
    }
  }

  return maxProfit; 
};

/* 

  approach #2 - one pass  

  O(n)

  Runtime: 140 ms, faster than 12.86% of JavaScript online submissions for Best Time to Buy and Sell Stock.
  Memory Usage: 48.7 MB, less than 73.36% of JavaScript online submissions for Best Time to Buy and Sell Stock.

  We always keep track of the minimum value. If we were to store this in an array, this is what it would look like:
 
  Input: [7,1,5,3,6,4]
  Min Array: [7,1,1,1,1,1]
 
  We then find the max profit of the day by taking the difference of the price of that day and the minimum seen so far.
 
  MaxP Array: [0, 0, 4, 2, 5, 3]
 
  Here we can see the maximum profit is 5. (6 - 1)

*/ 

const maxProfit = (prices) => {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let price of prices) {
    maxProfit = Math.max(maxProfit, price - minPrice);
    minPrice = Math.min(minPrice, price);
  }

  return maxProfit;
};


/* 

  approach #3

  Runtime: 108 ms, faster than 41.72% of JavaScript online submissions for Best Time to Buy and Sell Stock.
  Memory Usage: 48.7 MB, less than 59.60% of JavaScript online submissions for Best Time to Buy and Sell Stock

*/ 

var maxProfit = function(prices) {

  let min = Number.MAX_SAFE_INTEGER; 
  let profit = 0;
  
  for(let i=0; i < prices.length - 1 ; i++) {
    min = Math.min(prices[i], min);
    if(prices[i+1] - min > profit) {
        profit = prices[i+1] - min; 
    }
  }

  return profit
};

/* 

  approach #4

  Runtime: 108 ms, faster than 12.72% of JavaScript online submissions for Best Time to Buy and Sell Stock.

*/ 

var maxProfit = function(prices) {

  //define buying price and selling price. Initially 1st day price will be the buying and selling price
  
  var buyingPrice = prices[0];
  var sellingPrice = prices[0];
  var res = 0;
  
  for(let i = 1; i < prices.length; i++){
      
    if(prices[i] < buyingPrice){
      buyingPrice = prices[i];  // as you you must buy before sell, so, for specific day, buying price is also selling price.
      sellingPrice = prices[i];
    }

    if(prices[i] > buyingPrice){
      sellingPrice = prices[i]; // if price increases, that would be the selling price.
    }
    
    if(sellingPrice - buyingPrice > res) {
      res = sellingPrice - buyingPrice; //track the maximum profit
    }
  }
  
  return res;
};




/* 

  approach #5 

*/ 

var maxProfit = function(prices) {
  
  if(!prices || prices.length === 1){
      return 0;
  }

  let buying_price = prices[0];
  let profit = 0;
  
  for(let i = 0;i < prices.length;i++){
    if(prices[i] < buying_price){
        buying_price = prices[i];
    } else {
        profit = Math.max(profit, prices[i] - buying_price);
    }
  }

  return profit
};
