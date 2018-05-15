function operationsOnNumber(arr) {
    let number = arr[0];

    for (let i = 1; i < arr.length; i++) {
        let op = arr[i].toLowerCase();

        number = op === 'chop' ? number / 2
            : op === 'dice' ? Math.sqrt(number)
                : op === 'spice' ? number + 1
                    : op === 'bake' ? number * 3
                        : op === 'fillet' ? number * 0.8
                            : 'Error!';

        console.log(number);
    }
}

operationsOnNumber([32, 'chop', 'chop', 'chop', 'chop', 'chop']);