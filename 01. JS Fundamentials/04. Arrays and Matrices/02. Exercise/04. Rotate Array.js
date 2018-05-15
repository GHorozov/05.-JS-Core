function rotateArray(arr) {
    let rotations = arr.pop();

    for (let i = 0; i < rotations % arr.length; i++) {
        let lastElement = arr.pop();
        arr.unshift(lastElement);
    }

    return arr.join(' ');
}

//console.log(rotateArray([1, 2, 3, 4, 2]));
console.log(rotateArray(['Banana', 'Orange', 'Coconut', 'Apple', 15]));