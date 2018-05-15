function splitWithDelimiter(str, delimiter) {
    console.log(str.split(delimiter).join('\n'));
}

splitWithDelimiter('One-Two-Three-Four-Five', '-');

splitWithDelimiter('http://platform.softuni.bg', '.');