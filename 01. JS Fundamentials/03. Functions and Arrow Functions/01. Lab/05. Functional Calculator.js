function calculatorFunction(a, b, c) {
    switch (c){
        case '+': return a+b;
        break;
        case '*': return a*b;
            break;
        case '/': return a/b;
            break;case '+': return a+b;
        break;
        case '-': return a-b;
            break;
    }
}

console.log(calculatorFunction(4, 6, '-'));