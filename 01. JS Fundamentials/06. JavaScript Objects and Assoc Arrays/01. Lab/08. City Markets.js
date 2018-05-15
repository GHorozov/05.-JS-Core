function cityMarkets(arr) {
    let towns = new Map();

    for (let line of arr) {
        let splitInput = line.split(/\s*->\s*/);
        let town = splitInput[0];
        let product = splitInput[1];
        let splitPriceQuantity = splitInput[2].split(' : ');
        let finalPrice = splitPriceQuantity[0] * splitPriceQuantity[1];

        if(towns.has(town)){
            if(towns.get(town).has(product)){
                towns.set(product, towns.get(product) + finalPrice);
            }else{
                towns.get(town).set(product, finalPrice);
            }

        }else{
            let itemsMap = new Map();
            itemsMap.set(product, finalPrice);
            towns.set(town, itemsMap);
        }
    }

    for (let [key,value] of towns) {
        console.log(`Town - ${key}`);
        for (let [item, sum] of towns.get(key)) {
            let secondMapKey = item;
            let secondMapValue = sum;
            console.log(`$$$${secondMapKey} : ${secondMapValue}`);
        }
    }
}

cityMarkets([
    'Sofia -> Laptops HP -> 200 : 2000',
    'Sofia -> Raspberry -> 200000 : 1500',
    'Sofia -> Audi Q7 -> 200 : 100000',
    'Montana -> Portokals -> 200000 : 1',
    'Montana -> Qgodas -> 20000 : 0.2',
    'Montana -> Chereshas -> 1000 : 0.3'
]);