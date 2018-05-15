function takeTwoSmallestNumbers(arr) {
    console.log(arr.sort((a,b) => a-b).slice(0,2));
}

takeTwoSmallestNumbers([30, 15, 50, 5]);
takeTwoSmallestNumbers([3, 0, 10, 4, 7, 3]);