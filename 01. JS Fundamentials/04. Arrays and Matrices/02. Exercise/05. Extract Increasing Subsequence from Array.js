function takeIncreasingSubSequence(arr) {
    let maxNumber = Number.NEGATIVE_INFINITY;
    let newList = [];
    for (let i = 0; i < arr.length; i++) {
        let currentNum = arr[i];

        if(currentNum >= maxNumber){
            newList.push(currentNum);
            maxNumber = currentNum;
        }
    }

    return newList.join('\n');
}

console.log(takeIncreasingSubSequence([1, 3, 8, 4, 10, 12, 3, 2, 24]));