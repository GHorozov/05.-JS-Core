function sortArray(arr, format) {
    if(format === 'asc'){
        return arr.sort((a,b) => a-b);
    }else if(format === 'desc'){
        return arr.sort((a,b) => b-a);
    }
}

console.log(sortArray([14, 7, 17, 6, 8], 'asc'));
console.log(sortArray([14, 7, 17, 6, 8], 'desc'));