function extractText(str) {
    let arr=[];
    let startIndex = 0;
    let endIndex = 0;
    while(true){
        startIndex = str.indexOf('(');
        endIndex  = str.indexOf(')');
        if(startIndex < 0 ||  endIndex < startIndex){
            break;
        }
        let word = str.slice(startIndex+1, endIndex);
        arr.push(word);
        str = str.substr(endIndex+1);
    }

    console.log(arr.join(', '));
}

extractText('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)');