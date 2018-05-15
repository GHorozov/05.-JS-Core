function townsToJSON(arr) {
    let result = [];
    let keys = arr[0].split(/\s*\|\s*/g).filter(st => st != '');

    for (let line of arr.slice(1)) {
        let obj = {};
        let params = line.split(/\s*\|\s*/g).filter(st => st != '');

        obj[keys[0]] = params[0];
        obj[keys[1]] = Number(params[1]);
        obj[keys[2]] = Number(params[2]);

        result.push(obj);
    }

    console.log(JSON.stringify(result));
}

townsToJSON(
    [
        '| Town | Latitude | Longitude |',
        '| Sofia | 42.696552 | 23.32601 |',
        '| Beijing | 39.913818 | 116.363625 |'
    ]
);

// townsToJSON(
//     [
//         '| Town | Latitude | Longitude |',
//         '| Veliko Turnovo | 43.0757 | 25.6172 |',
//         '| Monatevideo | 34.50 | 56.11 |'
//     ]
// );