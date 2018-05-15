function calcQuadraticEquation(a, b, c) {
    let d = (b**2) - 4*a*c;

    if(d < 0){
        return 'no';
    }
    else if(d === 0){
        return -b / (2*a);
    }
    else{
        let x1 = (-b + Math.sqrt(d)) / (2*a);
        let x2 = (-b - Math.sqrt(d)) / (2*a);

        let smallRoot = Math.min(x1,x2);
        let maxRoot = Math.max(x1,x2);

        return `${smallRoot}\n${maxRoot}`;
    }
}

console.log(calcQuadraticEquation(6, 11, -35));
console.log('-------------------')
console.log(calcQuadraticEquation(1, -12, 36));
console.log('-------------------')
console.log(calcQuadraticEquation(5, 2, 1));
