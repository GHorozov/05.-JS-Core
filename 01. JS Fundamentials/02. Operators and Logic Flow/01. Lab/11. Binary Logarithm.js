function calcLogs(array) {
    for (let index in array) {
        console.log(Math.log2(array[index]))
    }
}

calcLogs(1,2,3);