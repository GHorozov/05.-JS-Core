function printSequance(n, k) {
    let arr = [];
    arr[0]= 1;

    let sum;
    for (let i = 1; i < n; i++) {
        let lastKElements = arr.slice(Math.max(0, arr.length - k),  i+k);
        sum = lastKElements.reduce((a,b) => a+b);
        arr.push(sum);
    }

    console.log(arr.join(' '));
}

printSequance(6, 3);