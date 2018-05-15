function storeCatalogue(arr) {
    let result = new Map();
    for (let line of arr) {
        let currentLine = line.split(/\s*:\s*/);
        let letter = currentLine[0][0];
        let product = currentLine[0];
        let price = Number(currentLine[1]);

        if(!result.has(letter)){
            result.set(letter, new Map());
        }

        if(!result.get(letter).has(product)){
            result.get(letter).set(product, 0);
        }

        result.get(letter).set(product, price);

    }

    let orderKeys = [...result].sort((a,b) => a[0].localeCompare(b[0]));
    for (let [key, value] of orderKeys) {
        console.log(key);

        let orderProducts = [...value].sort((a,b) => a[0].localeCompare(b[0]));
        for (let [product, price] of orderProducts) {
            console.log(`   ${product}: ${price}`);
        }
    }
}

storeCatalogue(
    ['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']
);

// storeCatalogue(
//     ['Banana : 2',
//     'Rubic\'s Cube : 5',
//     'Raspberry P : 4999',
//     'Rolex : 100000',
//     'Rollon : 10',
//     'Rali Car : 2000000',
//     'Pesho : 0.000001',
//     'Barrel : 10']
// );