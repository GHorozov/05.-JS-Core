function extractNumbers(arr) {
    let pattern = /[0-9]+/g;
    let result = [];

    //I - way
    // for (let i = 0; i < arr.length; i++) {
    //     let match = pattern.exec(arr[i]);
    //     while (match) {
    //         result += match + ' ';
    //         match = pattern.exec(arr[i]);
    //     }
    // }

    //II - way
    let arr2 = arr.split('\n');
    for (let word of arr2) {
        let match = word.match(pattern);
        if(match === null )continue;
        result.push(match);
    }



    let finalResut= [];
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            finalResut.push(result[i][j]);
        }
    }

    console.log(finalResut.join(' '));
}


// extractNumbers('The300\n' +
//     'What is that?\n' +
//     'I think it’s the 3rd movie.\n' +
//     'Lets watch it at 22:45\n');

// extractNumbers('123a456\n' +
//                '789b987\n' +
//                '654c321\n' +
//                '0\n');

extractNumbers('Let’s go11!!!11!\n' +
    'Okey!1!\n');