function solution(input) {
    let airport = new Set();
    let townStat = new Map();
    let townPlanes ={};

    for (let line of input) {
        let [id, town, peopleCount, action] = line.split(' ');
        peopleCount = Number(peopleCount);

        if(action === 'land'){
            if(airport.has(id)){
                continue;
            }else{
                airport.add(id);
            }

            if(!townStat.has(town)){
                townStat.set(town, [0,0]);
            }

            townStat.get(town)[0] += peopleCount;

            if(!townPlanes.hasOwnProperty(town)){
                townPlanes[town] = new Set();
            }

            townPlanes[town].add(id);
        }else{
            if(!airport.has(id)){
                continue;
            }else{
                airport.delete(id);
            }

            if(!townStat.has(town)){
                townStat.set(town, [0,0]);
            }

            townStat.get(town)[1] += peopleCount;

            if(!townPlanes.hasOwnProperty(town)){
                townPlanes[town] = new Set();
            }

            townPlanes[town].add(id);
        }
    }

    let sortedAirport = Array.from(airport).sort((a, b) => a.localeCompare(b));
    console.log('Planes left:');
    for (let key of sortedAirport) {
        console.log(`- ${key}`);
    }

    //console.log(townStat);

    let sortedTowns = [...townStat.entries()].sort(sortTowns);
    for (let [town, stats] of sortedTowns) {
        console.log(town);
        console.log(`Arrivals: ${stats[0]}`);
        console.log(`Departures: ${stats[1]}`);

        let sortPlanes = Array.from(townPlanes[town]).sort((a, b) => a.localeCompare(b));
        console.log('Planes:');
        for (let key in sortPlanes) {
            console.log(`-- ${sortPlanes[key]}`);
        }
    }


    function sortTowns(a, b) {
        let aArrivals = a[1][0];
        let bArrivals = b[1][0];
        let firstCriteria = bArrivals - aArrivals;

        if(firstCriteria !== 0){
            return firstCriteria;
        }else{
            return a[0].localeCompare(b[0]);
        }
    }
}

//solution(["Airbus London 265 depart"]);

solution(
    [
        "Boeing474 Madrid 300 land",
        "AirForceOne WashingtonDC 178 land",
        "Airbus London 265 depart",
        "ATR72 WashingtonDC 272 land",
        "ATR72 Madrid 135 depart"
    ]
);

// solution(
//     [
//         "Airbus Paris 356 land",
//         "Airbus London 321 land",
//         "Airbus Paris 213 depart",
//         "Airbus Ljubljana 250 land"
//     ]
// );