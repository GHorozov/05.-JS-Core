function concatenateAndReverse(arr) {
    let result = Array.from(arr.join(''))
                    .reverse()
                    .join('');

    console.log(result);
}

concatenateAndReverse(['I', 'am', 'student']);
concatenateAndReverse(['race', 'car']);