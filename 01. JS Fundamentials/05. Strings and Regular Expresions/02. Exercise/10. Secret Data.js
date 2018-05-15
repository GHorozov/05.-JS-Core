function secretData(text) {
    //first way
    // let clientNamePattern = /\*[A-Z \t][a-z]*(?=\s|\t$)/gm;
    // let phoneNumberPattern = /\+[0-9\-]{10}(?=\t| |$)/gm;
    // let idPattern = /![A-Za-z0-9]+(?=\t| |$)/gm;
    // let secretBases= /_[A-Za-z0-9]+(?=\t| |$)/gm;
    //
    // let replacement = '|';
    // text = text.forEach(line => {
    //    line = line.replace(clientNamePattern, match => replacement.repeat(match.length));
    //    line = line.replace(phoneNumberPattern, match => replacement.repeat(match.length));
    //    line = line.replace(idPattern, match => replacement.repeat(match.length));
    //    line = line.replace(secretBases, match => replacement.repeat(match.length));
    //
    //    console.log(line);
    // });

    //Second way
    let hideOptions = {
            name: (str, replacement = '|') =>
                str.replace(/\*[A-Z][A-Za-z]*(?=\t| |$)/gm, match => replacement.repeat(match.length)),
            phoneNumber: (str, replacement = '|') =>
                str.replace(/\+[0-9\-]{10}(?=\t| |$)/gm, match => replacement.repeat(match.length)),
            id: (str, replacement = '|') =>
                str.replace(/![A-Za-z0-9]+(?=\t| |$)/gm, match => replacement.repeat(match.length)),
            username: (str, replacement = '|') =>
                str.replace(/_[A-Za-z0-9]+(?=\t| |$)/gm, match => replacement.repeat(match.length))
        };

    for (let i = 0; i < text.length; i++) {
        text[i] = hideOptions.name(text[i]);
        text[i] = hideOptions.phoneNumber(text[i]);
        text[i] = hideOptions.id(text[i]);
        text[i] = hideOptions.username(text[i]);
    }

    console.log(text.join('\n'));;
}

secretData(['Agent *Ivankov was in the room when it all happened.\n' +
    'The person in the room was heavily armed.\n' +
    'Agent *Ivankov had to act quick in order.\n' +
    'He picked up his phone and called some unknown number. \n' +
    'I think it was +555-49-796\n' +
    'I can\'t really remember...\n' +
    'He said something about "finishing work" with subject !2491a23BVB34Q and returning to Base _Aurora21\n' +
    'Then after that he disappeared from my sight.\n' +
    'As if he vanished in the shadows.\n' +
    'A moment, shorter than a second, later, I saw the person flying off the top floor.\n' +
    'I really don\'t know what happened there.\n' +
    'This is all I saw, that night.\n' +
    'I cannot explain it myself...\n']);