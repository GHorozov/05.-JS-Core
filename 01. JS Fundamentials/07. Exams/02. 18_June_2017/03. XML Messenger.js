function xmlMessenger(text) {
    let regex =/^<message\s*((?:[a-z]+="[A-Za-z0-9 .]+"\s*)+)>((?:.|\n)+)<\/message>$/gm;
    let match = regex.exec(text);

    if(match){
        let attributes = match[1];
        let message = match[2];

        let matchTo =/\bto="([A-Za-z0-9 .]+)"/.exec(attributes);
        let matchFrom=/\bfrom="([A-Za-z0-9 .]+)"/.exec(attributes);

        if(matchTo && matchFrom){
            let result = '<article>\n';
            result += `  <div>From: <span class="sender">${matchFrom[1]}</span></div>\n`;
            result += `  <div>To: <span class="recipient">${matchTo[1]}</span></div>\n`;
            result += '  <div>\n';

            let allLines = message.split('\n');
            for (let i = 0; i < allLines.length; i++) {
               result +=`    <p>${allLines[i]}</p>\n`;
            }

            result += '  </div>\n';
            result += '</article>';

            console.log(result);
        }else{
            console.log('Missing attributes');
        }

    }else{
       console.log('Invalid message format');
    }
}

//xmlMessenger('<message to="Bob" from="Alice" timestamp="1497254092">Hey man, what\'s up?</message>231313');

xmlMessenger('<message to="Bob" from="Alice" timestamp="1497254114">Same old, same old\n' +
    'Let\'s go out for a beer</message>');

//xmlMessenger('<message from="Alice" timestamp="1497254112">Same old, same old</message>');

//xmlMessenger('<message to="Bob" from="Alice" timestamp="1497254092">Hey man, what\'s up?</message>');