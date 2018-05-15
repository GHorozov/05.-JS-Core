function matchAllWords(text) {
    let pattern = /\w+/g;
    let arr = text.match(pattern);

    console.log(arr.join('|'));
}

//matchAllWords('A Regular Expression needs to have the global flag in order to match all occurrences in the text');

matchAllWords('_(Underscores) are also word characters');