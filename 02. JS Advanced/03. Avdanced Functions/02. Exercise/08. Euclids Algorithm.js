function findGratestCommonDevisor(a, b) {
  let temporary = 0;

    while(b !== 0){
        temporary = b;
        b = a % b;
        a = temporary;
    }

    return a;
}

//II-way
// function returnGreatestCommonDevisor(a, b) {
//     return b === 0 ? a : euclidsAlgorithm(b, (a % b));
// }

console.log(findGratestCommonDevisor(252, 105));
console.log(findGratestCommonDevisor(6, 3));
console.log(findGratestCommonDevisor(5749443, 131857943));
