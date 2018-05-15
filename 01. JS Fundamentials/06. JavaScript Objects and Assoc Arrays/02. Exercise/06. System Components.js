function systemComponents(arr) {
    let result = {};
    for (let line of arr) {
        let parts = line.split(' | ');
        let system = parts[0];
        let componentName = parts[1];
        let subcomponent = parts[2];


        if(!result.hasOwnProperty(system)){
            result[system] = new Object();
        }

        if(!result[system].hasOwnProperty(componentName)){
            result[system][componentName] = new Set();
        }

        result[system][componentName].add(subcomponent);
    }

    let orderSystem = Object.keys(result).sort(bySeconKeyCountAndByAlfabeticalSort);


    for (let system of orderSystem) {
        console.log(system);
        let orderComponents = Object.keys(result[system]);
        for (let component of orderComponents) {
            console.log("|||" + component);
            for (let subComponent of result[system][component]) {
                console.log("||||||" + subComponent);
            }
        }
    }

    function bySeconKeyCountAndByAlfabeticalSort(a, b) {
        if(Object.keys(result[a]).length === Object.keys(result[b]).length){
            if(a > b)  return 1;
            if(b > a) return -1;
        }else{
            return Object.keys(result[a]).length < Object.keys(result[b]).length
        }

    }
}

//Second way
// function systemComponents(input) {
//     let systems = new Map()
//     input.forEach(row => {
//         let[system, component, subcomponent] = row.split(' | ')
//         if(!systems.has(system)) systems.set(system, {})
//         if(!systems.get(system).hasOwnProperty(component)) systems.get(system)[component] = []
//         systems.get(system)[component].push(subcomponent)
//     })
//     let systemsSortedKeys = [...systems.keys()].sort(amountOfComponentsThenAlpabeticalSort)
//     systemsSortedKeys.forEach(systemName => {
//         console.log(systemName)
//         let system = systems.get(systemName)
//         let componentsSortedKeys = Object.keys(system).sort((a, b) => {
//             return system[a].length < system[b].length
//         })
//         componentsSortedKeys.forEach(component => {
//             console.log(`|||${component}`)
//             system[component].forEach(subcomponent => {
//                 console.log(`||||||${subcomponent}`)
//             })
//         })
//     })
//
//     function amountOfComponentsThenAlpabeticalSort(a, b) {
//         if(Object.keys(systems.get(a)).length === Object.keys(systems.get(b)).length) {
//             if(a > b) return 1
//             if(a < b) return -1
//         } else {
//             return Object.keys(systems.get(a)).length < Object.keys(systems.get(b)).length
//         }
//
//     }
// }

systemComponents(
    ['SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security']
);