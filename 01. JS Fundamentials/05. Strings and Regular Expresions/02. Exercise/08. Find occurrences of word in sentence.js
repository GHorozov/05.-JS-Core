function findWordCount(text, word) {
    let match = text.match(new RegExp(`\\b${word}\\b`, 'gi'));

    return match === null ? 0 : match.length;
}

console.log(findWordCount('The waterfall was so high, that the child couldn’t see its peak.', 'the'));

console.log(findWordCount('How do you plan on achieving that? How? How can you even think of that?', 'how'));

console.log(findWordCount('There was one. Therefore I bought it. I wouldn’t buy it otherwise.', 'there'));