function aggregateElement(arr) {
    aggregateFunc(0, (a, b) => {return a+b});
    aggregateFunc(0, (a, b) => {return a+1 / b});
    aggregateFunc('', (a, b) => {return a+b});
    
    function aggregateFunc(initialValue, arrow) {
        for (let i = 0; i < arr.length; i++) {
            initialValue = arrow(initialValue, arr[i]);
        }

        console.log(initialValue);
    }
}

aggregateElement([1,2,3]);