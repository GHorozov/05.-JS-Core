function printInXmlFormat(arr) {
    let questions = [];
    let answers = [];

    for (let i = 0; i < arr.length; i++) {
        if(i%2 == 0){
            questions.push(arr[i]);
        }
        else{
            answers.push(arr[i]);
        }
    }

    let result = '<?xml version="1.0" encoding="UTF-8"?>\n';
    result += '<quiz>\n';

    for (let i = 0; i < questions.length; i++) {
        result += ' <question>\n';
        result += '     ' + questions[i];
        result += '\n';
        result += ' </question>\n';
        result += ' <answer>\n';
        result += '     ' + answers[i];
        result += '\n';
        result += ' </answer>\n'
    }

    result += '</quiz>';

    console.log(result);
}


//printInXmlFormat(["Who was the forty-second president of the U.S.A.?", "William Jefferson Clinton"]);
printInXmlFormat(["Dry ice is a frozen form of which gas?",
    "Carbon Dioxide",
    "What is the brightest star in the night sky?",
    "Sirius"]
);