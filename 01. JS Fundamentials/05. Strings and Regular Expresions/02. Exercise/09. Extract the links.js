function extractTheLinks(arr) {
    //let regex = /www\.[A-Za-z0-9-]+(\.[a-z]+)+/g;

    //First way
    // let links = [];
    //
    // for (let sentence of arr.split('\n')) {
    //     let match = regex.exec(sentence);
    //     while (match) {
    //         links.push(match[0]);
    //         match = regex.exec(sentence);
    //     }
    // }
    //
    // console.log(links.join('\n'))

    //Second way
    // let match = arr.match(regex);
    //
    // console.log(match.join('\n'));

    //Third way
    let pattern = /w{3}\.[A-Za-z0-9\-]+(\.[a-z]+)+/g;
    let links = [];
    for (let i = 0; i < arr.length; i++) {
        let match = pattern.exec(arr[i]);
        while (match) {
            links.push(match[0]);
            match = pattern.exec(arr[i]);
        }
    }

    return links.join('\n');
}

extractTheLinks('Join WebStars now for free, at www.web-stars.com\n' +
    'You can also support our partners:\n' +
    'Internet - www.internet.com\n' +
    'WebSpiders - www.webspiders101.com\n' +
    'Sentinel - www.sentinel.-ko \n');

extractTheLinks('Need information about cheap hotels in London?\n' +
    'You can check us at www.london-hotels.co.uk!\n' +
    'We provide the best services in London.\n' +
    'Here are some reviews in some blogs:\n' +
    '"London Hotels are awesome!" - www.indigo.bloggers.com\n' +
    '"I am very satisfied with their services" - ww.ivan.bg\n' +
    '"Best Hotel Services!" - www.rebel21.sedecrem.moc \n');