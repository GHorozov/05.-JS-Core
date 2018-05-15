function wordsToUpperCase(word) {
    console.log(word.toUpperCase()
        .split(/\W+/)
        .filter(w => w !== '')
        .join(', '));
}

wordsToUpperCase('Hi, how are you?');