function notation(input) {
    let numbers = [];
    for (let item of input) {
        if(Number.isInteger(item)){
            numbers.push(Number(item));
        }else{
            if(numbers.length >= 2){
            let takeTwo = numbers.splice(numbers.length-2);

            if(item === '+') {
                numbers.push(takeTwo[0] + takeTwo[1]);
            }else if(item === '-'){
                numbers.push(takeTwo[0] - takeTwo[1]);
            }else if(item === '*'){
                numbers.push(takeTwo[0] * takeTwo[1]);
            }else if(item === '/'){
                numbers.push(takeTwo[0] / takeTwo[1]);
            }

            }else {
                return console.log('Error: not enough operands!');
            }
        }
    }

    if(numbers.length >= 2){
        console.log('Error: too many operands!')
    }
    else{
        console.log(numbers[0]);
    }
}

//notation([3, 4, '+']);

//notation([5, 3, 4, '*', '-']);
//
//notation([7, 33, 8, '-']);
//
// notation([31, 2, '+', 11, '/']);