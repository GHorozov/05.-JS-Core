function makeTag(elements) {
    let location = elements[0];
    let text = elements[1];

    console.log(`<img src="${location}" alt="${text}">`);
}

makeTag(['smiley.gif', 'Smiley Face']);