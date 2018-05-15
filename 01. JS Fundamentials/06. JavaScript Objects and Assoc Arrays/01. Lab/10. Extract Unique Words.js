function extractUniqueWords(arr) {
    let result = new Set();
    for (let line of arr) {
        let currentWords = line.toLowerCase().split(/\W+/g).filter(x => x!== '');
        for (let word of currentWords) {
            result.add(word);
        }
    }

    console.log([...result.values()].join(', '));
}

extractUniqueWords([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit dui.',
    'Quisque fringilla est urna, vitae efficitur urna vestibulum fringilla.',
    'Vestibulum dolor diam, dignissim quis varius non, fermentum non felis.',
    'Vestibulum ultrices ex massa, sit amet faucibus nunc aliquam ut.',
    'Morbi in ipsum varius, pharetra diam vel, mattis arcu.',
    'Integer ac turpis commodo, varius nulla sed, elementum lectus.',
    'Vivamus turpis dui, malesuada ac turpis dapibus, congue egestas met'
]);