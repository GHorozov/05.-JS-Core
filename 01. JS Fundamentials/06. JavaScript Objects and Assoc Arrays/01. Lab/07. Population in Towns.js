function populationInTowns(arr) {
    let towns =new Map();
    for (let str of arr) {
        let [name, value] = str.split(/\s*<->\s*/g).filter(x => x !== '');

        if(towns.has(name)){
            towns.set(name, towns.get(name) + Number(value));
        }else{
            towns.set(name, Number(value));
        }
    }

    for (let [key,value] of towns) {
        console.log(key + ' : ' + value);
    }
}

// populationInTowns(['Sofia <-> 1200000',
// 'Montana <-> 20000',
// 'New York <-> 10000000',
// 'Washington <-> 2345000',
// 'Las Vegas <-> 1000000'
// ]);

populationInTowns(['Istanbul <-> 100000',
    'Honk Kong <-> 2100004',
'Jerusalem <-> 2352344',
'Mexico City <-> 23401925',
'Istanbul <-> 1000'
])