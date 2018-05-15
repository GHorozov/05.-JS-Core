function jsonTable(arr) {
    let result = '<table>\n';
    for (let line of arr) {
        let obj = JSON.parse(line);
        let objKeys = Object.keys(obj);
        result += ' <tr>\n';
        for (let key of objKeys) {
            let param = obj[key];
            if(!Number.isInteger(obj[key])){
                param = escapeChars(obj[key]);
            }

            result += `    <td>${param}</td>\n`;
        }
        result += '<tr>\n';
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

jsonTable([
    '{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}'
]);