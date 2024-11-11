/**
 * @param {number[]} nums
 * @return {number}
 */
nums = [2,2,1,1,1,2,2]
var majorityElement = function(nums) {
    let candidate = 0;
    let count = 0;
    for (let num of nums) {
        if(count === 0 ){
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;   
    }
    return candidate;
};
console.log(majorityElement(nums));