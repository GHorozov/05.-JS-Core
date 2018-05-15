function findEvenElement(arr) {
    return arr.filter((element, index) => {return index % 2 == 0})
        .join(' ');
}

console.log(findEvenElement(['20', '30', '40', 1, 3, 7, 9]));