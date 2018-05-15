function jsonToHTMLTable(jsonString) {
    let arrOfObj = JSON.parse(jsonString);
    let keys = Object.keys(arrOfObj[0]);

    let result ='<table>\n';

    result += '<tr>';
    for (let key of keys) {
        result += `<th>${key}</th>`;
    }
    result +='</tr>\n';

    for (let obj of arrOfObj) {
        result += '<tr>';
        for (let i = 0; i < keys.length; i++) {
            result += `<td>${escapeChars( obj[keys[i]] +'' )}</td>`;
        }
        result += '</tr>\n';
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

jsonToHTMLTable('[{"Name":"Tomatoes & Chips","Price":2.35},{"Name":"J&B Chocolate","Price":0.96}]');

// jsonToHTMLTable(
//     '[{"Name":"Pesho <div>-a","Age":20,"City":"Sofia"},' +
//     '{"Name":"Gosho","Age":18,"City":"Plovdiv"},' +
//     '{"Name":"Angel","Age":18,"City":"Veliko Tarnovo"}]'
// );