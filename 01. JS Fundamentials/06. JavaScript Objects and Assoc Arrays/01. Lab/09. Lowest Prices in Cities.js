function lowestPriceInCities(arr) {
    let result = new Map();
    for (let line of arr) {
        let parts = line .split('|').map(x => x.trim());
        let town = parts[0];
        let product = parts[1];
        let price = Number(parts[2]);

        if(!result.has(product)){
            result.set(product, new Map());
        }

        result.get(product).set(town, price);
    }

    let orderResult= '';
    for (let kvp of result) {
        let lowestPrice = [...kvp[1]].sort((a, b) => a[1] - b[1])[0]; //sort by ascending and take first element.
        orderResult += `${kvp[0]} -> ${lowestPrice[1]} (${lowestPrice[0]})\n`;
    }

    console.log(orderResult.trim());
}

lowestPriceInCities([
    'Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10 '
]);