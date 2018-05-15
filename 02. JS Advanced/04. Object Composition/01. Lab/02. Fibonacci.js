function fibonachi() {
    let a = 0;
    let b = 1;
    function calc() {
        let result = a+b;
        a = b;
        b = result;

        return a;
    }
    return calc;
}

let res = fibonachi()
console.log(res());
console.log(res());
console.log(res());
console.log(res());
console.log(res());
console.log(res());
