function solve(arr) {

    let closure = (function () {
        let str = '';
        return {
            append: (inputString) => str += inputString,
            removeStart: (n) => str = str.substr(n),
            removeEnd: (n) => str = str.substr(0, str.length - n),
            print: () => console.log(str)
        }
    })();

    for (let st of arr) {
        let parts = st.split(' ');
        let comandInput = parts[0];
        let valueInput = parts[1];
        closure[comandInput](valueInput);
    }
}

solve(
    [
        'append hello',
        'append again',
        'removeStart 3',
        'removeEnd 4',
        'print'
    ]
);