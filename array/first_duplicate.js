/* 

  Given an array a that contains only numbers in the range from 1 to a.length, find the first duplicate number for which the second occurrence has the minimal index. In other words, if there are more than 1 duplicated numbers, return the number for which the second occurrence has a smaller index than the second occurrence of the other number does. If there are no such elements, return -1.

  Example

  For a = [2, 1, 3, 5, 3, 2], the output should be solution(a) = 3.

*/

function solution(a) {
    var uniqueNumbers = [];
    for(var i = 0 ; i < a.length; i++) {
        if(uniqueNumbers.includes(a[i])){
            return a[i];
        }
        uniqueNumbers.push(a[i]);
    }
    return -1;
}
