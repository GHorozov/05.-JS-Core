function elections(input) {
    let sik = {};
    //fill object
    for (let item of input) {
        let system = item['system'];
        let candidate = item['candidate'];
        let votes = Number(item['votes']);

        if(!sik.hasOwnProperty(system)){
            sik[system]= {};
        }

        if(!sik[system].hasOwnProperty(candidate)){
            sik[system][candidate] = 0;
        }

        sik[system][candidate] += votes;
    }

    //take winner for each system
    let totalSum=0;
    for (let key in sik) {
        let winner = Object.keys(sik[key]).sort((a, b) => sik[key][b] - sik[key][a])[0];
        let sum = 0;
        for (let innerKey in sik[key]) {
           sum += sik[key][innerKey];
        }

        sik[key] ={};
        sik[key]['candidate'] = winner;
        sik[key]['votes'] = sum;
        totalSum += sum;
    }

    //make new object to take winners with votes count
    let players = {};
    for (let key in sik) {
        if(!players.hasOwnProperty(sik[key]['candidate'])){
            players[sik[key]['candidate']] = 0;
        }

        players[sik[key]['candidate']] += sik[key]['votes'];

    }

    //define winner
    let sortPlayersKeys = Object.keys(players).sort((a, b) => players[b] - players[a]);
    let sortPlayersValues = Object.values(players).sort((a, b) => b - a);
    let sortSystems = Object.keys(sik).sort((a, b) => sik[b].votes - sik[a].votes);

    //take percent
    let firstHasPercent;
    let secondHasPercent
    if(sortPlayersValues.length > 1) {
        firstHasPercent = sortPlayersValues[0] / totalSum * 100;
        secondHasPercent = sortPlayersValues[1] / totalSum * 100;
    }

    if(sortPlayersKeys.length === 1){
        console.log(`${sortPlayersKeys[0]} wins with ${sortPlayersValues[0]} votes`);
        console.log(`${sortPlayersKeys[0]} wins unopposed!`);
    }else if(firstHasPercent < 50){
        console.log(`Runoff between ${sortPlayersKeys[0]} with ${Math.floor(firstHasPercent)}% and ${sortPlayersKeys[1]} with ${Math.floor(secondHasPercent)}%`)
    }else{
        console.log(`${sortPlayersKeys[0]} wins with ${sortPlayersValues[0]} votes`);
        console.log(`Runner up: ${sortPlayersKeys[1]}`);
        for (let system of sortSystems) {
            if(sik[system]['candidate'] === sortPlayersKeys[1]){
                console.log(system + ': ' + sik[system]['votes']);
            }
        }
    }

}

// elections(
//     [
//         { system: 'Theta', candidate: 'Kim Jong Andromeda', votes: 10 },
//         { system: 'Tau',   candidate: 'Kim Jong Andromeda', votes: 200 },
//         { system: 'Tau',   candidate: 'Flying Shrimp',      votes: 150 }
//     ]
// );


elections(
    [
        { system: 'Theta', candidate: 'Flying Shrimp', votes: 10 },
        { system: 'Sigma', candidate: 'Space Cow',     votes: 200 },
        { system: 'Sigma', candidate: 'Flying Shrimp', votes: 120 },
        { system: 'Tau',   candidate: 'Space Cow',     votes: 15 },
        { system: 'Sigma', candidate: 'Space Cow',     votes: 60 },
        { system: 'Tau',   candidate: 'Flying Shrimp', votes: 150 }
    ]
);

// elections(
//     [ { system: 'Tau',     candidate: 'Flying Shrimp', votes: 150 },
//         { system: 'Tau',     candidate: 'Space Cow',     votes: 100 },
//         { system: 'Theta',   candidate: 'Space Cow',     votes: 10 },
//         { system: 'Sigma',   candidate: 'Space Cow',     votes: 200 },
//         { system: 'Sigma',   candidate: 'Flying Shrimp', votes: 75 },
//         { system: 'Omicron', candidate: 'Flying Shrimp', votes: 50 },
//         { system: 'Omicron', candidate: 'Octocat',       votes: 75 }
//     ]
// );