function scoreHTML(jsonString) {
    let obj = JSON.parse(jsonString);
    let keys = Object.keys(obj[0]);

    let result ='<table>\n';
    result += `  <tr><th>${keys[0]}</th><th>${keys[1]}</th></tr>\n`;

    for (let ob of obj) {
        let name = escapeChars(ob['name']+ '');
        let score = escapeChars(ob['score'] + '');

        result += `  <tr><td>${name}</td><td>${score}</td></tr>\n`;
    }
    result += '</table>';

    console.log(result);

    function escapeChars(str) {
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
    }
}

scoreHTML('[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]');

//scoreHTML('[{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]');