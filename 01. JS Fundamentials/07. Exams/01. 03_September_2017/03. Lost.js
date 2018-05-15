function lost(keyword, text) {
    let regex = /\.*(north|east)\D*([0-9]{2})[^\,]*\D*[^\,0-9]*([0-9]{6})/gi;
    let message =  text.substring(text.indexOf(keyword) + keyword.length , text.lastIndexOf(keyword));

    //Second way to take message with regex
    // let messagePattern = new RegExp(`(${keyword})(.*?)(${keyword})`, 'g');
    // let message = messagePattern.exec(text)[2];

    let lattitude;
    let longtitude;
    let match = regex.exec(text);
    while(match){
        if(match[1].toLowerCase() === 'north'){
            lattitude = match[2] + '.'+ match[3] + ' ' + 'N';
        }else if(match[1].toLowerCase() === 'east'){
            longtitude = match[2] + '.'+ match[3] + ' ' + 'E';
        }

        match = regex.exec(text);
    }

    console.log(lattitude);
    console.log(longtitude);
    console.log('Message: ' + message);
}

lost('<>',
    'o u%&lu43t&^ftgv><nortH4276hrv756dcc,  jytbu64574655k <>ThE sanDwich is iN the refrIGErator<>yl i75evEAsTer23,lfwe 987324tlblu6b');

lost('4ds', 'eaSt 19,432567noRt north east 53,123456north 43,3213454dsNot all those who wander are lost.4dsnorth 47,874532');