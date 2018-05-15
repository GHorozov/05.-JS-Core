function separateNagativeAndPositiveNumbers(arr) {
    let list = [];
    for (let i = 0; i < arr.length; i++) {
        let number = Number(arr[i]);
        if(number >= 0){
            list.push(number); //add at the end
        }else{
            list.unshift(number); //add at the begining
        }
    }

    console.log(list.join('\n'));
}

separateNagativeAndPositiveNumbers([1, -2, -3, -3, 4, 5, 6, 9, 0]);