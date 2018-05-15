function countWords(arr) {
    let result ={};

    for (let el of arr) {
        let currentWord = el.split(/[^0-9a-zA-Z_]+/g)
            .filter(x => x != '');

        for (let word of currentWord) {
            if (result.hasOwnProperty(word)) {
                result[word]++;
            } else {
                result[word] = 1;
            }
        }
    }

    console.log(JSON.stringify(result));
}

//countWords(['Far too slow, you\'re far too slow.']);

countWords(['JS devs use Node.js for server-side JS.-- JS for devs'])