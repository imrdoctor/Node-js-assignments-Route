
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function(arr, k) {
     let current = 1; 
    let missingCount = 0; 
    let index = 0; 
    
    while (missingCount < k) {
        if (index < arr.length && arr[index] === current) {
            index++;
        } else {
            missingCount++;
            if (missingCount === k) {
                return current; 
            }
        }
        current++; 
    }
    
   
    return current - 1; 
};
