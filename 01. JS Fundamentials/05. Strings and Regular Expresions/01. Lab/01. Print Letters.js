function printletters(str) {
    // for (let letter in str) {
    //     console.log(`str[${letter}] -> ${str[letter]}`);
    // }

    let result = Array
                .from(str)
                .map((st, i) => `str[${i}] -> ${st}`).join('\n');

    console.log(result);
}

printletters('Hello, World!');