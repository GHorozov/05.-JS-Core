function cappyJuice(arr) {
    let result = new Map();
    let juiceBottles = new Map();
    let fullBottle = 1000;
    for (let line of arr) {
        let [juice, quantity] = line.split(' => ');

        if(!result.has(juice)){
            result.set(juice, 0);
        }
        let currentQuantity = result.get(juice) + Number(quantity);
        if(currentQuantity >= fullBottle){
            let bottles = Math.floor(currentQuantity / 1000);
            let leftJuice = currentQuantity % 1000;

            if(!juiceBottles.has(juice)){
                juiceBottles.set(juice, 0)
            }

            juiceBottles.set(juice, juiceBottles.get(juice) + bottles);

            result.set(juice, leftJuice);
        }else{
            result.set(juice, currentQuantity);
        }
    }

    for (let [juice, quantity] of juiceBottles) {
        console.log(`${juice} => ${quantity}`);
    }
}

// cappyJuice(
//     ['Orange => 2000',
//     'Peach => 1432',
//     'Banana => 450',
//     'Peach => 600',
//     'Strawberry => 549']
// );

cappyJuice(
    ['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789']
);