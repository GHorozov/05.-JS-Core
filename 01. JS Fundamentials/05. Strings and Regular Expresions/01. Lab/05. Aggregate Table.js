function aggregateTable(arr) {
    let sum = 0;
    let towns = [];

    for (let i = 0; i < arr.length; i++) {
        let parts = arr[i].split('|').filter(x => x != '');
        towns.push(parts[0].trim());
        sum+= Number(parts[1].trim());
    }


    console.log(towns.join(', '));
    console.log(sum);
}

aggregateTable(
    [
        '| Sofia           | 300',
        '| Veliko Tarnovo  | 500',
        '| Yambol          | 275'
    ]
);