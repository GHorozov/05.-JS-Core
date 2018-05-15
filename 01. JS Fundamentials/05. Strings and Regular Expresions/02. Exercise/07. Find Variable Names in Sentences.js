function findNamesInSentence(text) {
    let regex =/_([A-Za-z0-9]+)/g;
    let variables = regex.exec(text);

    let result = [];
    while(variables){
        result.push(variables[1]);
        variables = regex.exec(text);
    }

    console.log(result.join(','));
}

//findNamesInSentence('The _id and _age variables are both integers.');

findNamesInSentence('Calculate the _area of the _perfectRectangle object.');