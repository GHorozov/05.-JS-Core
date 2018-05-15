function printArrayWithDelimiter(arr) {
    let delimiter = arr[arr.length-1];
    let slicedArr = arr.slice(0, arr.length-1);

    let result = slicedArr.join(delimiter);
    console.log(result);
}

printArrayWithDelimiter(['One', 'Two', 'Three', 'Four', 'Five', '-']);

