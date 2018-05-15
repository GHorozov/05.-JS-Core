function heroicInventory(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let parts = arr[i].split(' / ');
        let heroName = parts[0];
        let heroLevel = Number(parts[1]);
        let heroItems = [];

        if(parts.length > 2){
            heroItems = parts[2].split(', ');
        }

        let obj = {
            name: heroName,
            level: heroLevel,
            items: heroItems
        };

        result.push(obj);
    }

    console.log(JSON.stringify(result));
}

//heroicInventory();

heroicInventory([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara',
    'Test / 12 / ']
);

// heroicInventory([
// 'Isacc / 25 / Apple, GravityGun',
// 'Derek / 12 / BarrelVest, DestructionSword',
// 'Hes / 1 / Desolator, Sentinel, Antara'
// ]);

// heroicInventory([
//     'Jake / 1000 / Gauss, HolidayGrenade'
// ]);